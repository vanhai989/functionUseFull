import { typeOf } from './typeOf'

const sallowCompare = (obj1, obj2) => {
    if(typeOf(obj1) !== typeOf(obj2)) return false

    if(typeOf(obj1) == 'array') {
        return obj1.length === obj2.length
    } else if(typeOf(obj1) === 'object') {
        return Object.keys(obj1).every(key => obj1[key] == obj2[key])
    } else {
        return obj1 === obj2
    }
}

console.log('sallow compare:', sallowCompare([1,{a: {a1: false}}], [1,{a: {a1: true}}]))
