const fs = require('fs')

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

const SOURCE_PATH = config.source_folder

/**
* Filtering files by postFix
*
* @param postfix {Array} array of postfix stings (['jpg', 'png'...])
* @param items {Array} array of file names
* @return {Array} array of filtered file names
*/
let fileFilter = (postfix, items) => {
    return items.filter( (item) => {
        let match = false;
        postfix.forEach( (f) => {
            if (item.includes(f)){
                match = true
            }
        })

        return match;
    })
}

/**
 * Task for processing files from destination folder
 */
let task = () => {
    let filtredItems;
    fs.readdir(SOURCE_PATH, function(err, items) {
        for (let [key, filterObject] of Object.entries(config.folders)) {
            filtredItems = fileFilter(filterObject.postfix, items);
            console.log('Process [' + filtredItems.length + '] files filtred by ['+filterObject.postfix+']');
            moveFile(filtredItems, filterObject.destination)
        }
    });
}

/**
 * Move file/s from source path to destination path
 *
 * @param  {[array]/[string]} source of file names
 * @param  {[string]} destination of files
 */
let moveFile = (source, destination) => {
    let move = (source, destination) =>
        fs.rename(
            SOURCE_PATH + '/' + source,
            destination + '/' + source,
            (err) => {
                if (err) throw err
                console.log('Successfully renamed moved!')
            })

    if (Array.isArray(source)) {
        source.forEach( (s) => move(s, destination))
    } else {
        move(source, destination)
    }
}

module.exports = task
