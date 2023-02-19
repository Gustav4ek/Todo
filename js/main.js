
const form = document.querySelector('#form')
const InputTask = document.querySelector("#taskInput")
const ButtonAdd = document.querySelector("#btnsub")
const tasksList = document.querySelector("#tasksList")
const emptyList = document.querySelector("#emptyList")
let tasks = [];
let x = 0;

if (localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => renderTask(task));
};


checkEmptyList ();

form.addEventListener("submit", AddTask);

tasksList.addEventListener("click", RemoveTask);

tasksList.addEventListener("click", DoneTask);


function AddTask (event) {
    event.preventDefault();
    InputTaskValue = InputTask.value;
    
    const newTask = {
      id: Date.now(),
      text : InputTaskValue,
      done: false
    }

    tasks.push(newTask)
    savetoLocalStorage ()
    
    renderTask(newTask)

  InputTask.value = "";
  InputTask.focus();

  checkEmptyList ()


};

function RemoveTask(event){
    if (event.target.dataset.action === "delete") {
        const parentNode = event.target.closest(".list-group-item");
        const parentNodeId = parentNode.id

        const index = tasks.findIndex((task) =>task.id == parentNodeId)
        tasks.splice(index,1)
        savetoLocalStorage ()
        parentNode.remove();

    }

    checkEmptyList ()
    savetoLocalStorage ()
};

function DoneTask(event){
    if (event.target.dataset.action === "done"){
    const parentNode = event.target.closest(".list-group-item");
    const id = parentNode.id;
    const task = tasks.find((task) => task.id == id)
    task.done = !task.done
    savetoLocalStorage ()
    const DoneTask = parentNode.querySelector(".task-title")
    DoneTask.classList.toggle("task-title--done")
    }
};

function checkEmptyList () {
  if(x==0){
  if (tasks.length == 0) {
    const emptyListHTML = ` 
    <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`
      tasksList.insertAdjacentHTML("afterbegin", emptyListHTML)
    if(emptyListHTML)
    x = 1
  }
}

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList")
      emptyListEl ? emptyListEl.remove() : null;
      x = 0;
  }

};

function savetoLocalStorage () {
  localStorage.setItem("tasks", JSON.stringify(tasks))
};

function renderTask (task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const TaskHTML = `
    <li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>

  `
  tasksList.insertAdjacentHTML("beforeend", TaskHTML)
};
