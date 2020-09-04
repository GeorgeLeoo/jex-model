/**
 * 数据类型类
 */
class DataType {}

DataType.isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
DataType.isNumber = obj => Object.prototype.toString.call(obj) === '[object Number]'
DataType.isString = obj => Object.prototype.toString.call(obj) === '[object String]'
DataType.isUndefined = obj => Object.prototype.toString.call(obj) === '[object Undefined]'
DataType.isBoolean = obj => Object.prototype.toString.call(obj) === '[object Boolean]'
DataType.isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'
DataType.isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'
DataType.isNull = obj => Object.prototype.toString.call(obj) === '[object Null]'

/**
 * 获取最终的数据类型
 * @param {*} obj
 */
DataType.getType = obj => {
    let type = Object.prototype.toString.call(obj)
    return type.substring(8, type.length - 1)
}

DataType.ARRAY = 'ARRAY'
DataType.OBJECT = 'OBJECT'
DataType.STRING = 'STRING'
DataType.NUMBER = 'NUMBER'
DataType.BOOLEAN = 'BOOLEAN'
DataType.FUNCTION = 'FUNCTION'
DataType.NULL = 'NULL'
DataType.UNDEFINED = 'UNDEFINED'

module.exports = DataType
