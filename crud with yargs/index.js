const yargs = require("yargs")
const user = require('./modules/user')
// add a new user record into an json file
yargs.command({
    command: 'addUser',
    builder: {
        name: { demandOption: true },
        email: { demandOption: true },
        age: { demandOption: true },
        phone: { demandOption: true }
    },
    handler: (argv) => {
        user.addUser(argv)
    }
})
//get all user data 
yargs.command({
    command: 'showAllUsers',
    handler: () => user.showAllUsers()
})
//delete all users records
yargs.command({
    command: 'deleteAllUsers',
    handler: (argv) => user.deleteAllUsers(argv)
})
// delete one user record using the user id
yargs.command({
    command: 'deleteOneUser',
    builder: { id: { demandOption: true } },
    handler: (argv) => user.deleteOneUser(argv)
})
// edit user record using the user id
yargs.command({
    command: 'editUser',
    builder: {
        id: { demandOption: true },
        name: { demandOption: true },
        email: { demandOption: true },
        phone: { demandOption: true },
        age: { demandOption: true }
    },
    handler: (argv) => user.editUser(argv)
})
yargs.argv

