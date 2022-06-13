 //selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded' ,getTodos)
todoButton.addEventListener('click' ,addTodo);
todoList.addEventListener('click' , deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //tododiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value); 

    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML= '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const tarshButton = document.createElement("button");
    tarshButton.innerHTML= '<i class="fa-solid fa-trash"></i>'
    tarshButton.classList.add("tarsh-btn");
    todoDiv.appendChild(tarshButton);

     //append to todo-list(ul)
     todoList.appendChild(todoDiv);

    //clear input value
    todoInput.value= "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if(item.classList[0] === "tarsh-btn") {
        const todo = item.parentElement;
        //animation
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        todo.classList.add('fall');
        removeLocalTodos(todo);
    }
    //checkmark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
            todo.style.display = "flex"; 
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            break; 
        }
    });
}

function saveLocalTodos(todo) {
    //check local storage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
} 

function getTodos() {
     //check local storage
     let todos;
     if(localStorage.getItem("todos") === null){
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     todos.forEach(function(todo){
          //tododiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML= '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const tarshButton = document.createElement("button");
    tarshButton.innerHTML= '<i class="fa-solid fa-trash"></i>'
    tarshButton.classList.add("tarsh-btn");
    todoDiv.appendChild(tarshButton);

     //append to todo-list(ul)
     todoList.appendChild(todoDiv);

     })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todo.indexOf(todoIndex) ,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// //simplified removing element of an array
// const todos = ["hello" , "hey" , "john" ,"jack"];

// const johnIndex = todos.indexOf("john");

// todos.splice(johnIndex, 1);

// console.log(todos);