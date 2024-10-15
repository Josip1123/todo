let itemId = localStorage.getItem("idCounter");
let nonCompletedTodoItems = JSON.parse(localStorage.getItem("todos"));
let finishedTodoItems = JSON.parse(localStorage.getItem("completed"));
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
                console.log(nonCompletedTodoItems.indexOf(item));
                nonCompletedTodoItems.splice(
                    nonCompletedTodoItems.indexOf(item),
                    1
                );
                console.log(nonCompletedTodoItems);
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
                console.log(nonCompletedTodoItems.indexOf(item));
                nonCompletedTodoItems.splice(
                    nonCompletedTodoItems.indexOf(item),
                    1
                );
                console.log(nonCompletedTodoItems);
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

submitBtn.addEventListener("click", addNewTodoItem);

todoInput.addEventListener("keydown", (keypress) => {
    if (keypress.key === "Enter") {
        keypress.preventDefault();
        submitBtn.click();
    }
});

function fetchListFromLocal() {
    const localParsed = JSON.parse(localStorage.getItem("todos"));

    localParsed.forEach((item) => {
        createLi(item.title, item.itemId);
    });

    const compleatedParsed = JSON.parse(localStorage.getItem("completed"));

    compleatedParsed.forEach((item) => {
        createCompletedLi(item);
    });
}

fetchListFromLocal();
console.log(nonCompletedTodoItems);
