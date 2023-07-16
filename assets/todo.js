let addBtn = document.getElementById("addBtn");
let toDos = [];
let doneList = [];
addBtn.addEventListener("click", () => {
  let inputVal = document.getElementById("todo").value;
  if (inputVal == "") {
    alert("You have to write some ToDos :)");
  } else {
    let todo = {
      Id: Math.floor(Math.random() * 100),
      data: inputVal,
    };
    toDos.push(todo);
    CreateToDoList(toDos);
    document.getElementById("todo").value = ""
  }
});

function CreateToDoList(toDos) {
    document.getElementById("todoList").innerHTML = "";
  toDos.map((toDo) => {
    var list = "";
    list = `
        <li class="todo-card">
            <p>${toDo.data}</p>
            <button title="Make it Done" onclick="DoneTask(${toDo.Id})" onclick class="btn">
                <i class="fa-regular fa-circle-check"></i>
            </button>
            <button title="Delete Task" onclick="DelTask(${toDo.Id})" class="btn">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </li>
        `;
    document.getElementById("todoList").innerHTML += list;
  });
}

function DelTask(id){
    let newToDoList = toDos.filter(x => x.Id !== id)
    toDos = newToDoList;
    CreateToDoList(toDos);
}

function DoneTask(id){
let doneTask = toDos.filter(x => x.Id == id)
DelTask(doneTask[0].Id)
doneList.push(...doneTask)
CreateDoneList(doneList)
if(doneList.length != 0){
    document.getElementById("doneHeader").style.display = "block"
}
}

function CreateDoneList(doneList){
    document.getElementById("doneList").innerHTML = "";

    doneList.map((done) => {
        var list = "";
        list = `
            <li class="done-card">
                <p>${done.data}</p>
                <button title="Remove from Done List" onclick="RemoveDoneTask(${done.Id})" onclick class="btn">
                <i class="fa-regular fa-circle-xmark"></i>
                </button>
                <button title="Delete Task"  onclick="DelDoneTask(${done.Id})" class="btn">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </li>
            `;
        document.getElementById("doneList").innerHTML += list;
});
}

function RemoveDoneTask(id){
    let removedTask = doneList.filter(x => x.Id == id)
    toDos.push(...removedTask)
    DelDoneTask(removedTask[0].Id)
    CreateToDoList(toDos)
    if(doneList.length == 0){
        document.getElementById("doneHeader").style.display = "none"
    }
}

function DelDoneTask(id){
    let newDoneList = doneList.filter(x => x.Id !== id)
    let hideBtn = document.getElementById("hideBtn");
    doneList = newDoneList;
    CreateDoneList(doneList);
    if(doneList.length == 0){
        document.getElementById("doneHeader").style.display = "none"
    }
}

document.getElementById("hideBtn").addEventListener("click", () => {
    let doneTaskDiv = document.getElementById("doneTaskContainer");
    let hideBtn = document.getElementById("hideBtn");
    let eyeIcon = hideBtn.querySelector("i");

    if (doneTaskDiv.style.visibility === "hidden") {
        doneTaskDiv.style.visibility = "visible";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        doneTaskDiv.style.visibility = "hidden";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
});

