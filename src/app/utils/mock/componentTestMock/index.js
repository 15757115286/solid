if (process.env.NODE_ENV == 'development') {
    let Mock = require('../config.js').default;

    Mock.Random.extend({
        getJob:function(){
            let all =  ['coder', 'doctor', 'teacher', 'student'];
            let random = Math.random() * all.length >> 0;
            return all[random];
        }
    })

    Mock.mock(/\/mock\/test/, {
        'name': /[\u4e00-\u9fa5]{2,4}/,
        'sex|1': true,
        'lang|1': ['javascript', 'java', 'c++', '.net'],
        'email':'@email',
        'job':'@getJob'
    })
}