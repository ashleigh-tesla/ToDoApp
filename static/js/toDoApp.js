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
let addToDoButton = document.querySelector('#addToDo')
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
    secondData = firstData.toString()
    secondData = JSON.stringify(secondData)
    localStorage.setItem("firstJSON", firstData)
    localStorage.setItem("secondJSON", firstData)

    // retrieving data
    let firstTask = localStorage.getItem("firstJSON");
    let secondTask = localStorage.getItem("secondJSON");

    // converting from JSON to non-JSON 
    let first = JSON.parse(firstTask)
    let second = JSON.parse(secondTask)

    // if there is nothing saved at the start then save an empty array
    if (localStorage.getItem('data') == null && first == null && second == null) {
        localStorage.setItem('data', '[]')
    }
    // get old data and slap it to the new data
    var old_data = JSON.parse(localStorage.getItem('data'))
    old_data.push(secondData)

    // save the old + new data to local storage
    localStorage.setItem('data', JSON.stringify(old_data))
})

viewToDoButton.addEventListener('click', function() {

    // get data from input box
    var firstData = firstInputField.value
    var secondData = secondInputField.value

    // if there is indeed data then continue
    if (localStorage.getItem('data') != null && firstData == secondData && firstData != '' && secondData != '') {
        document.querySelector('#toDoContainer').innerHTML = JSON.parse(localStorage.getItem('data'))
        toDoContainer.appendChild(paragraph)
        firstInputField.value = ""
        secondInputField.value = ''
    }
    let text = "Task Added Successfully!"
    console.log(text)
    alert(text);
})
addToDoButton.addEventListener('click', function() {
    if (firstInputField.value == secondInputField.value && firstInputField.value != '' && secondInputField.value != '') {
        {
            var paragraph = document.createElement('p')
            paragraph.classList.add('paragraph-styling')

            var new_data = ' ' + secondInputField.value

            // if there is nothing saved at the start then save an empty array
            if (localStorage.getItem('data') == null) {
                {
                    localStorage.setItem('data', '[]')
                }
                // get old data and slap it to the new data
                var old_data = JSON.parse(localStorage.getItem('data'))
                old_data.push(new_data)

                // save the old + new data to local storage
                localStorage.setItem('data', JSON.stringify(old_data))
            }

            if (localStorage.getItem('data') != null) {
                paragraph.innerText = JSON.parse(localStorage.getItem('data'))
                toDoContainer.appendChild(paragraph)
                firstInputField.value = ""
                secondInputField.value = ''

                var list, i, switching, listItems, shouldSwitch
                list = JSON.parse(localStorage.getItem('data'))

                switching = true

                while (switching) {
                    switching = false
                    listItems = list.getElementsByTagName("p")

                    for (i = 0; i < (listItems.length - 1); i++) {
                        shouldSwitch = false
                        if (listItems[i].innerHTML.toLowerCase() > listItems[i + 1].innerHTML.toLowerCase()) {
                            shouldSwitch = true
                            break
                        }
                    }
                    listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i])
                    switching = true
                }

                let text = "Task Added Successfully!"
                console.log(text)
                alert(text);
            }

            // // storing data
            // let firstInput = (firstInputField.value).toString()
            // firstInput = JSON.stringify(firstInput);
            // localStorage.setItem("testJSON", firstInput)

            // //Retrieving data
            // let first = localStorage.getItem("testJSON");
            // let myFirst = JSON.parse(first);

            // // storing data
            // let secondInput = (secondInputField.value).toString()
            // secondInput = JSON.stringify(secondInput);
            // localStorage.setItem("taskList", secondInput)

            // //Retrieving data
            // let second = localStorage.getItem("taskList");
            // let mySecond = JSON.parse(second);
        }
        paragraph.addEventListener('click', function() {
            paragraph.style.textDecoration = "line-through"
        })
        paragraph.addEventListener('dblclick', function() {
            toDoContainer.removeChild(paragraph)
        })
    } else if (firstInputField.value == '' && secondInputField.value == '') {
        let text = "Please Fill In Thy Today's Task"
        console.log(text)
        alert(text);
    } else if (firstInputField.value == '' && secondInputField.value != '') {
        let text = "Please Input New Task"
        console.log(text)
        alert(text);
    } else if (firstInputField.value != '' && secondInputField.value == '') {
        let text = "Please Confirm New Task"
        console.log(text)
        alert(text);
    } else if (firstInputField.value != secondInputField.value) {
        let text = "Tasks Did Not Match"
        console.log(text)
        alert("Tasks Did Not Match");
    }
})