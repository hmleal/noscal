/* jshint esversion: 6 */

const S = require('string')

class Token {
    constructor(type, value) {
        this.type = type
        this.value = value
    }
}

const RESERVED_WORDS = {
    BEGIN: new Token('BEGIN', 'BEGIN'),
    END: new Token('END', 'END')
}

class Lexer {
    constructor(text) {
        this.text = text
        this.position = 0
        this.current_char = text[0]
    }

    get_next_token() {
        while(this.current_char !== 0) {
            if (S(this.current_char).isEmpty()) {
                this.skype_white_space()
                continue
            }

            if(S(this.current_char).isAlpha()) {
                return this._id()
            }

            if(S(this.current_char).isNumeric()) {
                return new Token('INTEGER', this.integer())
            }

            if(this.current_char === '+') {
                let token = new Token('PLUS', '+')
                this.advance()
                return token
            }

            if(this.current_char === '-') {
                let token = new Token('MINUS', '-')
                this.advance()
                return token
            }

            if(this.current_char === '*') {
                let token = new Token('MUL', '*')
                this.advance()
                return token
            }

            if(this.current_char === '/') {
                let token = new Token('DIV', '/')
                this.advance()
                return token
            }

            if(this.current_char === '(') {
                let token = new Token('LPAREN', '(')
                this.advance()
                return token
            }

            if(this.current_char === ')') {
                let token = new Token('RPAREN', ')')
                this.advance()
                return token
            }


            if(this.current_char === ':' && this.peek() === '=') {
                this.advance()
                this.advance()
                return new Token('ASSIGN', ':=')
            }

            if(this.current_char === ';') {
                this.advance()
                return new Token('SEMI', ';')
            }

            if(this.current_char === '.') {
                this.advance()
                return new Token('DOT', '.')
            }

            throw 'Invalid character'
        }

        return new Token('EOF', 'EOF')
    }

    peek() {
        let peek_pos = this.position + 1

        if(peek_pos > this.text.length - 1) {
            return undefined
        } else {
            return this.text[peek_pos]
        }

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
        this.position++
        if (this.position > this.text.length - 1) {
            this.current_char = 0
        } else {
            this.current_char = this.text[this.position]
        }
    }

    _id() {
        let result = ''
        while(this.current_char && S(this.current_char).isAlphaNumeric()) {
            result += this.current_char
            this.advance()
        }
        if(result in RESERVED_WORDS) {
            return RESERVED_WORDS[result]
        }
        return new Token('ID', result)
    }
}

module.exports.Lexer = Lexer
module.exports.Token = Token
