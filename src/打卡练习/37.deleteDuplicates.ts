// https://leetcode.cn/problems/remove-duplicates-from-sorted-list/

var deleteDuplicates = function(head) {
    if(!head) {
        return head
    }
    let curr = head
    while(curr.next) {
        let next = curr.next
        if(curr.val === next.val) {
            curr.next = next.next
        } else {
            curr = next
        }
    }
    return head
};