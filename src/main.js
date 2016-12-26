/* jshint esversion: 6 */

// NodeJS 7.2.1
const lexer = require('./lexer');
const parser = require('./parser');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>> '
});

console.log('Welcome a implementation of Pascal using NodeJS');
rl.prompt();
rl.on('line', (line) => {
    switch(line.trim()) {
        case 'exit':
            rl.close()
            break
        default:
            l = new lexer.Lexer(line)
            p = new parser.Parser(l, l.get_next_token())

            console.log(p.expr())
            break
    }
    rl.prompt()
}).on('close', () => {
    console.log('Have a great day!')
    process.exit(0)
})
