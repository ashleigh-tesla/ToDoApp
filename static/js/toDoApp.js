class User {
    constructor(firstName, secondName, exampleDataList) {
        this._firstName = firstName;
        this._secondName = secondName;
        this._exampleDataList = exampleDataList;

        firstName = null
        secondName = null
        exampleDataList = null
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
}

class Operator extends User {
    constructor(firstName, secondName, exampleDataList, newTask, confirmedTask) {
        super(firstName, secondName, exampleDataList)
        this._newTask = newTask;
        this._confirmedTask = confirmedTask;

        newTask = ""
        confirmedTask = ''
    }

    saveTask() {
        let firstInputField = document.querySelector('#firstInputField')
        let secondInputField = document.querySelector('#secondInputField')

        // get data from input box
        let first = firstInputField.value
        let new_data = secondInputField.value

        // if there is nothing saved at the start then save an empty array
        if (localStorage.getItem('data') == null) {
            localStorage.setItem('data', '[]')
        } else if (first == '' && new_data == '') {
            localStorage.setItem('data', '[]')
            let text = "Please Fill In Thy Today's Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
        } else if (first == '' && new_data != '') {
            localStorage.setItem('data', '[]')
            let text = "Please Input New Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
        } else if (first != '' && new_data == '') {
            localStorage.setItem('data', '[]')
            let text = "Please Confirm New Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
        } else if (first != new_data) {
            localStorage.setItem('data', '[]')
            let text = "Tasks Did Not Match"
            error_message.innerText = text;
            console.log(text)
            alert("Tasks Did Not Match");
        } else if (first == new_data && first != '' && new_data != '') {
            let text = 'Task Added'
            error_message.innerText = text;
            console.log(text)
            alert(text)

            // get old data and slap it to the new data
            var old_data = JSON.parse(localStorage.getItem('data'))
            old_data.push(new_data)

            // clear inputs
            firstInputField.value = ""
            secondInputField.value = null

            // save the old + new data to local storage
            localStorage.setItem('data', JSON.stringify(old_data))
            let myData = JSON.parse(localStorage.getItem('data'))
            console.log(myData)
        }
    }
    viewTask() {
        let toDoContainer = document.querySelector('#toDoContainer')

        toDoContainer.style.display = 'flex'

        // if there is indeed data then continue
        if (localStorage.getItem('data') != null) {
            let paragraph = document.createElement('p')
            paragraph.classList.add('paragraph-styling')
            paragraph.innerText = JSON.parse(localStorage.getItem('data')).splice(-1)[0]
            toDoContainer.appendChild(paragraph)
            let text = "Added New Task"
            error_message.innerText = text;
            paragraph.addEventListener('click', function() {
                paragraph.style.textDecoration = "line-through"
                localStorage.remove();
                let text = "Task Cancelled"
                error_message.innerText = text;
            })
            paragraph.addEventListener('dblclick', function() {
                toDoContainer.removeChild(paragraph)
                localStorage.clear()
                let text = "Task Cleared"
                error_message.innerText = text;
            })
        }
    }
    sortTask() {
        let toDoContainer = document.querySelector('#toDoContainer')
        let toDoOrderedList = document.querySelector('#toDoOrderedList')

        toDoContainer.style.display = 'flex'
        toDoOrderedList.style.display = 'block'
        let myData = JSON.parse(localStorage.getItem('data'))
        sortedData = myData.sort(function(a, b) {
            return a.localeCompare(b); //using String.prototype.localCompare()
        });

        const myList = new Vue({
            el: '#toDoSortedContainer',
            data: {
                items: sortedData
            }
        })

        console.log(myData)
        console.log(sortedData)
    }

    set newTask(value) {
        if (value != this.confirmedTask) {
            let text = "Tasks Did Not Tally"
            error_message.innerText = text;
            console.log(text)
            alert(text)
            throw new Error('Tasks Did Not Match')
        }
        if (value == '' && this.confirmedTask == '') {
            // localStorage.setItem('data', '[]')
            let text = "Please Fill In Thy Today's Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
            throw new Error("Please Fill In Thy Today's Task")
        }
        if (value == '' && this.confirmedTask != '') {
            // localStorage.setItem('data', '[]')
            let text = "Please Input New Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
            throw new Error("Please Input New Task")
        }
        if (value != '' && this.confirmedTask == '') {
            // localStorage.setItem('data', '[]')
            let text = "Please Confirm New Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
            throw new Error("Please Confirm New Task")
        }
        if (value == this.confirmedTask && value != '' && this.confirmedTask != '') {
            alert('Task Added')

            // get old data and slap it to the new data
            var old_data = JSON.parse(localStorage.getItem('data'))
            old_data.push(this.confirmedTask)

            // clear inputs
            firstInputField.value = ""
            secondInputField.value = null

            // save the old + new data to local storage
            localStorage.setItem('data', JSON.stringify(old_data))
            let myData = JSON.parse(localStorage.getItem('data'))
            console.log(myData)
            this._newTask = value
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
        }
        if (value != this.newTask) {
            let text = "Tasks Did Not Tally"
            error_message.innerText = text;
            console.log(text)
            alert(text)
            throw new Error('Tasks Did Not Match')
        }
        if (value == '' && this.newTask == '') {
            // localStorage.setItem('data', '[]')
            let text = "Please Fill In Thy Today's Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
            throw new Error(text)
        }
        if (value == '' && this.newTask != '') {
            // localStorage.setItem('data', '[]')
            let text = "Please Input New Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
            throw new Error(text)
        }
        if (value != '' && this.newTask == '') {
            // localStorage.setItem('data', '[]')
            let text = "Please Confirm New Task"
            error_message.innerText = text;
            console.log(text)
            alert(text);
            throw new Error(text)
        }
        if (value == this.newTask && value != '' && this.newTask != '') {
            alert('Task Added')

            // get old data and slap it to the new data
            var old_data = JSON.parse(localStorage.getItem('data'))
            old_data.push(this.confirmedTask)

            // clear inputs
            firstInputField.value = ""
            secondInputField.value = null

            // save the old + new data to local storage
            localStorage.setItem('data', JSON.stringify(old_data))
            let myData = JSON.parse(localStorage.getItem('data'))
            console.log(myData)
            this._confirmedTask = value
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

    const newUser = new Operator(v, w, x, y, z);

    newUser.firstName = v
    newUser.secondName = w
    newUser.exampleDataList = x
    newUser.newTask = y
    newUser.confirmedTask = z

    document.writeln("<p>Form Submitted On:</p>")
    document.writeln(new Date())
    alert("Form Submitted Successfully!");
}

{
    const myUser = new Operator()

    function saveTask() {

        let saveToDoButton = document.querySelector('#saveToDo')
        let u = document.querySelector("#error_message");

        u.style.padding = "20px";
        u.style.display = "block";

        saveToDoButton.addEventListener('click', myUser.saveTask())

        // myUser.saveTask()

    }

    function viewTask() {
        let u = document.querySelector("#error_message");

        u.style.padding = "20px";
        u.style.display = "block";

        // let viewToDoButton = document.querySelector('#viewToDo')

        // viewToDoButton.addEventListener('click', myUser.saveTask())

        myUser.viewTask()

    }

    function sortTask() {
        let u = document.querySelector("#error_message");

        u.style.padding = "20px";
        u.style.display = "block";

        let sortToDoButton = document.querySelector('#sortToDo')

        sortToDoButton.addEventListener('click', myUser.sortTask())

        // myUser.sortTask()

    }
}
``