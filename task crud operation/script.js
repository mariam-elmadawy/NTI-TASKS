// start variables
const myForm = document.querySelector('#myForm');
const userWrap = document.querySelector('#userWrap')
const singleData = document.querySelector('#singleData')
const editData = document.querySelector('#edit')
const editBtn = document.querySelector('.editBtn')

// read and write the data from local storage
const writeDataToLocalStorage = (data, key = 'tasks') => localStorage.setItem(key, JSON.stringify(data));
const readDataFromLocalStorage = (key = 'tasks') => JSON.parse(localStorage.getItem(key)) || [];

const heads = ['name', 'phone', 'age', 'status']


//start functions
//read and write data and push the value inside the user
function getUserData(user) {
    const allUsers = readDataFromLocalStorage('users')
    allUsers.push(user)
    writeDataToLocalStorage(allUsers, 'users')
}


// function of user json db
const getUserObject = (myForm) => {
    const user = { id: Date.now() }
    heads.forEach(element => user[element] = myForm.elements[element].value);
    return user
}


// function to create multible elements 
function createUserElements(el, parent, txt = null, classes = null) {
    let element = document.createElement(el)
    parent.appendChild(element);
    if (txt) element.textContent = txt;
    if (classes) element.classList = classes
    return element
}


// get data from local storage when the user submit 
if (myForm) {
    myForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const user = getUserObject(myForm)
        getUserData(user)
        window.location = 'index.html'
        console.log(user);

    })
}


drawData = () => {
    userWrap.innerHTML = ''
    const allUsers = readDataFromLocalStorage('users')
    allUsers.forEach((user, i) => {
        const tr = createUserElements('tr', userWrap)
        createUserElements('td', tr, user.id)
        createUserElements('td', tr, user.name)
        createUserElements('td', tr, user.phone)
        createUserElements('td', tr, user.age)
        const status = createUserElements('td', tr, user.status)

        const td = createUserElements('td', tr)
        const showBtn = createUserElements('button', td, 'show', 'mx-3 btn btn-primary')
        const delBtn = createUserElements('button', td, 'delete', 'mx-3 btn btn-danger')
        const editBtn = createUserElements('button', td, 'edit', 'mx-3 btn btn-warning')

        delBtn.addEventListener('click', (e) => {
            const allUsers = readDataFromLocalStorage('users')
            allUsers.splice(i, 1)
            console.log("test");
            writeDataToLocalStorage(allUsers, 'users')
            drawData()
        });
        showBtn.addEventListener('click', () => {
            localStorage.setItem("index", i)
            window.location = "single.html"
        });
        editBtn.addEventListener('click', (e) => {

            e.preventDefault()
            console.log('edit btn');
            if ([user.status] == 'deactive') {
                status.innerHTML = 'active'
                status.style.color = 'blue'
            } else if ([user.status] == 'active') {
                status.innerHTML = 'deactive'
                status.style.color = 'red'
            } else {
                status.innerHTML = 'not have status'
            }
        })
    })
}

if (userWrap) { drawData() }

if (singleData) {
    const index = localStorage.getItem("index")
    const allUsers = readDataFromLocalStorage("users")
    createUserElements("p", singleData, allUsers[index].id, 'bg-body-tertiary')
    createUserElements("p", singleData, allUsers[index].name, 'bg-body-tertiary')
    createUserElements("p", singleData, allUsers[index].phone, 'bg-body-tertiary')
    createUserElements("p", singleData, allUsers[index].age, 'bg-body-tertiary')
    createUserElements("p", singleData, allUsers[index].status, 'bg-body-tertiary')

}

