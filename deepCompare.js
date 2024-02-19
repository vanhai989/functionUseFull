import { typeOf } from './typeOf'

const deepCompare = (obj1, obj2) => {
    if(typeOf(obj1) !== typeOf(obj2)) return false

    if(typeOf(obj1) == 'array') {
        if(obj1.length !== obj2.length) return false
        return obj1.every((el, index) => deepCompare(el, obj2[index]))
    } else if(typeOf(obj1) === 'object') {
        return Object.keys(obj1).every(key => deepCompare(obj1[key], obj2[key]))
    } else {
        return obj1 === obj2
    }
}

console.log('deep compare:', deepCompare([1,{a: {a1: false}}], [1,{a: {a1: true}}]))
