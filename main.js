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

function createLi(item, id) {
    const li = document.createElement("li");
    li.classList.add("todo-list-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        nonCompletedTodoItems.forEach((item) => {
            if (item.itemId === id) {
                nonCompletedTodoItems.splice(
                    nonCompletedTodoItems.indexOf(item),
                    1
                );
                localStorage.setItem(
                    "todos",
                    JSON.stringify(nonCompletedTodoItems)
                );
            }
        });
    });

    checkbox.addEventListener("click", () => {
        createCompletedLi(li.innerText);
        finishedTodoItems.push(li.innerText);
        let completedJsoned = JSON.stringify(finishedTodoItems);
        localStorage.setItem("completed", completedJsoned);
        li.remove();
        nonCompletedTodoItems.forEach((item) => {
            if (item.itemId === id) {
                nonCompletedTodoItems.splice(
                    nonCompletedTodoItems.indexOf(item),
                    1
                );
                localStorage.setItem(
                    "todos",
                    JSON.stringify(nonCompletedTodoItems)
                );
            }
        });
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
    localStorage.setItem("idCounter", itemId);
    nonCompletedTodoItems.push(item);

    createLi(item.title, item.itemId);
    todoInput.value = "";
    localStorage.setItem("todos", JSON.stringify(nonCompletedTodoItems));
}

submitBtn.addEventListener("click", addNewTodoItem);

todoInput.addEventListener("keydown", (keypress) => {
    if (keypress.key === "Enter") {
        keypress.preventDefault();
        submitBtn.click();
    }
});

function fetchListFromLocal() {
    if (localStorage.getItem("todos") !== null) {
        JSON.parse(localStorage.getItem("todos")).forEach((item) => {
            createLi(item.title, item.itemId);
        });

        nonCompletedTodoItems = JSON.parse(localStorage.getItem("todos"));
    }

    if (localStorage.getItem("completed") !== null) {
        JSON.parse(localStorage.getItem("completed")).forEach((item) => {
            createCompletedLi(item);
        });

        finishedTodoItems = JSON.parse(localStorage.getItem("completed"));
    }

    if (localStorage.getItem("idCounter") !== null) {
        itemId = localStorage.getItem("idCounter");
    }
}

fetchListFromLocal();
