class User {
    constructor(firstName, secondName, exampleDataList) {
        this._firstName = firstName
        this._secondName = secondName
        this._exampleDataList = exampleDataList

        firstName = null
        secondName = null
        exampleDataList = null
    }

    set firstName(value) {
        if (value.length < 1) {
            let text = "Please Enter Valid First Name"
            error_message.innerText = text
            throw new Error(text)
        }
        this._firstName = value
        console.log(value)
    }
    get firstName() {
        return this._firstName
    }
    set secondName(value) {
        if (value.length <= 2) {
            let text = "Please Enter Valid Last Name"
            error_message.innerText = text
            throw new Error(text)
        }
        this._secondName = value
        console.log(value)
    }
    get secondName() {
        return this._secondName
    }

    set exampleDataList(value) {
        if (value == '') {
            let text = "Please Enter Correct Subject"
            error_message.innerText = text
            throw new Error(text)
        }
        this._exampleDataList = value
        console.log(value)
    }
    get exampleDataList() {
        return this._exampleDataList
    }
}

class Operator extends User {
    constructor(firstName, secondName, exampleDataList, newTask) {
        super(firstName, secondName, exampleDataList)
        this._newTask = newTask
        this._toDoArray = []

        newTask = ""
        toDoArray = []
    }

    set newTask(value) {
        if (value != '') {
            this._newTask = value
        }
    }
    get newTask() {
        return this._newTask
    }
}

function validateUser(event) {
    event.preventDefault()

    let w = document.querySelector("#error_message")
    let x = document.querySelector("#firstName").value
    let y = document.querySelector("#secondName").value
    let z = document.querySelector("#exampleDataList").value

    w.style.padding = "20px"
    w.style.display = "block"

    const newUser = new Operator(x, y, z)

    newUser.firstName = x
    newUser.secondName = y
    newUser.exampleDataList = z

    document.writeln("<p>Form Submitted On:</p>")
    document.writeln(new Date())
    alert("Form Submitted Successfully!")
}
``







// getting all required elements
const firstInputField = document.querySelector('#firstInputField')
const secondInputField = document.querySelector('#secondInputField')
const addTaskButton = document.querySelector('#addToDo')
const editTaskButton = document.querySelector('#editToDo')
const toDoList = document.querySelector('#toDoContainer')
const deleteAllButton = document.querySelector('#clearAll')

firstInputField.onkeyup = () => {
    let userData = firstInputField.value // getting user entered value
    if (userData.trim() != 0) { // if user values aren't only spaces
        addTaskButton.classList.add("active") // activate the add button
    } else {
        addTaskButton.classList.remove("active") // deactivate the add button
    }
}

showTasks() // calling showTasks function

recount() // calling recount function

// if user click on the add button
addTaskButton.onclick = () => {
    let userData = firstInputField.value // getting user entered value
    let getLocalStorage = localStorage.getItem("ToDoTask") // getting local storage
    if (getLocalStorage == null) { // if local storage is empty
        toDoArray = [] // creating an empty array
    } else {
        toDoArray = JSON.parse(getLocalStorage) // transforming json string into a js object

        // alphabetical order
        toDoArray.sort((a, b) => {
                if (a > b) return 1
                if (a < b) return -1
                return 0
            })
            // ascending order
        toDoArray.sort((a, b) => a - b)
        console.log(toDoArray)
    }
    toDoArray.push(userData) // pushing or adding user data

    // alphabetical order
    toDoArray.sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })
        // ascending order
    toDoArray.sort((a, b) => a - b)
    console.log(toDoArray)
    localStorage.setItem("ToDoTask", JSON.stringify(toDoArray)) // transforming js object into a json string
    showTasks() // calling showTasks function
    recount() // calling recount function
    addTaskButton.classList.remove("active") // deactivate the add button
}

