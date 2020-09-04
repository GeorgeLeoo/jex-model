# Welcome to JexModel
~~~~
I'm 数据转换器

I'm 解耦前后端开发

I'm 提升开发效率

I'm 提升程序健壮性
~~~~

# Base usage
```javascript
import Model from 'Model'

// 1.定义数据模型描述对象
const modelDescription = {
    id: Number,
    name: String,
    avatar: Object,
}

// 2.实例化model
const instanceModel = new Model(modelDescription)

// 3.定义数据源
const dataSource = {
    id: 123456,
    name: '测试1',
    avatar: { url:'http://xxx.png' }
}
// 4.调用 model.generate 方法生成最终数据
const model = instanceModel.generate(dataSource)

console.log(model)  // { id: 123456, name: '测试1', avatar: { url: 'http://xxx.png' } }

```

# 数据模型描述对象 modelDescription
modelDescription 由 key-value 组成，key 是最终的键名，value是具体描述对象，可以是一个数据类型，也可以是一个对象
* type: 数据类型，拥有 Number、String、Object、Array、Boolean
* property: 要映射的数据源中的属性值
* default: 默认值，若数据源中没有该属性，则使用默认值
* filter: 过滤器，对结果进行数据处理，若是字符串则使用内置过滤器，若使用函数则使用自定义函数
* children：若 父类型 是 对象 或 数组 则 可以对继续描述子类型


# 示例
```javascript
import Model from 'Model'

// 1. 定义数据模型描述对象
const modelDescription = {
    // 简写
    // 左侧 name = 最终映射的值 = 数据源中的值，
    // 右侧 String 是数据类型
    name: String,
    age: {
        type: Number,   // 数据类型
        property: 'AGE',    // 数据源中的属性
        default: 18 // 默认值
    },
    isOpen: {
        type: Boolean,
        property: 'isOpen',
        default: false
    },
    state: {
        type: String,
        property: 'STATE',
        // 自定义过滤器
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
        // 内置过滤器
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
        // 若要取得某一对象下某一属性，如a.b.c，则使用数组形式 [a, b, c]
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


// 2. 实例化model
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
//  {
//      name: 'xm',
//      age: 22,
//      isOpen: false,
//      state: '关闭',
//      price: '¥ 2000000',
//      avatar: 'http://a.b.com/a.png',
//      addressInfo: {
//          tel: '18921483101',
//          address: { 
//              province: '江苏省', 
//              city: '南京市', 
//              area: '建邺区', 
//              other: '金穗花园' 
//          }
//      },
//      addressName: '江苏省',
//      phone: '18921483101',
//      list: [ 'one', 'two', '3', 'false' ],
//      payList: [
//          { month: '2020-03-04', money: '¥ 0' },
//          { month: '2020-06-09', money: '¥ 6600' }
//      ]
//} 

```
