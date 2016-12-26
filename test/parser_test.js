const chai = require('chai')
const parser = require('../src/parser')
const lexer = require('../src/lexer')

const assert = chai.assert

describe('Parser tests', function() {

    it('Plus two number parser test', function() {
        let l = new lexer.Lexer('5 + 5')
        let p = new parser.Parser(l, l.get_next_token())

        assert.equal(p.expr(), 10)
    })

    it('Minus two number parser test', function() {
        let l = new lexer.Lexer('5 - 5')
        let p = new parser.Parser(l, l.get_next_token())

        assert.equal(p.expr(), 0)
    })

    it('Plus two number parser test', function() {
        let l = new lexer.Lexer('5 * 5')
        let p = new parser.Parser(l, l.get_next_token())

        assert.equal(p.expr(), 25)
    })

    it('Div two number parser test', function() {
        let l = new lexer.Lexer('5 / 5')
        let p = new parser.Parser(l, l.get_next_token())

        assert.equal(p.expr(), 1)
    })

})

describe('Precedence tests', function() {
    it('Div operation has precedence', function() {
        let l = new lexer.Lexer('10 + 10 / 2')
        let p = new parser.Parser(l, l.get_next_token())

        assert.equal(p.expr(), 15)
    })

    it('Plus operation has precedence', function() {
        let l = new lexer.Lexer('10 + 10 * 2')
        let p = new parser.Parser(l, l.get_next_token())

        assert.equal(p.expr(), 30)
    })
})
