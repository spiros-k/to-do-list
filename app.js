
class Model {
    constructor() {
        // things already have in my list
        this.toDoItems = [
            {id: 1, text: "Wash the dishes", completed: false},
            {id: 2, text: "Walk the dog", completed: false},
        ]
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
    }

    deleteToDoItems(id) {
        this.toDoItems.filter((item) => {
            item.id !== id
        })
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

    get todoText() {
        return this.input.value
    }

    resetInput() {
        this.input.value = ""
    }

    displayToDoItems() {
        if(this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }

        if(this.todoList.length == 0) {
            const emptyElement = document.createElement("p")
            const emptyMessage = document.createTextNode("No things to do. Add some items?")
            emptyElement.appendChild(emptyMessage)
            this.todoList.appendChild(emptyElement)
        } else {
            app.model.toDoItems.map((item) => {
                const listItem = document.createElement("li")

                const checkBox = document.createElement("input")
                checkBox.type = "checkbox"
                checkBox.checked = item.completed

                const span = document.createElement("span")
                span.contentEditable = true
                if(item.completed) {
                    const strike = document.createElement("s")
                    strike.textContent = item.text
                    span.appendChild(strike)
                } else {
                    span.textContent = item.text
                }

                const deleteButton = document.createElement("button")
                deleteButton.type = "button"
                deleteButton.textContent = "Delete"

                listItem.append(checkBox, span, deleteButton)

                this.todoList.appendChild(listItem)
            })
        }
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        if(model.toDoItems != []) {
            view.displayToDoItems
        }
    }

    checkToDoItems(text) {
        app.model.toDoItems.map((item) => {
            if(item.text != text) {
                app.view.displayToDoItems
            }
        })
    }

    handleAddToDoItems = (toDoText) => {
        this.model.addToDoItems(toDoText)
    }
}

const app = new Controller(new Model(), new View())
app.model.addToDoItems("Read one chapter")
console.log(app)
app.view.displayToDoItems()
app.checkToDoItems()
