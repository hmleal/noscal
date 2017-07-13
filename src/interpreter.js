class Interpreter {
    constructor(parser) {
        this.parser = parser
    }

    interpret() {
        let tree = this.parser.parse()
        return this.visit(tree)
    }

    visit(node) {
        let method_name = node.toString()

        if(method_name === 'Num') {
            return this.visit_num(node)
        }

        if(method_name === 'UnaOp') {
            return this.visit_unaop(node)
        }

        if(method_name === 'BinOp') {
            return this.visit_binop(node)
        }
    }

    visit_num(node) {
        return node.value
    }

    visit_unaop(node) {
        let op = node.operation.type
        if(op === 'PLUS') {
            return +this.visit(node.expr)
        } else if(op === 'MINUS') {
            return -this.visit(node.expr)
        }
    }

    visit_binop(node) {
        if(node.token.type === 'PLUS') {
            return this.visit(node.left) + this.visit(node.right)
        }

        if(node.token.type === 'MINUS') {
            return this.visit(node.left) - this.visit(node.right)
        }

        if(node.token.type === 'MUL') {
            return this.visit(node.left) * this.visit(node.right)
        }

        if(node.token.type === 'DIV') {
            return this.visit(node.left) / this.visit(node.right)
        }
    }
}

module.exports.Interpreter = Interpreter
