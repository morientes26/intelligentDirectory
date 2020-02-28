const appRoot = require('app-root-path')

test('load default configuration', () => {
    process.env.profile = 'default'
    const conf = require(appRoot + '/core/loadConfig')
    expect(conf.interval).toBe(10000);
});
