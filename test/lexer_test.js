const chai = require('chai')
const lexer = require('../src/lexer')

const assert = chai.assert

describe('Lexer test', function() {
    it('Integer token', function() {
        let l = new lexer.Lexer('5')
        let token = l.get_next_token()

        assert.equal(token.type, 'INTEGER')
        assert.equal(token.value, '5')
    })

    it('Plus token', function() {
        let l = new lexer.Lexer('+')
        let token = l.get_next_token()

        assert.equal(token.type, 'PLUS')
        assert.equal(token.value, '+')
    })

    it('Minus token', function() {
        let l = new lexer.Lexer('-')
        let token = l.get_next_token()

        assert.equal(token.type, 'MINUS')
        assert.equal(token.value, '-')
    })

    it('Mul token', function() {
        let l = new lexer.Lexer('*')
        let token = l.get_next_token()

        assert.equal(token.type, 'MUL')
        assert.equal(token.value, '*')
    })
})