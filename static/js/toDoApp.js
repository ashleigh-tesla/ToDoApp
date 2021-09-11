let addToDoButton = document.querySelector('#addToDo')
let toDoContainer = document.querySelector('#toDoContainer')
let firstInputField = document.querySelector('#firstInputField')
let secondInputField = document.querySelector('#secondInputField')

addToDoButton.addEventListener('click', function() {
    var paragraph = document.createElement('p')
    paragraph.classList.add('paragraph-styling')
    paragraph.innerText = secondInputField.value
    toDoContainer.appendChild(paragraph)
    firstInputField.value = ""
    secondInputField.value = ''
    paragraph.addEventListener('click', function() {
        paragraph.style.textDecoration = "line-through"
    })
    paragraph.addEventListener('dblclick', function() {
        toDoContainer.removeChild(paragraph)
    })
})


function validate() {
    let firstName = document.querySelector("#firstName").value;
    let secondName = document.querySelector("#secondName").value;
    let exampleDataList = document.querySelector("#exampleDataList").value;
    let newTask = document.querySelector("#firstInputField").value;
    let confirmedTask = document.querySelector("#secondInputField").value;
    let error_message = document.querySelector("#error_message");

    error_message.style.padding = "20px";
    error_message.style.display = "block";

    var text;
    if (firstName.length < 1) {
        text = "Please Enter Valid First Name";
        error_message.innerText = text;
        return false;
    }
    if (secondName.length <= 2) {
        text = "Please Enter valid Last Name";
        error_message.innerText = text;
        return false;
    }
    if (exampleDataList == '') {
        text = "Please Enter Correct Subject";
        error_message.innerText = text;
        return false;
    }
    if (newTask == '') {
        text = "Please Enter New Task";
        error_message.innerText = text;
        return false;
    }
    if (confirmedTask == '') {
        text = "Please Confirm Task";
        error_message.innerText = text;
        return false;
    }
    document.writeln(Date())
    alert("Form Submitted Successfully!");
    return true;
}