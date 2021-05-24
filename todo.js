const $table = document.querySelector(".table");
const $removeButton = document.getElementsByClassName("remove");
dateStart.value = new Date().toISOString().substr(0, 10);

let tasks = [
  {
    id: 1,
    dateStart: new Date("2021-04-07"),
    dateEnd: new Date("2021-04-07"),
    category: "Работа",
    task: "Сделать 20 заказов",
    checked: true,
  },

  {
    id: 2,
    dateStart: new Date("2021-04-07"),
    dateEnd: new Date("2021-04-07"),
    category: "Дом",
    task: "Помыть посуду",
    checked: true,
  },
];

const ItemToDo = {
  id: 3,
  dateStart: new Date("2020-01-13"),
  dateEnd: "",
  category: "Работа",
  task: "Сделать 20 заказов",
  checked: false,
};

tasks.push(ItemToDo);

function removeTodo(id) {
  tasks = tasks.filter((item) => item.id !== +id);
}

function updateTodo(todo) {
  tasks = tasks.map(function (item) {
    if (item.id == todo.id) return todo;
    else return item;
  });
}

function createToDo(itemTodo) {
  const $task = document.createElement("tr");
  $task.classList.add("itemTodo");
  let checked = "";
  if (itemTodo.checked) {
    checked = "checked";
    $task.classList.add("cross-out");
  }
  $task.id = `${itemTodo.id}`;
  let dStart = "";
  if (itemTodo.dateStart) dStart = itemTodo.dateStart.toLocaleDateString();
  let dEnd = "";
  if (itemTodo.dateEnd) dEnd = itemTodo.dateEnd.toLocaleDateString();

  $task.innerHTML = `   
      <td>${dStart}</td>      
      <td class = 'dateEnd'>${dEnd}</td>
      <td>${itemTodo.category}</td>
      <td>${itemTodo.task}</td>
      <td><input type="checkbox" data-checkbox-button = '' ${checked} /></td>
      <td><input type="button" value="Редактировать" class="edit" data-edit-button="${itemTodo.id}" /></td>
      <td><input type="button" value="Удалить" class="remove" data-remove-button="${itemTodo.id}" /></td>
      `;
  return $task;
}
$table.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-remove-button")) {
    event.target.closest("tr").remove();
    removeTodo(event.target.getAttribute("data-remove-button"));
  }
  if (event.target.hasAttribute("data-edit-button")) {
    $modal.style.display = "block";
    createEdit(event.target.getAttribute("data-edit-button"));
  }
  if (event.target.hasAttribute("data-checkbox-button")) {
    const idChecked = event.target.closest("tr").getAttribute("id");
    const id = tasks.findIndex((item) => item.id === +idChecked);

    if (event.target.checked === true) {
      event.target.closest("tr").classList.toggle("cross-out");
      event.target
        .closest("tr")
        .querySelector(".dateEnd").innerText = new Date().toLocaleDateString();
      tasks[id].dateEnd = new Date();
      tasks[id].checked = true;
    } else {
      event.target.closest("tr").classList.toggle("cross-out");
      event.target.closest("tr").querySelector(".dateEnd").innerText = "";
      tasks[id].dateEnd = "";
      tasks[id].checked = false;
    }
  }
});

addButton.addEventListener("click", function () {
  let dStart = "";
  if (dateStart.value) dStart = new Date(dateStart.value);
  let dEnd = "";
  if (dateEnd.value) dEnd = new Date(dateEnd.value);

  const newItemTodo = {
    id: tasks.length + 1,
    dateStart: dStart,
    dateEnd: dEnd,
    category: category.value,
    task: task.value,
    checked: false,
  };
  tasks.push(newItemTodo);
  $table.appendChild(createToDo(tasks[tasks.length - 1]));
  dateStart.value = new Date().toISOString().substr(0, 10);
  dateEnd.value = "";
  category.value = "";
  task.value = "";
});

tasks.forEach((item) => {
  $table.appendChild(createToDo(item));
});

const initId = () => {
  let currentId = 1;

  return () => {
    currentId++;
    return currentId;
  };
};

const getId = initId();

console.log(getId());
console.log(getId());
console.log(getId());
console.log(getId());

const $modal = document.querySelector(".modal");
const $btnEdit = document.querySelector(".edit");

const $modalContent = document.querySelector(".modal-content-todo");
let idItemEdit;

function createEdit(idEdit) {
  const id = tasks.findIndex((item) => item.id === +idEdit);
  idItemEdit = idEdit;
  let checked = "";

  if (tasks[id].checked) {
    checked = "checked";
  }
  let dStart = "";
  if (tasks[id].dateStart)
    dStart = tasks[id].dateStart.toISOString().substr(0, 10);
  let dEnd = "";
  if (tasks[id].dateEnd) dEnd = tasks[id].dateEnd.toISOString().substr(0, 10);
  $modalContent.innerHTML = `   
        <td>
        <input type="date" name="calendar" class="dateStart" id="editDateStart"  value="${dStart}"  />
        </td>
        <td>
        <input type="date" name="calendar" class="dateEnd" id="editDateEnd"  value="${dEnd}"/>
        </td>
        <td><input type="text" class="category" id="editCategory" value="${tasks[id].category}"/></td>
        <td><input type="text" class="task" id="editTask" value="${tasks[id].task}"/></td>
      
      <td><input type="checkbox" ${checked}/></td>     
  `;
}

const $btnCloseModal = document.querySelector(".close");
$btnCloseModal.addEventListener("click", () => {
  $modal.style.display = "none";
});

const $btnSave = document.querySelector(".save");
$btnSave.addEventListener("click", (event) => {
  let dStartHtml = "";
  let dStart = "";
  if (editDateStart.value) {
    dStart = new Date(editDateStart.value);
    dStartHtml = dStart.toLocaleDateString();
  }
  let dEnd = "";
  let dEndHtml = "";

  if (editDateEnd.value) {
    dEnd = new Date(editDateEnd.value);
    dEndHtml = dEnd.toLocaleDateString();
  }
  const newItemTodo = {
    id: +idItemEdit,
    dateStart: dStart,
    dateEnd: dEnd,
    category: editCategory.value,
    task: editTask.value,
    checked:
      editTask.parentElement.nextElementSibling.firstElementChild.checked,
  };

  updateTodo(newItemTodo);
  const $itemTodoHtml = document.getElementById(idItemEdit);
  let checked = "";

  if (newItemTodo.checked) {
    checked = "checked";
    $itemTodoHtml.classList.add("cross-out");
  } else $itemTodoHtml.classList.remove("cross-out");
  $itemTodoHtml.innerHTML = `   
      <td>${dStartHtml}</td>      
      <td class = 'dateEnd'>${dEndHtml}</td>
      <td>${newItemTodo.category}</td>
      <td>${newItemTodo.task}</td>
      <td><input type="checkbox" data-checkbox-button = '' ${checked} /></td>
      <td><input type="button" value="Редактировать" class="edit" data-edit-button="${newItemTodo.id}" /></td>
      <td><input type="button" value="Удалить" class="remove" data-remove-button="${newItemTodo.id}" /></td>
      `;
});

window.onclick = (event) => {
  if (event.target == $modal) {
    $modal.style.display = "none";
  }
};
