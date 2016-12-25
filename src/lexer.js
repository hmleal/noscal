var S = require('string')

class Token {
    constructor(type, value) {
        this.type = type
        this.value = value
    }
}

class Lexer {
    constructor(text) {
        this.text = text;
        this.position = 0;
        this.current_char = text[0];
    }

    get_next_token() {
        while (this.current_char !== 0) {
            if (S(this.current_char).isEmpty()) {
                this.skype_white_space();
                continue;
            }

            if (S(this.current_char).isNumeric()) {
                return new Token('INTEGER', this.integer());
            }

            if (this.current_char === '+') {
                let token = new Token('PLUS', '+');
                this.advance();
                return token;
            }

            if (this.current_char == '-') {
                let token = new Token('MINUS', '-');
                this.advance();
                return token;
            }

            if (this.current_char == '*') {
                let token = new Token('MUL', '*');
                this.advance();
                return token;
            }

            throw 'Invalid character';
        }

        return new Token('EOF', 'EOF');
    }

    skype_white_space() {
        while(this.current_char !== 0 && S(this.current_char).isEmpty()) {
            this.advance()
        }
    }

    integer() {
        let result = ''
        while(this.current_char !== 0 && S(this.current_char).isNumeric()) {
            result += this.current_char
            this.advance()
        }
        return result
    }

    advance() {
        this.position++;
        if (this.position > this.text.length - 1) {
            this.current_char = 0;
        } else {
            this.current_char = this.text[this.position];
        }
    }
}

module.exports.Lexer = Lexer
