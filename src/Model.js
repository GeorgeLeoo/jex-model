const { isArray, isObject, isFunction, isUndefined, isString } = require('./DataType')
const DataType = require('./DataType')
const Utils = require('./Utils')
const Filters = require('./Filters')

class Model {
    
    /**
     * @param modelDescription 模型描述对象
     */
    constructor (modelDescription) {
        this.modelDescription = modelDescription
        this.result = null
        this.resultType = null
    }
    
    /**
     * 初始化结果集，对象还是数组
     * @param data
     * @returns {{}}
     * @private
     */
    _initResult (data) {
        let result = null
        if (isArray(data)) {
            result = []
        } else if (isObject(data)) {
            result = {}
        } else {
            throw new Error('The model.generate() requires an array or object type argument.')
        }
        return result
    }
    
    /**
     * 初始化结果集类型
     * @param data
     * @returns {string}
     * @private
     */
    _initResultType (data) {
        let resultType = null
        if (isArray(data)) {
            resultType = DataType.ARRAY
        } else if (isObject(data)) {
            resultType = DataType.OBJECT
        } else {
            throw new Error('The model.generate() requires an array or object type argument.')
        }
        return resultType
    }
    
    /**
     * 判断数据源 data 的 key 对应的 value 值 和模型描述对象中描述的数据类型是否一样
     * 数据类型不一样，直接抛出异常
     * @param value 最终值
     * @param dataType 数据类型
     * @param errorMessage 错误信息
     * @private
     */
    _checkType (value, dataType, errorMessage) {
        if (DataType.getType(value) !== DataType.getType(dataType(value))) {
            throw new Error(errorMessage)
        }
    }
    
    /**
     * 获取默认值，有默认值
     * @param key 数据模型对象中声明的键名
     * @param value 数据模型对象中property 在 data 中的 value 值
     * @param modelDescriptionValue 数据模型对象中声明的默认值
     * @returns {*}
     * @private
     */
    _getDefaultValue (value, modelDescriptionValue, key) {
        const defaultValue = modelDescriptionValue.default
        const dataType = modelDescriptionValue.type
        if (isUndefined(value)) {
            if (isUndefined(defaultValue)) {
                throw new Error(key + ' need default value.')
            } else {
                const errorMessage = key + '\'s default value need type ' + DataType.getType(new dataType(defaultValue)) + ', instead of ' + DataType.getType(defaultValue)
                this._checkType(defaultValue, dataType, errorMessage)
                return defaultValue
            }
        } else {
            return value
        }
    }
    
    /**
     * 获取使用过滤器后的数据
     * @param value
     * @param modelDescriptionValue
     * @returns {*}
     * @private
     */
    _getFilterValue (value, modelDescriptionValue) {
        // 如果存在过滤器
        const filter = modelDescriptionValue.filter
        // 过滤器是函数
        if (isFunction(filter)) {
            return filter(value)
        } else if (isString(filter)) {
            // 过滤器是字符串
            const buildInFilter = Filters[filter]
            if (isFunction(buildInFilter)) {
                return buildInFilter(value)
            } else {
                throw new Error(filter + ' is not a build in filter.')
            }
        } else {
            return value
        }
    }
    
    /**
     *
     * @param data
     * @param property
     * @param fn
     * @returns {{}}
     * @private
     */
    _buildOnArray1(data, property, fn) {
        const result = []
        const temp = Utils.deepClone(data)
        temp[property].forEach(item => {
            result.push(fn(item))
        })
        temp[property] = result
        return temp
    }
    
