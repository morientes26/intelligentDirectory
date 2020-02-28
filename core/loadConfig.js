/**
 * Loading configuration file by defined ENV profile
 *
 * @return {JSON} configuration object
 */
const config = function () {
    let result = require('./../config/default.json')
    if (process.env.profile) {
        try {
            result = require('./../config/'+process.env.profile+'.json')
        } catch (err) {
            console.error(err)
        }
    }

    return result;
}()

module.exports = config
