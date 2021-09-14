class User {
    constructor(firstName, secondName, exampleDataList, newTask, confirmedTask) {
        this._firstName = firstName;
        this._secondName = secondName;
        this._exampleDataList = exampleDataList;
        this._newTask = newTask;
        this._confirmedTask = confirmedTask;

        firstName = null
        secondName = null
        exampleDataList = null
        newTask = null
        confirmedTask = null
    }

    set firstName(value) {
        if (value.length < 1) {
            let text = "Please Enter Valid First Name";
            error_message.innerText = text;
            console.log(text)
            throw new Error('Please Enter Valid First Name');
        }
        this._firstName = value;
        console.log(this._firstName = value)
    }
    get firstName() {
        return this._firstName;
    }
    set secondName(value) {
        if (value.length <= 2) {
            let text = "Please Enter Valid Last Name";
            error_message.innerText = text;
            console.log(text)
            throw new Error('Please Enter Valid Last Name');
        }
        this._secondName = value;
        console.log(this._secondName = value)
    }
    get secondName() {
        return this._secondName;
    }

    set exampleDataList(value) {
        if (value == '') {
            let text = "Please Enter Correct Subject";
            error_message.innerText = text;
            console.log(text)
            throw new Error('Please Enter Correct Subject');
        }
        this._exampleDataList = value;
        console.log(this._exampleDataList = value)
    }
    get exampleDataList() {
        return this._exampleDataList;
    }

    set newTask(value) {
        if (value != this.confirmedTask) {
            let text = "Tasks Did Not Tally"
            error_message.innerText = text;
            console.log(text)
            alert("Tasks Did Not Match");
            throw new Error('Tasks Did Not Match')
        } else {
            let text = "Task Added"
            error_message.innerText = text;
            console.log(text)
                // alert("Task Added Successfully");
            this._newTask = value;
        }
    }
    get newTask() {
        return this._newTask;
    }

    set confirmedTask(value) {
        if (value != this.newTask) {
            let text = "Tasks Did Not Match"
            error_message.innerText = text;
            console.log(text)
            alert("Tasks Did Not Tally");
            throw new Error('Tasks Did Not Tally')
        } else {
            let text = "Task Added"
            error_message.innerText = text;
            console.log(text)
                // alert("Task Added Successfully");
            this._confirmedTask = value;
        }
    }
    get confirmedTask() {
        return this._confirmedTask;
    }
}

function validateUser(event) {
    event.preventDefault()

    let u = document.querySelector("#error_message");
    let v = document.querySelector("#firstName").value;
    let w = document.querySelector("#secondName").value;
    let x = document.querySelector("#exampleDataList").value;
    let y = document.querySelector("#firstInputField").value;
    let z = document.querySelector("#secondInputField").value;


    u.style.padding = "20px";
    u.style.display = "block";

    const newUser = new User(v, w, x, y, z);

    newUser.firstName = v
    newUser.secondName = w
    newUser.exampleDataList = x
    newUser.newTask = y
    newUser.confirmedTask = z

    document.writeln("<p>Form Submitted On:</p>")
    document.writeln(new Date())
    alert("Form Submitted Successfully!");
}


let saveToDoButton = document.querySelector('#saveToDo')
let viewToDoButton = document.querySelector('#viewToDo')
let toDoContainer = document.querySelector('#toDoContainer')
let firstInputField = document.querySelector('#firstInputField')
let secondInputField = document.querySelector('#secondInputField')


saveToDoButton.addEventListener('click', function() {

    // get data from input box
    let firstData = firstInputField.value
    let secondData = secondInputField.value

    // storing data
    firstData = firstData.toString()
    firstData = JSON.stringify(firstData)

    secondData = secondData.toString()
    secondData = JSON.stringify(secondData)

    localStorage.setItem("firstJSON", firstData)
    localStorage.setItem("secondJSON", secondData)

    // retrieving data
    let firstTask = localStorage.getItem("firstJSON");
    let secondTask = localStorage.getItem("secondJSON");

    // converting from JSON to non-JSON 
    let first = JSON.parse(firstTask)
    let second = JSON.parse(secondTask)

    // if there is nothing saved at the start then save an empty array
    if (first == null && second == null) {
        localStorage.setItem('data', '[]')
    } else if (first == '' && second == '') {
        localStorage.setItem('data', '[]')
        let text = "Please Fill In Thy Today's Task"
        console.log(text)
        alert(text);
    } else if (first == '' && second != '') {
        localStorage.setItem('data', '[]')
        let text = "Please Input New Task"
        console.log(text)
        alert(text);
    } else if (first != '' && second == '') {
        localStorage.setItem('data', '[]')
        let text = "Please Confirm New Task"
        console.log(text)
        alert(text);
    } else if (first != second) {
        localStorage.setItem('data', '[]')
        let text = "Tasks Did Not Match"
        console.log(text)
        alert("Tasks Did Not Match");
    } else if (first == second && first != '' && second != '') {
        alert('Task Added')

        viewToDoButton.addEventListener('click', function() {

            // if there is indeed data then continue

            var paragraph = document.createElement('p')
            paragraph.classList.add('paragraph-styling')

            document.querySelector('#toDoContainer').innerHTML = JSON.parse(localStorage.getItem('data'))
            toDoContainer.appendChild(paragraph)
            firstData = ""
            secondData = ''

            let text = "Task Added Successfully!"
            console.log(text)
            alert(text);

            paragraph.addEventListener('click', function() {
                paragraph.style.textDecoration = "line-through"
            })
            paragraph.addEventListener('dblclick', function() {
                toDoContainer.removeChild(paragraph)
            })

        })
    }
    // get old data and slap it to the new data
    var oldData = JSON.parse(localStorage.getItem('data'))
    oldData.push(secondData)

    // save the old + new data to local storage
    localStorage.setItem('data', JSON.stringify(oldData))
})