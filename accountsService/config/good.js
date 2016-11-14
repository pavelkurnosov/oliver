module.exports = {
    ops: {
        interval: 30000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-console'
        }, 'stdout']
    }
};


// myFileReporter: [{
//     module: 'good-squeeze',
//     name: 'Squeeze',
//     args: [{ ops: '*' }]
// }, {
//     module: 'good-squeeze',
//     name: 'SafeJson'
// }, {
//     module: 'good-file',
//     args: ['./test/fixtures/awesome_log']
// }],