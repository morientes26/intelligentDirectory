const fs = require('fs')
const config = require('loadConfig')

const SOURCE_PATH = config.source_folder
const INTERVAL = config.interval

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

/**
 * Robot object contents task and interval for processing files from destination folder
 */
let robot = {
    'task': () => {
        let filtredItems;
        fs.readdir(SOURCE_PATH, function(err, items) {
            for (let [key, filterObject] of Object.entries(config.folders)) {
                filtredItems = fileFilter(filterObject.postfix, items);
                console.log('Process [' + filtredItems.length + '] files filtred by ['+filterObject.postfix+']');
                moveFile(filtredItems, filterObject.destination)
            }
        });
    },
    'interval': INTERVAL
}

module.exports = robot
