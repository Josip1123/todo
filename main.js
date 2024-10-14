let itemId = 1;
let nonCompletedTodoItems = [];
let finishedTodoItems = [];
const submitBtn = document.querySelector(".submit-todo");
const todoInput = document.querySelector(".todo-input");
const todoUl = document.querySelector(".todo-list");
const completedUl = document.querySelector(".completed-list");

class TodoItem {
    constructor(itemId, title, completed) {
        this.itemId = itemId;
        this.title = title;
        this.completed = completed;
    }
}

function createLi(item) {
    const li = document.createElement("li");
    li.classList.add("todo-list-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });
    checkbox.addEventListener("click", () => {
        createCompletedLi(li.innerText);
        finishedTodoItems.push(li.innerText);
        li.remove();
    });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(item));
    li.appendChild(deleteBtn);
    todoUl.appendChild(li);
}

function createCompletedLi(text) {
    const li = document.createElement("li");
    li.classList.add("completed-list-item");
    li.appendChild(document.createTextNode(text));
    completedUl.appendChild(li);
}

function addNewTodoItem() {
    if (todoInput.value === "") {
        return;
    }
    const item = new TodoItem(itemId, todoInput.value, false);
    itemId++;
    nonCompletedTodoItems.push(item);
    // console.log(nonCompletedTodoItems);
    createLi(item.title);
    todoInput.value = "";
}

submitBtn.addEventListener("click", addNewTodoItem);

todoInput.addEventListener("keydown", (keypress) => {
    if (keypress.key === "Enter") {
        keypress.preventDefault();
        submitBtn.click();
    }
});

// submitBtn.addEventListener("click", ()=>{
//     nonCompletedTodoItems.forEach((item) => {
//     });
// })
