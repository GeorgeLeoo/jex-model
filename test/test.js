import Model from '../src/Model'

const user = {
    NAME: 'xm',
    AGE: 12,
    'USER.ACCOUNT': {
        'USER.ACCOUNT_NICKNAME': 'suxing',
        'USER.ACCOUNT_IMGS': 'xxxxxxxx'
    },
    ADDRESS: [
        {
            name: 'xm',
            tel: '18921482310',
            address: '南京建业'
        },
        {
            name: 'xh',
            tel: '18321482310',
            address: '南通通州'
        },
    ],
    price: 200,
    createdAt: '2020-03-23 12:33:44'
}

const UserModelDescription = {
    name: {
        type: String,
        property: 'NAME'
    },
    age: {
        type: Number,
        property: 'AGE',
        default: 18
    },
    nickname: {
        type: String,
        property: ['USER.ACCOUNT', 'USER.ACCOUNT_NICKNAME']
    },
    account: {
        type: Object,
        property: ['USER.ACCOUNT'],
        children: {
            nickname: {
                type: String,
                property: 'USER.ACCOUNT_NICKNAME'
            },
            imgs: {
                type: String,
                property: 'USER.ACCOUNT_IMGS'
            },
        }
    },
    address: {
        type: Array,
        property: 'ADDRESS',
        default: [],
        children: {
            name: {
                type: String,
                property: 'name',
            },
            tel: {
                type: String,
                property: 'tel',
                default: ''
            },
            address: {
                type: String,
                property: 'address',
                default: ''
            }
        }
    },
    state: {
        type: String,
        property: 'state',
        filter: (data) => {}
    },
    price: {
        type: Number,
        default: 10,
        property: 'price',
        filter: 'price'
    },
    createdAt: {
        type: Date,
        default: new Date(),
        format: 'YYYY-MM-DD',
        property: 'createdAt'
    }
}

const address =  [
    {
        name: 'xm',
        tel: '18921482310',
        address: '南京建业'
    },
    {
        name: 'xh',
        tel: '18321482310',
        address: '南通通州'
    },
]

const AddressModelDescription = {
    type: Array,
    children: {
        name: {
            type: String,
            property: 'name',
        },
        tel: {
            type: String,
            property: 'tel',
            default: ''
        },
        address: {
            type: String,
            property: 'address',
            default: ''
        }
    }
}

const account = {
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
    list: [ 'one', 'two', 3, false ],
}

const AccountModelDescription = {
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
        },
        // filter: (data) => {
        //     return data.map(v => {
        //         return v + ''
        //     })
        // },
    },
    payList: {
        type: Array,
        property: 'PAY_LIST',
        children: {
            // type: Object,
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

const model = new Model(AccountModelDescription)
const data = model.generate(account)
console.log(JSON.stringify(data))
