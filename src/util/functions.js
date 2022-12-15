const fs = require('fs')

module.exports = {
    getAllFiles
}

/**
 * 
 * @param {fs.PathLike} path 
 * @returns 
 */
function getAllFiles(path){
    const files = fs.readdirSync(path)
    let r = []
    for (const file of files){
        if (file.endsWith(".js")){
            r.push(`${path}/${file}`)
        }else{
            const folder = fs.readdirSync(`${path}/${file}`).filter(file => file.endsWith(".js"))
            for (const file2 of folder){
                r.push(`${path}/${file}/${file2}`)
            }
        }
    }
    return r
}
