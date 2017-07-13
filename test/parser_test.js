const chai = require('chai')

const parser = require('../src/parser')
const lexer = require('../src/lexer')
const interpreter = require('../src/interpreter')

const assert = chai.assert

describe('Parser tests', function() {

    it('Plus two number parser test', function() {
        let l = new lexer.Lexer('5 + 5')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 10)
    })

    it('Minus two number parser test', function() {
        let l = new lexer.Lexer('5 - 5')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 0)
    })

    it('Mul two number parser test', function() {
        let l = new lexer.Lexer('5 * 5')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 25)
    })

    it('Div two number parser test', function() {
        let l = new lexer.Lexer('5 / 5')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 1)
    })

})

describe('Precedence tests', function() {
    it('Div operation has precedence', function() {
        let l = new lexer.Lexer('10 + 10 / 2')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 15)
    })

    it('Plus operation has precedence', function() {
        let l = new lexer.Lexer('10 + 10 * 2')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 30)
    })
})

describe('Unary operators', function() {
    it('Simple unary operator', function() {
        let l = new lexer.Lexer('+-3')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), -3)
    })

    it('Simple unary sum', function() {
        let l = new lexer.Lexer('5--2')
        let p = new parser.Parser(l, l.get_next_token())
        let i = new interpreter.Interpreter(p)

        assert.equal(i.interpret(), 7)
    })
})
