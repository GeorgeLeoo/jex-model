// const Model = require('../src/Model')
const Model = require('../lib')

// // 1.定义模型描述对象
// const modelDescription = {
//     id: Number,
//     name: String,
//     avatar: Object,
// }
//
// // 2.实例化model
// const instanceModel = new Model(modelDescription)
//
// // 3.定义数据源
// const dataSource = {
//     id: 123456,
//     name: '测试1',
//     avatar: { url:'http://xxx.png' }
// }


const modelDescription = {
    name: String,
    age: {
        type: Number,
        property: 'AGE',
        default: 18
    },
    isOpen: {
        type: Boolean,
        property: 'isOpen',
        default: false
    },
    state: {
        type: String,
        property: 'STATE',
        filter: (data) => {
            const map = {
                1: '开启',
                2: '关闭'
            }
            return map[data]
        }
    },
    price: {
        type: String,
        property: 'price',
        filter: 'price'
    },
    avatar: {
        type: String,
        property: 'ACCOUNT.AVATAR'
    },
    addressInfo: {
        type: Object,
        property: 'ADDRESS_INFO',
        children: {
            tel: {
                type: String,
                property: 'ADDRESS_INFO.TEL'
            },
            address: {
                type: Object,
                property: 'ADDRESS_INFO.ADDRESS',
                children: {
                    province: {
                        type: String,
                        property: 'ADDRESS.PROVINCE'
                    },
                    city: {
                        type: String,
                        property: 'ADDRESS.CITY'
                    },
                    area: {
                        type: String,
                        property: 'ADDRESS.AREA'
                    },
                    other: {
                        type: String,
                        property: 'ADDRESS.OTHER'
                    },
                },
            },
        }
    },
    addressName: {
        type: String,
        property: ['ADDRESS_INFO', 'ADDRESS_INFO.ADDRESS', 'ADDRESS.PROVINCE']
    },
    phone: {
        type: String,
        property: ['ADDRESS_INFO', 'ADDRESS_INFO.TEL']
    },
    list: {
        type: Array,
        property: 'list',
        children: {
            type: String,
            filter: (data) => {
                return data + ''
            }
        }
    },
    payList: {
        type: Array,
        property: 'PAY_LIST',
        children: {
            type: Object,
            children: {
                month: {
                    type: String,
                    property: 'MONTH'
                },
                money: {
                    type: String,
                    property: 'MONEY',
                    filter: 'price',
                    default: ''
                }
            }
        }
    }
}

const dataSource = {
    name: 'xm',
    AGE: 22,
    STATE: 2,
    price: '20000',
    "ACCOUNT.AVATAR": 'http://a.b.com/a.png',
    ADDRESS_INFO: {
        'ADDRESS_INFO.ADDRESS': {
            'ADDRESS.PROVINCE': '江苏省',
            'ADDRESS.CITY': '南京市',
            'ADDRESS.AREA': '建邺区',
            'ADDRESS.OTHER': '金穗花园'
        },
        'ADDRESS_INFO.TEL': '18921483101',
    },
    PAY_LIST: [
        {
            MONTH: '2020-03-04',
            // MONEY: 20
        },
        {
            MONTH: '2020-06-09',
            MONEY: 66
        },
    ],
    list: [ 'one', 'two', 3, false ]
}

const instanceModel = new Model(modelDescription)

// 4.调用 model.generate 方法生成最终数据
const model = instanceModel.generate(dataSource)
console.log(model)
