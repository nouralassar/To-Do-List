let form = document.querySelector("form");
let inputText = document.querySelector(".input-text");
let taskList = document.querySelector(".task-list");
let totalTasksP = document.querySelector("#all-tasks-p");
let completedTasksP = document.querySelector("#completed-tasks-p");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function updateCounters(){
    let allTasks = taskList.querySelectorAll(".task-item");
    let completedTasks = taskList.querySelectorAll(".task-item.hover");
    totalTasksP.textContent = allTasks.length;
    completedTasksP.textContent = completedTasks.length;
}
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function createTask(task){
    let liItem = document.createElement("li");
    liItem.classList.add ("task-item");
    liItem.innerHTML = `
    <span class="span-item">${task.text}</span>
    <button class="delete-btn">Delete</button>`;
    taskList.appendChild(liItem);   
    inputText.value = "";
    if(task.completed){
        liItem.classList.add("hover");
    }
    liItem.addEventListener("click", ()=>{
        liItem.classList.toggle("hover");
        tasks.forEach((task)=>{
        if(task.text === liItem.querySelector(".span-item").textContent){
        task.completed = liItem.classList.contains("hover");
        }});
        updateCounters();
        saveTasks();
    });
    updateCounters();
    let deleteBtn = liItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        tasks = tasks.filter((task)=>{
        return task.text !== liItem.querySelector(".span-item").textContent;
        });
        liItem.remove();
        updateCounters();
        saveTasks();
    });
}
function funall(e){
    e.preventDefault();
    if(inputText.value === ""){
        return;
    }
    let newTask = {
        text: inputText.value,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    createTask(newTask);
}
form.addEventListener("submit",funall);
tasks.forEach((task)=>{
    createTask(task);
});
function updateClock() {
    const now = new Date();
    const dateEl = document.querySelector('.date-display');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}
updateClock();
setInterval(updateClock, 1000);