    /**
     * 生成结果
     * @param data
     * @param key
     * @param modelDescriptionValue
     * @returns {*}
     * @private
     */
    _generateResultFromObject (data, key, modelDescriptionValue) {
        const { type, property } = modelDescriptionValue
        // property === 'ADDRESS_INFO' && console.log(type, property)
        // 若 modelDescriptionValue 不是对象，那么 property 和 数据源的 property 一样
        // 获得数据源 data 的 key 对应的 value 值
        let value = null
        
        if (isUndefined(property)) {
            throw new Error(key + ' need property.')
        }
        
        if (isUndefined(type)) {
            throw new Error(property + ' need type property.')
        }
        
        if (!(type === String || type === Number || type === Boolean || type === Object || type === Array)) {
            throw new Error(property + ' need type property, only Number, String, Boolean, Object, Array.')
        }
        
        if (type === Array) {
            const children = modelDescriptionValue.children
            if (isObject(children)) {
                if (children.type === Object) {
                    const temp = Utils.deepClone(data)
                    const children = modelDescriptionValue.children.children
                    if (children) {
                        let model = new Model(children)
                        const result = []
                        temp[property].forEach(item => {result.push(model.generate(item))})
                        model = null
                        temp[property] = result
                    }
                    data = temp
                }
                // else {
                //     throw new Error('children need type property')
                // }
                const filter = children.filter
                if (isFunction(filter)) {
                    const result = []
                    const temp = Utils.deepClone(data)
                    temp[property].forEach(item => { result.push(filter(item)) })
                    temp[property] = result
                    data = temp
                }
            }
        }
        
        if (type === Object) {
            const children = modelDescriptionValue.children
            const temp = Utils.deepClone(data)
            if (children) {
                let model = new Model(children)
                temp[property] = model.generate(temp[property])
                model = null
            }
            data = temp
        }
        
        // property === 'ADDRESS.PROVINCE' && console.log(data, property)
        value = Utils.getObjectValue(data, property)
        // 设置默认值
        value = this._getDefaultValue(value, modelDescriptionValue, key)
        
        // 设置使用过滤器后的值
        value = this._getFilterValue(value, modelDescriptionValue)
        
        // 检查类型
        this._checkType(value, type, key + ' need type ' + DataType.getType(new type(value)) + ', instead of ' + DataType.getType(value))
        
        // 否则 直接赋值给 result
        return value
    }
    
    /**
     *
     * @param data
     * @param modelDescription
     * @returns {{}}
     * @private
     */
    _buildOnObject(data,modelDescription) {
        let result = {}
        // 遍历模型描述对象
        for (let key in modelDescription) {
            if (modelDescription.hasOwnProperty(key)) {
                // 获得模型描述对象的 key 对应的 value 值 modelDescriptionValue
                const modelDescriptionValue = modelDescription[key]
                let _modelDescriptionValue = {}
                // 若 modelDescriptionValue 是对象
                if (isObject(modelDescriptionValue)) {
                    _modelDescriptionValue = modelDescriptionValue
                } else {
                     _modelDescriptionValue = {
                        type: modelDescriptionValue,
                        property: key,
                    }
                }
                result[key] = this._generateResultFromObject(data, key, _modelDescriptionValue)
            }
        }
        return result
    }
    
    /**
     *
     * @param data
     * @param modelDescription
     * @returns {[]}
     * @private
     */
    _buildOnArray(data, modelDescription) {
        const result = []
        let model = new Model(modelDescription)
        data.forEach(item => { result.push(model.generate(item)) })
        model = null
        return result
    }
    
    /**
     * 构建函数
     * @param data
     * @param modelDescription
     * @param result
     * @param resultType
     * @private
     */
    _build (data, modelDescription, result, resultType) {
        // 如果传入的 data 是对象
        if (resultType === DataType.OBJECT) {
            return this._buildOnObject(data, modelDescription)
        }
        // 如果传入的 data 是数组
        if (resultType === DataType.ARRAY) {
            return this._buildOnArray(data, modelDescription)
        }
    }
    
    /**
     * 生成函数
     * @param dataSource 数据源
     * @returns {*}
     */
    generate (dataSource) {
        const data = Utils.deepClone(dataSource)
        this.result = this._initResult(data)
        this.resultType = this._initResultType(data)
        return this._build(data, this.modelDescription, this.result, this.resultType)
    }
}


module.exports = Model
