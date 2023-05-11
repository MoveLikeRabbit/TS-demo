// https://leetcode.cn/problems/longest-substring-without-repeating-characters/

// 滑动窗口
var lengthOfLongestSubstring = function(s) {
    let hash = new Set()
    let rk = -1
    let maxlen = 0
    for(let i =0;i <s.length;i++) {
        if(i!=0) {
            hash.delete(s[i-1])
        }
        while(rk+1 < s.length && !hash.has(s[rk+ 1])) {
            hash.add(s[rk+1])
            rk++
        }
        maxlen = Math.max(maxlen, rk - i + 1)
    }
    return maxlen
};