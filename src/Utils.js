const { isArray, isObject } = require('./DataType')

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

module.exports = Utils
