const Utils = require('./Utils')

class Dep {
    constructor () {
        this.list = {}  // 缓存对象
        this.result = null  // 当相等时，将结果保存在这里
        this.isEqual = false    // 是否相等
    }
    
    /**
     * 先调
     * 判断 Dep 对象中是否有余 dataSource 相等的对象
     * @param dataSource 数据源对象
     * @returns {boolean}
     */
    isContentEqual (dataSource) {
        for (let depId in this.list) {
            if (this.list.hasOwnProperty(depId)) {
                const item = this.list[depId]
                if (Utils.contentEqual(dataSource, item.dataSource)) {
                    this.result = item.result
                    this.isEqual = true
                    return true
                }
            }
        }
    }
    
    /**
     * 后调
     * 添加 depId 和 options
     * @param depId dep 标识id
     * @param options 数据源和最终结果
     */
    add (depId, options) {
        // 若相等则不添加
        if (!this.isEqual) {
            this.list[depId] = options
        }
    }
    
    /**
     * 获取最终结果
     * @returns {null}
     */
    getResult () {
        return this.result
    }
    
    /**
     * 设置id
     * @returns {number}
     */
    setId() {
        return Dep.depId++
    }
    
}

Dep.depId = 0

module.exports = Dep
