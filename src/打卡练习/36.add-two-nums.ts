//  https://leetcode.cn/problems/add-two-numbers/

var addTwoNumbers = function(l1, l2) {
    let list = new ListNode(0)
    let curr = list
    let carry = 0
    while(l1 || l2) {
        let sum = (l1?.val || 0)+ (l2?.val || 0) + carry
        carry = sum > 9 ? 1 : 0
        curr.next = new ListNode(sum % 10)
        curr = curr.next
        l1 = l1?.next
        l2 = l2?.next
    }
    if(carry) {
        curr.next = new ListNode(carry)
    }
    return list.next
};