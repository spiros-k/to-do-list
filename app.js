
class Model {
    constructor() {
        // things already have in my list
        this.toDoItems = [
            {id: 1, text: "Wash the dishes", completed: false},
            {id: 2, text: "Walk the dog", completed: false},
        ]

    }

    toDoListChanged(change) {
        this.checkToDoList = change
    }

    addToDoItems(todoText) {
        if(this.toDoItems != []){
            const item = {
                id: this.toDoItems[this.toDoItems.length - 1].id + 1, 
                text: todoText, 
                completed: false
            }
            this.toDoItems.push(item)
        } else {
            const item = {
                id: 1,
                text: todoText,
                completed: false
            }
            this.toDoItems.push(item)
        }
        this.checkToDoList(this.toDoItems)
    }

    editToDoItems(id, textNew) {
        this.toDoItems.forEach((item) => {
            if(this.toDoItems.id === id) {
                item = {
                    id: this.toDoItems.id,
                    text: textNew,
                    completed: false
                }
                this.toDoItems.push(item)
            }
        })
        this.checkToDoList(this.toDoItems)
    }

    deleteToDoItems(id) {
        this.toDoItems.filter((item) => {
            item.id !== id
        })
        this.checkToDoList(this.toDoItems)
    }

    toggleToDoItems(id) {
        this.toDoItems.map((item) => {
            if(item.id === id){
                item = {
                    id: item.id,
                    text: item.text,
                    completed: !item.completed
                }
                this.toDoItems.push(item)
            }
        })
        this.checkToDoList(this.toDoItems)
    }
}

class View {
    constructor() {

        const titleHeader = document.createElement("h1")
        const headerContent = document.createTextNode("Things To-Do")
        
        titleHeader.appendChild(headerContent)

        this.form = document.createElement("form")

        this.input = document.createElement("input")
        this.input.type = "text"
        this.input.placeholder = "Add an item"
        this.input.name = "todo-item"

        this.submit = document.createElement("button")
        this.submit.textContent = "Submit"

        this.todoList = document.createElement("ul", "todo-list")

        this.form.classList.add("flex-gap")
        this.form.append(this.input, this.submit)

        const currentRoot = document.getElementById("root")
        currentRoot.append(titleHeader, this.form, this.todoList)
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if(className) {
            element.classList.add(className)
        }
        return element;    
    }

    todoText() {
        return this.input.value
    }

    resetInput() {
        this.input.value = ""
    }

    displayToDoItems(toDos) {
        while(this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }
        console.log(this.todoList)
        if(this.todoList.length == 0) {
            const emptyElement = this.createElement("p")
            const emptyMessage = document.createTextNode("No things to do. Add some items?")
            emptyElement.appendChild(emptyMessage)
            this.todoList.appendChild(emptyElement)
        } else {
            toDos.forEach((item) => {
                const listItem = this.createElement("li")

                const checkBox = this.createElement("input")
                checkBox.type = "checkbox"
                checkBox.checked = item.completed

                const span = this.createElement("span")
                span.textContent = item.text
                // const span = this.createElement()
                // span.contentEditable = true
                // const strike = document.createElement("s")
                // strike.textContent = item.text
                // span.appendChild(strike)
                
                const deleteButton = document.createElement("button")
                deleteButton.type = "button"
                deleteButton.textContent = "Delete"
                deleteButton.name = "Delete"

                listItem.append(checkBox, span, deleteButton)

                this.todoList.appendChild(listItem)
            })
        }
    }

    addListeners() {
        this.form.addEventListener("submit", e => {
            e.preventDefault()

            if(this.todoText){
                this.todoText
            }
            this.resetInput()
        })
    }

    deleteListeners() {
        this.todoList.addEventListener("click", (e) => {
            if(e.target.name === "Delete"){
                this.todoList.removeChild(this.todoList.firstChild)
            }
        })
    }

    changeListeners() {
        this.todoList.addEventListener("change", (e) => {
            if(e.target.type === "checkbox") {
                e.target.parentElement.classList.toggle("linethrough")
                console.log(e.target)
            // should not line through the button text, when checkbox is checked
            }
        })
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // if(model.toDoItems != []) {
        //     view.displayToDoItems
        // }
        this.checkToDoList(this.model.toDoItems)

        this.view.addListeners(this.handleAddToDoItems)
        this.view.deleteListeners(this.handleDeleteToDoItems)
        this.view.changeListeners(this.handleToggleToDoItems)
        
        this.model.toDoListChanged(this.checkToDoList)
    }

    checkToDoList = (text) => {
        
        this.view.displayToDoItems(text)
    }

    handleAddToDoItems = (toDoText) => {
        this.model.addToDoItems(toDoText)
    }

    handleEditToDoItems = (id, textNew) => {
        this.model.editToDoItems(id, textNew)
    }

    handleDeleteToDoItems = (id) => {
        this.model.deleteToDoItems(id)
    }

    handleToggleToDoItems = (id) => {
        this.model.toggleToDoItems(id)
    }

}

const app = new Controller(new Model(), new View())
//app.model.addToDoItems("Read one chapter")
//console.log(app)
// app.view.displayToDoItems()
// app.view.checkToDoItems()
// app.view.addListeners()
// console.log(app.view.addListeners)