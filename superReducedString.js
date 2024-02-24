function superReducedString(s) {
    if (!s) {
        return "Empty String"
    }
    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i + 1]) {
            if (i == 0) {
                return superReducedString(s.slice(i + 2, s.length))
            } else {
                return superReducedString(s.slice(0, i) + s.slice(i + 2, s.length))
            }
        }
    }
    return s
}

console.log(superReducedString('aaabdddeeeeeefg'), 'my solution');


const remove = (s, i, n) => {
    if (i == 0) {
        return s.slice(i + n, s.length)
    } else {
        return s.slice(0, i) + s.slice(i + n, s.length)
    }
}


const superReducedStringCSharp = (s) => {
    let i = 0;
    while (i < s.length - 1) {
        if (s[i] != s[i + 1]) {
            i++;
            continue;
        }
        s = remove(s,i, 2);
        i = 0;
    }
    return s.length != 0 ? s : "Empty String";
}

console.log(superReducedStringCSharp('aaabdddeeeeeefg'), 'convert c# to js solution');



