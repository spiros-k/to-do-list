
class Model {
    constructor() {

        // things already have in my list
        this.toDoItmes = [
            {id: 1, text: "Wash the dishes", completed: false},
        ]
    }

    addToDoItems(todoText) {
        if(this.toDoItmes != []){
            const item = {
                id: this.toDoItmes[this.toDoItmes.length].id + 1, 
                text: todoText, 
                completed: false
            }
            this.toDoItmes.push(item)
        } else {
            const item = {
                id: 1,
                text: todoText,
                completed: false
            }
            this.toDoItmes.push(item)
        }
    }

    editToDoItems(id, textNew) {
        this.toDoItmes.forEach((item) => {
            if(this.toDoItmes.id === id) {
                item = {
                    id: this.toDoItmes.id,
                    text: textNew,
                    completed: false
                }
                this.toDoItmes.push(item)
            }
        })
    }

    deleteToDoItems(id) {
        this.toDoItmes.filter((item) => {
            item.id !== id
        })
    }
}

class View {
    constructor() {

    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View())