// function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("ToDoTask") // getting local storage
    if (getLocalStorage == null) { // if local storage is empty
        toDoArray = [] // creating an empty array
    } else {
        toDoArray = JSON.parse(getLocalStorage) // transforming json string into a js object

        // alphabetical order
        toDoArray.sort((a, b) => {
                if (a > b) return 1
                if (a < b) return -1
                return 0
            })
            // ascending order
        toDoArray.sort((a, b) => a - b)
        console.log(toDoArray)
    }

    const pendingNumber = document.querySelector("#pendingNumber")
    pendingNumber.textContent = toDoArray.length // passing the length value in pendingNumber
    if (toDoArray.length > 0) { // if array length is greater than zero
        deleteAllButton.classList.add("active") // active the clear all button
    } else {
        deleteAllButton.classList.remove("active") // unactive the clear all button
    }
    let newLiTag = ''
    toDoArray.forEach((element, index) => {
        newLiTag += `<li> ${element} <span class="mySpan"><input type="checkbox" class="spanThree"> </input><button class="spanOne" onclick='editTask(${index})'>EDIT</button> <button class="spanTwo" onclick='deleteTask(${index})'><i class="far fa-trash-alt">DEL</i></button></span></li>`
    })
    toDoList.innerHTML = newLiTag // adding new li tag inside ul tag
    firstInputField.value = '' // once task added leave the input field blank
    secondInputField.value = '' // once task edited leave the input field blank
    recount() // calling recount function
}

// edit task function
function editTask(index) {
    secondInputField.value = index
    let getLocalStorage = localStorage.getItem("ToDoTask")
    toDoArray = JSON.parse(getLocalStorage)

    // alphabetical order
    toDoArray.sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })
        // ascending order
    toDoArray.sort((a, b) => a - b)
    console.log(toDoArray)

    if (firstInputField.value == secondInputField.value) { // if array length is greater than zero
        editTaskButton.classList.remove("active") // active the clear all button
    } else {
        editTaskButton.classList.add("active") // unactive the clear all button
    }
    firstInputField.value = toDoArray[index]
    addTaskButton.style.display = "none"
    editTaskButton.style.display = "block"
    recount() // calling recount function
}

editTaskButton.addEventListener("click", () => {
    let getLocalStorage = localStorage.getItem("ToDoTask")
    toDoArray = JSON.parse(getLocalStorage)
    editTaskButton.classList.add("active") // activate the edit button
    addTaskButton.classList.remove("active") // deactivate the add button

    // alphabetical order
    toDoArray.sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })
        // ascending order
    toDoArray.sort((a, b) => a - b)
    console.log(toDoArray)
    let id = secondInputField.value
    toDoArray[id] = firstInputField.value
    addTaskButton.style.display = "block"
    editTaskButton.style.display = "none"
    firstInputField.value = ""
    localStorage.setItem("ToDoTask", JSON.stringify(toDoArray))
    showTasks() // calling showTasks function
    recount() // calling recount function
})

// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("ToDoTask") // getting local storage
    toDoArray = JSON.parse(getLocalStorage) // transforming json string into a js object
    toDoArray.splice(index, 1) // delete or remove the particular indexed li

    // alphabetical order
    toDoArray.sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })
        // ascending order
    toDoArray.sort((a, b) => a - b)
    console.log(toDoArray)

    // after remove the li again update the local storage
    localStorage.setItem("ToDoTask", JSON.stringify(toDoArray)) // transforming js object into a json string
    showTasks() // calling showTasks function
    recount() // calling recount function
}

deleteAllButton.onclick = () => {
    toDoArray = [] // empty the array

    // after clear all tasks again update the local storage
    localStorage.setItem("ToDoTask", JSON.stringify(toDoArray)) // transforming js object into a json string
    showTasks() // calling showTasks function
    recount() // calling recount function
    addTaskButton.classList.remove("active") // deactivate the add button
    editTaskButton.classList.remove("active") // deactivate the edit button
}

document.querySelector('input[type="checkbox"]').addEventListener('change', () => recount())

// counting function
function recount() {
    const myToDoList = document.querySelector('.myToDos')
    const count = myToDoList.querySelectorAll("input[type='checkbox']:checked").length
    document.querySelector("#pendingNum").textContent = `${count}`
}