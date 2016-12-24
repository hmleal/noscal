class Parser {
    constructor(lexer, current_token) {
        this.lexer = lexer
        this.current_token = current_token
    }

    /*
     * INTEGER PLUS INTEGER
     * INTEGER MINUS INTEGER
     */
    expr() {
        let left = this.current_token;
        this.consume('INTEGER');

        let op = this.current_token;
        if (op.type == 'PLUS') {
            this.consume('PLUS');
        } else {
            this.consume('MINUS');
        }

        let right = this.current_token;
        this.consume('INTEGER');

        if (op.type == 'PLUS') {
            var result =  parseInt(left.value, 10) + parseInt(right.value, 10);
        } else {
            var result =  parseInt(left.value, 10) - parseInt(right.value, 10);
        }

        return result

    }

    term() {
    }

    factor() {
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
