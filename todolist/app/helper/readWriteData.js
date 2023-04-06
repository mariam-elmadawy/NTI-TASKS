const fs = require("fs")

class readWriteData {
    static readJsonData = (filename) => {
        let result;
        try {
            result = JSON.parse(fs.readFileSync(filename))
            if (!Array.isArray(result)) throw new Error('data not found')
        } catch (e) {
            result = []
        }
        return result
    }
    static writeJsonData = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data))
}

module.exports = readWriteData