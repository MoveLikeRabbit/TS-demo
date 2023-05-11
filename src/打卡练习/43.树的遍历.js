
function Node(element) {
    this.element = element
    this.children = []
}

function bfsTraversal(root) {
    if(!root) {
        return []
    }
    const queue = [root] // 队列 FIFO 先进先出
    const res = []
    while(queue.length) {
        const {element, children}= queue.shift()
        queue.push(...children)
        res.push(element)
    }
    return res
}

function dfsTraversal(root) {
    if(!root) {
        return []
    }
    let stack = [root] // 栈 FILO 先进后出
    const res = []
    while(stack.length) {
        const {element, children}= stack.shift()
        res.push(element)
        stack.unshift(...children)
    }
    return res
}


const root = new Node('A')
const b = new Node('B')
const c = new Node('C')
const d = new Node('D')
b.children = [new Node('E'), new Node('F')]
c.children = [new Node('G')]
d.children = [new Node('H'), new Node('S')]

root.children = [b, c, d]
const res = depthFirstTraversal(root)
console.log(res)