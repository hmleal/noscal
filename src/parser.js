/* jshint esversion: 6 */

class BinOp {
    constructor(left, right, operation) {
        this.left = left
        this.right = right
        this.token = operation
        this.operation = operation
    }

    toString() {
        return 'BinOp'
    }
}

class Num {
    constructor(token) {
        this.token = token
        this.value = parseInt(token.value, 10)
    }

    toString() {
        return 'Num'
    }
}

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
            let tokens = new Num(token)
            return tokens
        } else if(token.type === 'LPAREN') {
            this.consume('LPAREN')
            let node = this.expr()
            this.consume('RPAREN')

            return node
        }
    }

    /*
     * term: factor((MUL | DIV) factor)*
     */
    term() {
        let node = this.factor()

        while(this.current_token.type === 'MUL' || this.current_token.type === 'DIV') {
            let token = this.current_token
            if(token.type === 'MUL') {
                this.consume('MUL')
            } else if (token.type === 'DIV') {
                this.consume('DIV')
            }
            node = new BinOp(node, this.factor(), token)
        }

        return node
    }

    /*
     * expr: term((PLUS | MINUS) term)*
     */
    expr() {
        let node = this.term()

        while(this.current_token.type === 'PLUS' || this.current_token.type === 'MINUS') {
            let token = this.current_token
            if(token.type === 'PLUS') {
                this.consume('PLUS')
            } else if (token.type === 'MINUS') {
                this.consume('MINUS')
            }
            node = new BinOp(node, this.term(), token)
        }
        return node
    }

    parse() {
        return this.expr()
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
