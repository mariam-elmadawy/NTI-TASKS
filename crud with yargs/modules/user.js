
const userData = ['id', 'name', 'email', 'phone', 'age']
const rwData = require('./jsonData')

const createUserObjectData = (data) => {
    const user = {}
    userData.forEach(h => {
        user[h] = data[h]

    });
    return user
}
class user {
    static addUser = (argv) => {
        const userRecord = createUserObjectData(argv)
        const data = rwData.readJsonData('users.json')
        data.push(userRecord)
        rwData.writeJsonData('users.json', data)
    }

    static showOneUser = (argv) => {
        const data = rwData.readJsonData('users.json')
        const singleUser = data.find(u => u.id == argv.id)
        if (!singleUser) console.log("doesn't exist")
        else console.log(singleUser)
    }

    static showAllUsers = () => {
        const data = rwData.readJsonData("users.json")
        data.forEach((user, i) => {
            console.log(`index:${i + 1} - name:${user.name} - user id:${user.id} - email:${user.email}`)
        })
    }

    static deleteOneUser = (argv) => {
        const data = rwData.readJsonData('users.json')
        data.forEach((e, i) => {
            if (e.id == argv.id) {
                data.splice(i, 1)
                rwData.writeJsonData('users.json', data)
            }
        })
    }

    static deleteAllUsers = (argv) => {
        // const userRecord = createUserObjectData(argv)
        // const data = rwData.readJsonData('users.json')
        // data.splice(userRecord)
        rwData.writeJsonData('users.json', [])
    }

    static editUser = (argv) => {
        const userRecord = createUserObjectData(argv)
        const data = rwData.readJsonData('users.json')
        data.forEach((u, i) => {
            if (u.id == argv.id) {
                data[i] = userRecord
                return data[i]
            };
        })
        rwData.writeJsonData('users.json', data)
    }
}

module.exports = user;