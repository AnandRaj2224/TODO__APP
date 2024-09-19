import { createNewProjectObj,createNewTodoObj } from "./todo";

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
  thisWeekDiv.textContent = 'all todos';

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
    let newlyCreatedProject = createNewProjectObj(name);
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
  newProjectDiv.id = 'newProjectDiv'; // Adding class for multiple projects

  const newProjectDivName = document.createElement('p');
  newProjectDivName.textContent = name;

  const newProjectDivDelete = document.createElement('button');
  newProjectDivDelete.textContent = 'delete';
  newProjectDivDelete.addEventListener('click', () => {
    clearProjectSideBar();
  });

  // When the user clicks on the project, set it as the current project
  newProjectDiv.addEventListener('click', () => {
    const selectedProject = projects.find(project => project.name === name);
    currentProject = selectedProject; // Set the selected project as current
    document.getElementById('currentProject').textContent = `Project: ${name}`; // Update main area
  });

  newProjectDiv.appendChild(newProjectDivName);
  newProjectDiv.appendChild(newProjectDivDelete);
  sideBar.appendChild(newProjectDiv);
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
  
    // Use currentProject for adding the new todo
    createNewTodoObj(todoName, description, dueDate, priority);
  
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

// to display newly made todos in the mainArea.

function displayNewTodo (makeNewTodoObj) {

  const displayTodoDiv = document.createElement('div');

  const displayTodoName = document.createElement('p');

  const displayTodoDescription = document.createElement('p');

  const displayTodoDueDate = document.createElement('p');

  const displayTodoPriority = document.createElement('p');

  const displayTodoDelete = document.createElement('button');

  const displayTodoCompeleted = document.createElement('div')
}