import { makeNewProjectObj, makeNewTodoObj } from "./todo";


const container = document.getElementById('container');
const sideBar = document.getElementById('sideBar');
const mainArea = document.getElementById('mainArea');

// function to generate the page.
export function domCreation() {
  
  sideBarCreation();
  mainAreaCreation();
}

// the sideBar DOM creation code.
function sideBarCreation () {

  const allProjectsDiv = document.createElement('div');
  allProjectsDiv.id = 'allProjectsDiv';
  allProjectsDiv.textContent = 'all projects';

  const thisWeekDiv = document.createElement('div');
  thisWeekDiv.id = 'thisWeekDiv';
  thisWeekDiv.textContent = 'this week';

  const todayDiv = document.createElement('div');
  todayDiv.id = 'todayDiv';
  todayDiv.textContent = 'today';

  const projectsDiv = document.createElement('div');
  projectsDiv.id = 'projectsDiv';
  projectsDiv.textContent = 'projects';

  const createProjectsBtn = document.createElement('button');
  createProjectsBtn.id = 'createProjectBtn';
  createProjectsBtn.textContent = 'new project';
  createProjectsBtn.addEventListener('click', () => {

    createProjectDialog();
  });

  sideBar.appendChild(allProjectsDiv);
  sideBar.appendChild(thisWeekDiv);
  sideBar.appendChild(todayDiv);
  sideBar.appendChild(projectsDiv);
  sideBar.appendChild(createProjectsBtn);
}

// project creation dialog code.
function createProjectDialog() {

  const projectDialogBox = document.createElement('div');
  projectDialogBox.id = 'projectDialogBox';

  const projectDialogTitle = document.createElement('p');
  projectDialogTitle.id = 'projectDialogTitle';
  projectDialogTitle.textContent = 'create new project';

  const projectDialogInput = document.createElement('input');
  projectDialogInput.id = 'projectDialogInput';
  projectDialogInput.placeholder = 'project name';


  const projectDialogSubmit = document.createElement('button');
  projectDialogSubmit.classList.add('projectBtns');
  projectDialogSubmit.textContent = 'submit';
  projectDialogSubmit.addEventListener('click', () => {

    let name = projectDialogInput.value;
    makeNewProject(name);
    makeNewProjectObj(name);
    clearProjectDialog();
  });
  
  const projectDialogCancel = document.createElement('button');
  projectDialogCancel.classList.add('projectBtns');
  projectDialogCancel.textContent = 'cancel';
  projectDialogCancel.addEventListener('click', () => {

    clearProjectDialog();
  });

  projectDialogBox.appendChild(projectDialogTitle);
  projectDialogBox.appendChild(projectDialogInput);
  projectDialogBox.appendChild(projectDialogSubmit);
  projectDialogBox.appendChild(projectDialogCancel);
  container.appendChild(projectDialogBox);
}

// to remove project dialog box.
function clearProjectDialog() {

  container.removeChild(projectDialogBox);
}

// to create a new project tab/div on the sidebar.
function makeNewProject(name) {

  const newProjectDiv = document.createElement('div');
  newProjectDiv.id = 'newProjectDiv';

  const newProjectDivName = document.createElement('p');
  newProjectDivName.id = 'newProjectDivName';
  newProjectDivName.textContent = name;

  const newProjectDivDelete = document.createElement('button');
  newProjectDivDelete.id = 'newProjectDeleteBtn';
  newProjectDivDelete.textContent = 'delete';
  newProjectDivDelete.addEventListener('click', () => {

    clearProjectSideBar();
  });


    // Add event listener to set the current project when selected
    newProjectDiv.addEventListener('click', () => {
      currentProject = projects.find(p => p.name === name); // Find the project by name
      displayTodos(currentProject); // Display the project's todos
      console.log(`Current project set to: ${currentProject.name}`);
    });


  newProjectDiv.appendChild(newProjectDivName);
  newProjectDiv.appendChild(newProjectDivDelete);
  sideBar.appendChild(newProjectDiv);
}


