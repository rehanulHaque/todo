const radio = document.querySelector(".radio");
const form = document.getElementById("addForm");
const deleteAll = document.getElementById("clearAll");
const deleteBtn = document.querySelector(".deleteBtn");
const ul = document.querySelector("ul");

let todo = localStorage.getItem("todo");
if (todo == null) {
  todoObj = [];
} else {
  todoObj = JSON.parse(localStorage.getItem("todo"));
}

function checkCompleted(id) {
  let text = document.querySelectorAll(".text");
  text.forEach((text) => {
    let t = text.querySelector("input");
    if (t.checked) {
      t.parentElement.classList.add("add");
    } else {
      t.parentElement.classList.remove("add");
    }
  });
}

function updateCheck(index, id) {
  console.log(id)
  todoObj.forEach((e) => {
    if (index == e.text) {
      e.completed = id;
      localStorage.setItem("todo", JSON.stringify(todoObj));
      checkCompleted(id)
      // updateDom()
    }
  });
}



form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.ele.value;
  if(text.length > 2){
    todoObj.push({
      text: text,
      completed: false,
    });
  }else{
    alert("Please Add Todo")
  }
  localStorage.setItem("todo", JSON.stringify(todoObj));
  updateDom(todoObj);
  e.target.elements.ele.value = "";
});

function deleteItem(id) {
  let todo = localStorage.getItem("todo");
  if (todo == null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(localStorage.getItem("todo"));
  }
  todoObj.splice(id, 1);
  localStorage.setItem("todo", JSON.stringify(todoObj));
  updateDom();
}

function updateDom() {
  ul.innerHTML = "";
  todoObj.forEach((e, i) => {
    let str = `<li data-id="${i}"><label class="text" data-index="${e.text}" style="${e.completed ? "text-decoration: line-through;" : "text-decoration: none;"}">${e.text}<input type="checkbox" hidden class="radio" onclick="checkCompleted(this.checked), updateCheck(this.parentElement.dataset.index, this.checked)"></label><button class="delete" onclick="deleteItem(this.parentElement.dataset.id)">X</button></li>`;
    ul.innerHTML += str;
  });
}
updateDom();

deleteAll.addEventListener('click', () => {
  let todo = localStorage.getItem("todo");
  if (todo == null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(localStorage.getItem("todo"));
  }
  todoObj = []
  localStorage.setItem("todo", JSON.stringify(todoObj));
  updateDom()
});