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
  todoList.forEach((todoObject)=>{
    const name = todoObject.name;
    const duedate = todoObject.duedate;
    if(name !== ''){
      const html = `
          <div class="list-row-item list-grid">
            <div class="list-items">${name}</div>
            <div class="list-items">${duedate}</div>
            <div class="list-items status-area js-status-area">
              <button class="check-btn btn js-check-btn">
                <i class="ri-checkbox-circle-line uncheck-icon"></i>
                <i class="ri-checkbox-circle-fill check-icon"></i>
              </button>
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
};

const addelement = selectElement('.js-add-btn');
addelement.addEventListener('click',()=>{addTodo()});

function addTodo(){
  const nameElement = selectElement('.js-name-input');
  const name = nameElement.value;
  const dateElement = selectElement('.js-date-input');
  const duedate = dateElement.value;

  todoList.push({name: name, duedate: duedate});
  nameElement.value = '';

  renderTodoList();
  saveStorage();
};

function saveStorage(){
  localStorage.setItem('todolist', JSON.stringify(todoList));
};

// get current year
const date = new Date();
const currentYear = date.getFullYear();
const yearElemnt = selectElement('.copy-year');
yearElemnt.innerHTML = currentYear;

// toggle check btn
const togglecheckBtn = selectElement('.js-check-btn');
const statusElement  = selectElement('.js-status-area');
const current = localStorage.getItem('current');

if (current){
  statusElement.classList.add('checked');
}

togglecheckBtn.addEventListener('click', ()=>{
  statusElement.classList.toggle('checked');

  if(statusElement.classList.contains('checked')){
    localStorage.setItem('current', 'active');
  }else{
    localStorage.removeItem('current');
  }
});