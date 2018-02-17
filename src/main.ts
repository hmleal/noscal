import { Lexer } from "./lexer"
import { Parser } from "./parser"
import { Interpreter } from "./interpreter"

let l = new Lexer("BEGIN number := 5; a := number; b := 10 * a + 10 * number / 4; END.")
let p = new Parser(l)
let i = new Interpreter(p)

console.log(i.interpret())
console.log(i.global_scope)