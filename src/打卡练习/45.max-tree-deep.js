// https://leetcode.cn/problems/maximum-depth-of-binary-tree/

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}
var maxDepth = function(root) {
    if(!root) return 0
    let deep = 0
    let queue = [root]
    while(queue.length) {
        let size = queue.length
        while(size-- > 0) {
            const {left, right} = queue.shift()
            if(left) {
                queue.push(left)
            }
            if(right) {
                queue.push(right)
            }
        }
        deep++
    }
    return deep
};
const root = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');

root.left = b;
root.right = c;
b.left = d;
b.right = new Node('E');
c.left = new Node('F');
c.right = new Node('H');
d.left = new Node('I');
d.right = new Node('G');

const res = maxDepth(root);
console.log(res);
