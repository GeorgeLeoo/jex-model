import Model from './../../src/Model'
import UserModelDescription from '../model/user'

const userOk = {
    nickname: 'xm',
    age: 20,
    isOpen: false,
    isClose: true,
    state: 'SHOW',
    address: {
        name: {
            firstName: 'x',
            lastName: 'hh'
        },
        tel: '18921483103'
    },
    payList: [
        {
            data: '2010-10-09',
            money: '400'
        },
        {
            data: '2020-12-03',
            money: '200'
        }
    ]
}

test('userOk', () => {
    const model = new Model(UserModelDescription)
    const data = model.generate(userOk)
    expect(JSON.stringify(data)).toBe(JSON.stringify({ nickname: 'xm' }));
});
