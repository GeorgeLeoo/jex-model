const { isArray, isObject, isPrimitive } = require('./DataType')

/**
 * 工具类
 */
class Utils {}

Utils.getObjectValue = (data, property) => {
    if (!isObject(data)) {
        throw new Error('data need object')
    }
    let value = Utils.deepClone(data)
    if (isArray(property)) {
        property.length > 0 && property.forEach(key => {
            value = value[key]
        })
        return value
    } else {
        return value[property]
    }
}

Utils.deepClone = function(obj = {}) {
    // 值类型的情况下直接返回
    // obj 是 null，或者不是对象也不是数组，就直接返回
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    // 初始化返回结果,是数组就定义为数组，是对象就定义为对象
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    
    for (const key in obj) {
        // 判断 key 是否是自身的属性
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            // 保证不是原型上的属性
            result[key] = this.deepClone(obj[key])
        }
    }
    return result
}

Utils.contentEqual = (source, target) => {
    // 若 target 是原始数据类型和函数，则 直接比较
    if (isPrimitive(source) || isPrimitive(target)) {
        return source === target
    }
    // 若都是对象
    if (isObject(source) && isObject(target)) {
        const sourceLength = Object.keys(source).length
        const targetLength = Object.keys(target).length
        
        // 若对象长度不等则肯定不等
        if (sourceLength !== targetLength) {
            return false
        }
        
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                const isEqual = Utils.contentEqual(source[key], target[key])
                if (!isEqual) {
                    return false
                }
            }
        }
        return true
    }
    // 若都是数组
    if (isArray(source) && isArray(target)) {
        const sourceLength = source.length
        const targetLength = target.length
        
        // 若数组长度不等则肯定不等
        if (sourceLength !== targetLength) {
            return false
        }
        for (let i = 0; i < sourceLength; i++) {
            const isEqual = Utils.contentEqual(source[i], target[i])
            if (!isEqual) {
                return false
            }
        }
        return true
    }
    // 啥也不是
    return false
}

module.exports = Utils
