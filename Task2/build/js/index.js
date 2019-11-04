let clear = document.querySelector('.todo-clear'),
  dateElement = document.getElementById('date'),
  list = document.getElementById('list'),
  input = document.getElementById('input'),
  toDoAddBtn = document.querySelector('#toDoAddBtn'),
  myChecked = 'fa-check-circle-o',
  myUnChecked = 'fa-circle-o',
  lineThrough = 'line-through',
  infoItem,
  myId,
  myOptions = {weekday : 'long', month : 'short', day : 'numeric'},
  today = new Date();

// clear
clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});

// date
dateElement.innerHTML = today.toLocaleDateString('en-US', myOptions);

// add to-do
function addToDo(toDo, id, done, trash) {
  let position = 'beforeend',
    myDone, myLine;

  if(trash) {
    return;
  }

  if(done) {
    myDone = myChecked;
    myLine = lineThrough;
  } else {
    myDone = myUnChecked;
    myLine = '';
  }

  let todoItem = `<li class="todo_list-item">
  <i class="todo_list-item-icon1 fa ${myDone}" job="complete" id="${id}"></i>
  <p class="todo_list-item-text ${myLine}">${toDo}</p>
  <i class="material-icons todo_list-item-icon2" job="remove" id="${id}">delete</i>
  </li>`;

  list.insertAdjacentHTML(position, todoItem);
}

//add to-do when i press ENTER
document.addEventListener('keyup', function (event) {
  if(event.keyCode === 13) {
    let toDo = input.value;
    if(toDo) {
      addToDo(toDo, myId, false, false);

      infoItem.push({
        value : toDo,
        id : myId,
        done : false,
        trash : false
      });
      localStorage.setItem('ToDo', JSON.stringify(infoItem));

      myId++;
    }
    input.value = '';
  }
});

//add to-do when i click
toDoAddBtn.addEventListener('click', function () {
  let toDo = input.value;
  if(toDo) {
    addToDo(toDo, myId, false, false);

    infoItem.push({
      value : toDo,
      id : myId,
      done : false,
      trash : false
    });
    localStorage.setItem('ToDo', JSON.stringify(infoItem));

    myId++;
  }
  input.value = '';
});

//complete to-do item function
function completeToDo(element) {
  element.classList.toggle(myChecked);
  element.classList.toggle(myUnChecked);
  element.parentNode.querySelector('.todo_list-item-text').classList.toggle(lineThrough);

  if(infoItem[element.id].done) {
    infoItem[element.id].done = false;
  } else {
    infoItem[element.id].done = true;
  }
}

//remove to-do item function
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  infoItem[element.id].trash = true;
}

//remove and complete to-do item on click buttons
list.addEventListener('click', function (event){
  let element = event.target;
  let elementJob = element.attributes.job.value;

  if(elementJob === 'complete') {
    completeToDo(element);
  } else if(elementJob === 'remove') {
    removeToDo(element);
  }
  localStorage.setItem('ToDo', JSON.stringify(infoItem));
});

//get To-Do from localStorage
let myData = localStorage.getItem('ToDo');

if(myData) {
  infoItem = JSON.parse(myData);
  myId = infoItem.length;
  loadList(infoItem);
} else {
  infoItem = [];
  myId = 0;
}

function loadList(arr) {
  arr.forEach(function (item) {
    addToDo(item.value, item.id, item.done, item.trash)
  });
}