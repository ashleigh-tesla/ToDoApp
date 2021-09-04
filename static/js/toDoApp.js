let addToDoButton = document.querySelector('#addToDo')
let toDoContainer = document.querySelector('#toDoContainer')
let myFirstInputField = document.querySelector('#firstInputField')
let mySecondInputField = document.querySelector('#secondInputField')

addToDoButton.addEventListener('click', function() {
    var paragraph = document.createElement('p')
    paragraph.classList.add('paragraph-styling')
    paragraph.innerText = mySecondInputField.value
    toDoContainer.appendChild(paragraph)
    mySecondInputField.value = ""
    paragraph.addEventListener('click', function() {
        paragraph.style.textDecoration = "line-through"
    })
    paragraph.addEventListener('dblclick', function() {
        toDoContainer.removeChild(paragraph)
    })
})

console.log(addToDoButton)
console.log(toDoContainer)
console.log(myFirstInputField.value)
console.log(mySecondInputField.value)