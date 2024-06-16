
class Model {
    constructor() {
        // things already have in my list
        this.toDoItems = [
            {id: 1, text: "Wash the dishes", completed: false},
            {id: 2, text: "Wash the dog", completed: false},
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
        let headerContent = document.createTextNode("Things To-Do")
        
        titleHeader.appendChild(headerContent)

        this.div = document.createElement("div")
        this.form = document.createElement("div")

        this.input = document.createElement("input")
        this.input.type = "text"
        this.input.placeholder = "Add an item"
        this.input.name = "todo-item"

        this.submit = document.createElement("button")

        const submitText = document.createTextNode("Submit")
        this.submit.appendChild(submitText)

        this.form.classList.add("flex-gap")
        this.form.append(this.input, this.submit)
        this.div.classList.add("flex")
        this.div.append(titleHeader, this.form)

        const currentRoot = document.getElementById("root")
        currentRoot.appendChild(this.div)
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View())
app.model.addToDoItems("Read one chapter")
console.log(app)