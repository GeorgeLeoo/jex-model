const UserModelDescription = {
    nickname: String,
    // age: {
    //     type: Number,
    //     property: 'AGE',
    //     default: 18
    // },
    // isOpen: {
    //     type: Boolean,
    //     property: 'isOpen',
    //     default: false
    // },
    // state: {
    //     type: String,
    //     property: 'STATE',
    //     filter: (data) => {
    //         const map = {
    //             1: '开启',
    //             2: '关闭'
    //         }
    //         return map[data]
    //     }
    // },
    // price: {
    //     type: String,
    //     property: 'price',
    //     filter: 'price'
    // },
    // avatar: {
    //     type: String,
    //     property: 'ACCOUNT.AVATAR'
    // },
    // addressInfo: {
    //     type: Object,
    //     property: 'ADDRESS_INFO',
    //     children: {
    //         tel: {
    //             type: String,
    //             property: 'ADDRESS_INFO.TEL'
    //         },
    //         address: {
    //             type: Object,
    //             property: 'ADDRESS_INFO.ADDRESS',
    //             children: {
    //                 province: {
    //                     type: String,
    //                     property: 'ADDRESS.PROVINCE'
    //                 },
    //                 city: {
    //                     type: String,
    //                     property: 'ADDRESS.CITY'
    //                 },
    //                 area: {
    //                     type: String,
    //                     property: 'ADDRESS.AREA'
    //                 },
    //                 other: {
    //                     type: String,
    //                     property: 'ADDRESS.OTHER'
    //                 },
    //             },
    //         },
    //     }
    // },
    // addressName: {
    //     type: String,
    //     property: ['ADDRESS_INFO', 'ADDRESS_INFO.ADDRESS', 'ADDRESS.PROVINCE']
    // },
    // phone: {
    //     type: String,
    //     property: ['ADDRESS_INFO', 'ADDRESS_INFO.TEL']
    // },
    // list: {
    //     type: Array,
    //     property: 'list',
    //     children: {
    //         type: String,
    //         filter: (data) => {
    //             return data + ''
    //         }
    //     }
    // },
    // payList: {
    //     type: Array,
    //     property: 'PAY_LIST',
    //     children: {
    //         type: Object,
    //         children: {
    //             month: {
    //                 type: String,
    //                 property: 'MONTH'
    //             },
    //             money: {
    //                 type: String,
    //                 property: 'MONEY',
    //                 filter: 'price',
    //                 default: ''
    //             }
    //         }
    //     }
    // }
}

export default UserModelDescription
