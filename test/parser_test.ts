import { assert } from 'chai'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'
import { Interpreter } from "../src/interpreter"

describe('Parser tests', () => {

    it('Plus two number parser test', () => {
        let l = new Lexer('BEGIN number := 5; END.')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 10)
    })

    it('Minus two number parser test', () => {
        let l = new Lexer('5 - 5')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 0)
    })

    it('Mul two number parser test', () => {
        let l = new Lexer('5 * 5')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 25)
    })

    it('Div two number parser test', () => {
        let l = new Lexer('5 / 5')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 1)
    })

})

describe('Precedence tests', () => {
    it('Div operation has precedence', () => {
        let l = new Lexer('10 + 10 / 2')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 15)
    })

    it('Plus operation has precedence', () => {
        let l = new Lexer('10 + 10 * 2')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 30)
    })
})

describe('Unary operators', () => {
    it('Simple unary operator', () => {
        let l = new Lexer('+-3')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), -3)
    })

    it('Simple unary sum', () => {
        let l = new Lexer('5--2')
        let p = new Parser(l)
        let i = new Interpreter(p)

        assert.equal(i.interpret(), 7)
    })
})
