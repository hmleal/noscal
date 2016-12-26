/* jshint esversion: 6 */

class Parser {
    constructor(lexer, current_token) {
        this.lexer = lexer
        this.current_token = current_token
    }

    /*
     * INTEGER | LPAREN expr RPAREN
     */
    factor() {
        let token = this.current_token
        if(token.type === 'INTEGER') {
            this.consume('INTEGER')
            return parseInt(token.value, 10)
        } else if(token.type === 'LPAREN') {
            this.consume('LPAREN')
            let result = this.expr()
            this.consume('RPAREN')

            return result
        }
    }

    /*
     * term: factor((MUL | DIV) factor)*
     */
    term() {
        let result = this.factor()

        while(this.current_token.type === 'MUL' || this.current_token.type === 'DIV') {
            let token = this.current_token
            if(token.type === 'MUL') {
                this.consume('MUL')
                result *= this.factor()
            } else if (token.type === 'DIV') {
                this.consume('DIV')
                result /= this.factor()
            }
        }

        return result
    }

    /*
     * expr: term((PLUS | MINUS) term)*
     */
    expr() {
        let result = this.term()

        while(this.current_token.type === 'PLUS' || this.current_token.type === 'MINUS') {
            let token = this.current_token
            if(token.type === 'PLUS') {
                this.consume('PLUS')
                result += this.term()
            } else if (token.type === 'MINUS') {
                this.consume('MINUS')
                result -= this.term()
            }
        }

        return result
    }

    consume(token_type) {
        if (this.current_token.type === token_type) {
            this.current_token = this.lexer.get_next_token();
        } else {
            throw 'Invalid syntax';
        }
    }
}

module.exports.Parser = Parser;