function displayTodos(project) {
  const allTodoDisplay = document.getElementById('allTodoDisplay');
  allTodoDisplay.innerHTML = ''; // Clear previous todos

  project.todo.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');
    todoDiv.textContent = `${todo.todoName} - ${todo.priority} - ${todo.dueDate}`;
    allTodoDisplay.appendChild(todoDiv);
  });
}

// to remove the already  created projects.
function clearProjectSideBar() {

  sideBar.removeChild(newProjectDiv);
}

// mainArea DOM creation code.
function mainAreaCreation () {

  const headerDiv = document.createElement('div');
  headerDiv.id = 'headerDiv';

  const currentProject = document.createElement('div');
  currentProject.id = 'currentProject';
  currentProject.textContent = 'current project';

  const addTodoBtn = document.createElement('button');
  addTodoBtn.id = 'addTodoBtn';
  addTodoBtn.textContent = 'add Todo';
  addTodoBtn.addEventListener('click', () => {

    createTodoDialog();
  });
  
  const allTodoDisplay = document.createElement('div');
  allTodoDisplay.id = 'allTodoDisplay';

  headerDiv.appendChild(currentProject);
  headerDiv.appendChild(addTodoBtn);
  mainArea.appendChild(headerDiv);
  mainArea.appendChild(allTodoDisplay);
}

let todoForm;
// todo dialog box creation code.
function createTodoDialog() {

   todoForm =  document.createElement('div');
  todoForm.id = 'todoForm';

  const todoHeading = document.createElement('p');
  todoHeading.textContent = 'create new todo';
  todoHeading.id = 'todoHeading';

  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'Name:';
  const todoInputName = document.createElement('input');
  todoInputName.placeholder = 'todo name';
  todoInputName.type = 'text';
  todoInputName.name = 'name';

  const DescriptionLabel = document.createElement('label');
  DescriptionLabel.textContent = 'description:';
  const todoInputDescription = document.createElement('textarea');
  todoInputDescription.name = 'description';
  todoInputDescription.placeholder = 'todo description';
  todoInputDescription.id = 'todoInputDescription';
  
  const dateLabel =  document.createElement('label');
  dateLabel.textContent = 'due Date';
  const todoDueDate = document.createElement('input');
  todoDueDate.type = 'date';
  todoDueDate.name = 'due Date';

  const priorityLable = document.createElement('label');
  priorityLable.textContent = 'priority level';
  const todoPriority = document.createElement('select');
  let options = ['low','medium','high'];
  options.forEach(optionText => {
    let option = document.createElement('option');
    option.value = optionText.toLowerCase();
    option.textContent = optionText;
    todoPriority.appendChild(option);
  });
  todoPriority.name = 'priority level';

  const todoConfirm =  document.createElement('button');
  todoConfirm.type = 'submit';
  todoConfirm.name = 'confirm';
  todoConfirm.id = 'todoConfirmBtn';
  todoConfirm.textContent = 'confirm';
  todoConfirm.addEventListener('click', () => {

    let todoName = todoInputName.value;
    let description = todoInputDescription.value;
    let priority = todoPriority.value;
    let dueDate = todoDueDate.value;

    makeNewTodoObj(todoName,description,dueDate,priority);
    
    clearTodoDialog(todoForm);
  });

  const todoCancel = document.createElement('button');
  todoCancel.type = 'reset';
  todoCancel.name = 'cancel';
  todoCancel.id = 'todoCancelBtn';
  todoCancel.textContent = 'cancel';
  todoCancel.addEventListener('click', () => {

    clearTodoDialog(todoForm);
  });

  todoForm.appendChild(todoHeading);
  todoForm.appendChild(inputLabel);
  todoForm.appendChild(todoInputName);
  todoForm.appendChild(DescriptionLabel);
  todoForm.appendChild(todoInputDescription);
  todoForm.appendChild(dateLabel);
  todoForm.appendChild(todoDueDate);
  todoForm.appendChild(priorityLable);
  todoForm.appendChild(todoPriority);
  todoForm.appendChild(todoConfirm);
  todoForm.appendChild(todoCancel);

  container.appendChild(todoForm);

} 

function clearTodoDialog(todoForm) {

  container.removeChild(todoForm);
}