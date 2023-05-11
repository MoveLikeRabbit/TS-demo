// https://leetcode.cn/problems/minimum-window-substring/



var minWindow = function (s, t) {
    // 统计t中字符出现的个数
    const needt = {};

    // window
    const window = {};
    for (let i = 0; i < t.length; i++) {
        if (needt[t[i]]) {
            needt[t[i]] = needt[t[i]] + 1;
        } else {
            needt[t[i]] = 1;
        }
        window[t[i]] = 0;
    }
    console.log('needt', needt);

    // window中是否包含所有t时，distance = 0
    let distance = t.length;
    // 左右指针
    let l = 0;
    let r = -1;
    let minStr = '';
    while (l < s.length && r <= s.length) {
        console.log('r', l, r, distance, window);
        if (distance === 0) {
            minStr =
                !minStr || r - l < minStr.length
                    ? s.substring(l, r + 1)
                    : minStr;
            if (window[s[l]]) {
                window[s[l]] = window[s[l]] - 1;
                if (needt[s[l]] > window[s[l]]) {
                    distance++;
                }
            }
            l++;
        } else {
            r++;
            if (window[s[r]] != undefined) {
                window[s[r]] = window[s[r]] + 1;
                if (window[s[r]] - needt[s[r]] <= 0) {
                    distance--;
                }
            }
        }
    }
    console.log('minStr', minStr);
    return minStr;
};
minWindow('ADOBECODEBANC', 'ABC');
