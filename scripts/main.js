const todoList = JSON.parse(localStorage.getItem('todolist')) || [];

renderTodoList();

function selectElement(selector){
  const elemet = document.querySelector(selector);
  if (selector){
    return elemet;
  }else{
    throw new Error (`Something went wrong! Make sure that ${selector} exists or typed correctly.`);
  } 
};

function renderTodoList(){
  let listItemDisplay = '';
  todoList.forEach((todoObject, id)=>{
    const name = todoObject.name;
    const duedate = todoObject.duedate;
    const index = id;
    if(name.length !== 0){
      const html = `
          <div class="list-row-item list-grid js-list-grid-${index}">
            <div class="list-items list-one">${name}</div>
            <div class="list-items">${duedate}</div>
            <div class="list-items status-area">
              <input type="checkbox" id="${index}" class="checkbox js-check" data-item-id="${index}">
              <label class="check-btn btn js-check-btn" for="${index}">
                <i class="ri-checkbox-circle-line uncheck-icon"></i>
                <i class="ri-checkbox-circle-fill check-icon"></i>
              </label>
            </div>
            <div class="list-items">
              <button class="delete-btn js-delete-btn btn">
                <i class="ri-delete-bin-line delete-icon"></i>
              </button>
            </div>
          </div>
        `;
        listItemDisplay += html;  
    }
  });

  const displayElement = selectElement('.js-list-display');
  displayElement.innerHTML = listItemDisplay;
 
  document.querySelectorAll('.js-delete-btn')
  .forEach((deleteBtn, index)=>{
    deleteBtn.addEventListener('click',()=>{
      todoList.splice(index, 1);
      renderTodoList();
      saveStorage();
    });
  });

  document.querySelectorAll('.js-check')
  .forEach((checkbtn, index)=>{
    checkbtn.addEventListener('change', ()=>{ 
      todoList[index].completed = checkbtn.checked;
      saveStorage();
    });
    checkbtn.checked = todoList[index].completed;
  });
};

const addelement = selectElement('.js-add-btn');
addelement.addEventListener('click',()=>{addTodo();});

function addTodo(){
  const nameElement = selectElement('.js-name-input');
  const name = nameElement.value;
  const dateElement = selectElement('.js-date-input');
  const duedate = dateElement.value;

  todoList.push({name: name, duedate: duedate, completed: false});
  nameElement.value = '';
  dateElement.value = '';

  renderTodoList();
  saveStorage();
};

function saveStorage(){
  localStorage.setItem('todolist', JSON.stringify(todoList));
};

