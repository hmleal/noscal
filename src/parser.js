class Parser {
    constructor(lexer, current_token) {
        this.lexer = lexer
        this.current_token = current_token
    }

    /*
     * INTEGER
     */
    term() {
        let token = this.current_token
        this.consume('INTEGER')
        return parseInt(token.value, 10)
    }

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
