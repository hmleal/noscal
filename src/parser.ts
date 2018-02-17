import { Lexer, Token } from "./lexer"

class UnaOp {
    // Node
    operation: Token

    constructor(operation, expr) {
        this.operation = operation
        this.expr = expr
    }

    toString() {
        return 'UnaOp'
    }
}

class BinOp {
    // Node
    constructor(left, right, operation) {
        this.left = left
        this.right = right
        this.token = operation
        this.operation = operation
    }

    toString() {
        return 'BinOp'
    }
}

class Num {
    // Node
    token: Token

    constructor(token) {
        this.token = token
        this.value = parseInt(token.value, 10)
    }

    toString() {
        return 'Num'
    }
}

class Compound {
    // Node
    constructor() {
        this.children = []
    }

    toString() {
        return 'Compound'
    }
}

class Assign {
    // Node
    constructor(left, operation, right) {
        this.left = left
        this.token = operation
        this.op = operation
        this.right = right
    }

    toString() {
        return 'Assign'
    }
}

class Var {
    // Node
    token: Token
    value: string

    constructor(token) {
        this.token = token
        this.value = token.value
    }

    toString() {
        return 'Var'
    }
}

class NoOp {
    // Node
    toString() {
        return 'NoOp'
    }
}

export class Parser {
    /* COMPLETE GRAMMAR
     * program : compound_statement DOT
     *
     * compound_statement : BEGIN statement_list END
     *
     * statement_list : statement
     *                | statement SEMI statement_list
     *
     * statement : compound_statement
     *           | assignment_statement
     *           | empty
     *
     * assignment_statement : variable ASSIGN expr
     *
     * empty :
     *
     * expr: term ((PLUS | MINUS) term)*
     *
     * term: factor ((MUL | DIV) factor)*
     *
     * factor : PLUS factor
     *        | MINUS factor
     *        | INTEGER
     *        | LPAREN expr RPAREN
     *        | variable
     *
     * variable: ID
     */
    lexer: Lexer
    current_token: Token

    constructor(lexer: Lexer) {
        this.lexer = lexer
        this.current_token = lexer.get_next_token()
    }

    program() {
        let node = this.compound_statement()
        this.consume('DOT')

        return node
    }

    compound_statement() {
        this.consume('BEGIN')
        let nodes = this.statement_list()
        this.consume('END')

        let root = new Compound()
        nodes.forEach(function (node) {
            root.children.push(node)
        })

        return root
    }

    statement_list() {
        let node = this.statment()
        let results = [node]

        while(this.current_token.type === 'SEMI') {
            this.consume('SEMI')
            results.push(this.statment())
        }

        if(this.current_token.type === 'ID') {
            throw 'statement_list: Error ' + this.current_token
        }

        return results
    }

    statment() {
        if(this.current_token.type === 'BEGIN') {
            return this.compound_statement()
        } else if(this.current_token.type === 'ID') {
            return this.assignment_statement()
        } else {
            return this.empty()
        }
    }

    assignment_statement() {
        let left = this.variable()
        let token = this.current_token

        this.consume('ASSIGN')

        let right = this.expr()

        return new Assign(left, token, right)
    }

    variable() {
        let node = new Var(this.current_token)

        this.consume('ID')

        return node
    }

    empty() {
        return new NoOp()
    }

    factor() {
        let token = this.current_token
        if(token.type == 'PLUS') {
            this.consume('PLUS')
            let node = new UnaOp(token, this.factor())
            return node
        }
        else if(token.type == 'MINUS') {
            this.consume('MINUS')
            let node = new UnaOp(token, this.factor())
            return node
        }
        else if(token.type === 'INTEGER') {
            this.consume('INTEGER')
            let node = new Num(token)
            return node
        } else if(token.type === 'LPAREN') {
            this.consume('LPAREN')
            let node = this.expr()
            this.consume('RPAREN')

            return node
        } else {
            let node = this.variable()
            return node
        }
    }

    term() {
        let node = this.factor()

        while(this.current_token.type === 'MUL' || this.current_token.type === 'DIV') {
            let token = this.current_token
            if(token.type === 'MUL') {
                this.consume('MUL')
            } else if (token.type === 'DIV') {
                this.consume('DIV')
            }
            node = new BinOp(node, this.factor(), token)
        }

        return node
    }

    expr() {
        let node = this.term()

        while(this.current_token.type === 'PLUS' || this.current_token.type === 'MINUS') {
            let token = this.current_token
            if(token.type === 'PLUS') {
                this.consume('PLUS')
            } else if (token.type === 'MINUS') {
                this.consume('MINUS')
            }
            node = new BinOp(node, this.term(), token)
        }
        return node
    }

    parse() {
        let node = this.program()
        if(this.current_token.type != 'EOF') {
            throw 'Invalid beginnig'
        }
        return node
    }

    consume(token_type) {
        if (this.current_token.type === token_type) {
            this.current_token = this.lexer.get_next_token()
        } else {
            throw 'Invalid syntax'
        }
    }
}