
//https://leetcode.cn/problems/intersection-of-two-arrays/


// 时间复杂度 O(m+n)
// 空间复杂度 O(m+n)
var intersection = function(nums1, nums2) {
    const set1 = new Set(nums1);
    const res = []
    for(let num of nums2) {
        if(set1.has(num)) {
            res.push(num);
            set1.delete(num)
        }
    }
    return res;
};