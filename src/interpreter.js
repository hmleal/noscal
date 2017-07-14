class Interpreter {
    constructor(parser) {
        this.parser = parser
        this.global_scope = {}
    }

    interpret() {
        let tree = this.parser.parse()
        return this.visit(tree)
    }

    visit(node) {
        // TODO turn this a private method
        // TODO implement a switch case
        let method_name = node.toString()

        if(method_name === 'Compound') {
            return this.visit_compound(node)
        }

        if(method_name === 'Assign') {
            return this.visit_assign(node)
        }

        if(method_name === 'Var') {
            return this.visit_var(node)
        }

        if(method_name === 'NoOp') {
            return this.visit_noop(node)
        }

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
        // TODO turn this a private method
        return node.value
    }

    visit_unaop(node) {
        // TODO turn this a private method
        let op = node.operation.type
        if(op === 'PLUS') {
            return +this.visit(node.expr)
        } else if(op === 'MINUS') {
            return -this.visit(node.expr)
        }
    }

    visit_binop(node) {
        // TODO turn this a private method
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

    visit_compound(node) {
        // TODO turn this a private method
        node.children.forEach((child) => {
            this.visit(child)
        })
    }

    visit_noop(node) {
        // TODO turn this a private method
    }

    visit_assign(node) {
        let var_name = node.left.value

        this.global_scope[var_name] = this.visit(node.right)
    }

    visit_var(node) {
        debugger
        let var_name = node.value
        let val = this.global_scope[var_name]

        if(val) {
            return val
        } else {
            throw 'VisitVar'
        }
    }
}

module.exports.Interpreter = Interpreter
