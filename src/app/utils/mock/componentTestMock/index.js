if (process.env.NODE_ENV == 'development') {
    let Mock = require('../config.js').default;

    Mock.mock(/\/mock\/test/, {
        'name': /[\u4e00-\u9fa5]{2,4}/,
        'sex|1': true,
        'lang|1-4': [{'job|1':['javascript', 'java', 'c++', '.net']}],
        'email':'@email'
    })
}