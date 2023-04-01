const fs = require('fs')
class rwData {
    static readJsonData = (file) => {
        let result
        try {
            result = JSON.parse(fs.readFileSync(file))
            if (!Array.isArray(result)) throw new Error('empty')
        } catch (e) {
            result = []
        }
        return result;
    }
    static writeJsonData = (file, data) => {
        fs.writeFileSync(file, JSON.stringify(data))
    }
}
module.exports = rwData