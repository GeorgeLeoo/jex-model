/**
 * 过滤器类
 */
class Filters {}

Filters.price = (price) => {
    return "¥ " + Number(price) * 100
}

module.exports = Filters
