function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function traversal(root, type = 'preorder') {
    if (!root) return [];
    const res = [];
    const stack = [root];
    let current;
    while ((current = stack.shift())) {
        // 引入visited来判断该节点是否被访问过，只有第二次被访问的节点，才进入res
        const { value, left, right, _visited } = current;
        if (_visited) {
            res.push(value);
        } else {
            current._visited = true;
            switch (type) {
                case 'preorder': // 根左右
                    right && stack.unshift(right);
                    left && stack.unshift(left);
                    stack.unshift(current);
                    break;
                case 'inorder': // 左根右
                    right && stack.unshift(right);
                    stack.unshift(current);
                    left && stack.unshift(left);
                    break;
                case 'postorder': // 左右根
                    stack.unshift(current);
                    right && stack.unshift(right);
                    left && stack.unshift(left);
                    break;
                default:
                    break;
            }
        }
    }
    return res;
}

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


const res = traversal(root, 'postorder');
console.log(res);

//         A
//     B       C
//   D   E    F  H
//  I G
