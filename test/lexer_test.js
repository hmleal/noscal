const chai = require('chai')
const lexer = require('../src/lexer')

const assert = chai.assert

describe('Tokenizer test', function() {
    it('Token - INTEGER', function() {
        let l = new lexer.Lexer('5')
        let token = l.get_next_token()

        assert.equal(token.type, 'INTEGER')
        assert.equal(token.value, '5')
    })

    it('Token - PLUS', function() {
        let l = new lexer.Lexer('+')
        let token = l.get_next_token()

        assert.equal(token.type, 'PLUS')
        assert.equal(token.value, '+')
    })

    it('Token - MINUS', function() {
        let l = new lexer.Lexer('-')
        let token = l.get_next_token()

        assert.equal(token.type, 'MINUS')
        assert.equal(token.value, '-')
    })

    it('Token - MUL', function() {
        let l = new lexer.Lexer('*')
        let token = l.get_next_token()

        assert.equal(token.type, 'MUL')
        assert.equal(token.value, '*')
    })

    it('Token - DIV', function() {
        let l = new lexer.Lexer('/')
        let token = l.get_next_token()

        assert.equal(token.type, 'DIV')
        assert.equal(token.value, '/')
    })

    it('Token - LPAREN', function() {
        let l = new lexer.Lexer('(')
        let token = l.get_next_token()

        assert.equal(token.type, 'LPAREN')
        assert.equal(token.value, '(')
    })

    it('Token - RPAREN', function() {
        let l = new lexer.Lexer(')')
        let token = l.get_next_token()

        assert.equal(token.type, 'RPAREN')
        assert.equal(token.value, ')')
    })

    it('Token - ASSIGN', function() {
        let l = new lexer.Lexer(':=')
        let token = l.get_next_token()

        assert.equal(token.type, 'ASSIGN')
        assert.equal(token.value, ':=')
    })

    it('Token - SEMI', function() {
        let l = new lexer.Lexer(';')
        let token = l.get_next_token()

        assert.equal(token.type, 'SEMI')
        assert.equal(token.value, ';')
    })

    it('Token - BEGIN', function() {
        let l = new lexer.Lexer('BEGIN')
        let token = l.get_next_token()

        assert.equal(token.type, 'BEGIN')
        assert.equal(token.value, 'BEGIN')

    })

    it('Token - END', function() {
        let l = new lexer.Lexer('END')
        let token = l.get_next_token()

        assert.equal(token.type, 'END')
        assert.equal(token.value, 'END')
    })

    it('Token - DOT', function() {
        let l = new lexer.Lexer('.')
        let token = l.get_next_token()

        assert.equal(token.type, 'DOT')
        assert.equal(token.value, '.')
    })

    it('Token - ID', function() {
        let l = new lexer.Lexer('a := 5')
        let token = l.get_next_token()

        assert.equal(token.type, 'ID')
        assert.equal(token.value, 'a')
    })

    it('Peek', function() {
        let l = new lexer.Lexer('5+5')

        assert.equal(l.peek(), '+')
    })

    it('Peek when not exist next character', function() {
        let l = new lexer.Lexer('5')

        assert.equal(l.peek(), undefined)
    })
})
