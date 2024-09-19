import { createNewProjectObj, createNewTodoObj } from "./todo";
import { projects, currentProject } from "./projectManager";

const container = document.getElementById('container');
const sideBar = document.getElementById('sideBar');
const mainArea = document.getElementById('mainArea');

// Function to generate the page.
export function domCreation() {
  console.log('Calling domCreation()');
  sideBarCreation();
  mainAreaCreation();
}

// The sidebar DOM creation code.
function sideBarCreation() {
  console.log('Generating sidebar');
  
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

  // Rebuild sidebar with existing projects after the page refresh
  projects.forEach(project => makeNewProject(project));
}

// Function to create a new project tab/div on the sidebar
function makeNewProject(project) {
  const newProjectDiv = document.createElement('div');
  newProjectDiv.classList.add('newProjectDiv'); // Class for multiple projects
  
  const newProjectDivName = document.createElement('p');
  newProjectDivName.textContent = project.name;

  const newProjectDivDelete = document.createElement('button');
  newProjectDivDelete.textContent = 'delete';
  newProjectDivDelete.addEventListener('click', () => {
    deleteProject(project.name); // Delete project by name
  });

  // When the user clicks on the project, set it as the current project
  newProjectDiv.addEventListener('click', () => {
    currentProject = project; // Set the selected project as current
    document.getElementById('currentProject').textContent = `Project: ${project.name}`; // Update main area
  });

  newProjectDiv.appendChild(newProjectDivName);
  newProjectDiv.appendChild(newProjectDivDelete);
  sideBar.appendChild(newProjectDiv);
}

// Function to delete project and remove from DOM
function deleteProject(projectName) {
  // Remove from projects array
  const projectIndex = projects.findIndex(project => project.name === projectName);
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);

    // Remove from sidebar
    const projectDiv = Array.from(document.getElementsByClassName('newProjectDiv')).find(div => 
      div.querySelector('p').textContent === projectName
    );
    if (projectDiv) {
      sideBar.removeChild(projectDiv);
    }

    // Reset currentProject if deleted
    if (currentProject && currentProject.name === projectName) {
      currentProject = null;
      document.getElementById('currentProject').textContent = 'No project selected';
    }

    console.log('Project deleted:', projectName);
    saveToLocalStorage(); // Save changes to localStorage
  }
}

// Main area DOM creation code.
function mainAreaCreation() {
  console.log('Generating main area');
  
  const headerDiv = document.createElement('div');
  headerDiv.id = 'headerDiv';

  const currentProjectDiv = document.createElement('div');
  currentProjectDiv.id = 'currentProject';
  currentProjectDiv.textContent = 'current project';

  const addTodoBtn = document.createElement('button');
  addTodoBtn.id = 'addTodoBtn';
  addTodoBtn.textContent = 'add Todo';
  addTodoBtn.addEventListener('click', () => {
    createTodoDialog();
  });

  const allTodoDisplay = document.createElement('div');
  allTodoDisplay.id = 'allTodoDisplay';

  headerDiv.appendChild(currentProjectDiv);
  headerDiv.appendChild(addTodoBtn);
  mainArea.appendChild(headerDiv);
  mainArea.appendChild(allTodoDisplay);
}

// Project dialog box creation code.
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
    if (name) {
      const newProject = createNewProjectObj(name); // Create new project object
      makeNewProject(newProject); // Create new project in the DOM
      clearProjectDialog();
    }
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

// Function to clear the project dialog box
function clearProjectDialog() {
  const projectDialogBox = document.getElementById('projectDialogBox');
  if (projectDialogBox) {
    container.removeChild(projectDialogBox);
  }
}

// Todo dialog box creation code.
function createTodoDialog() {
  const todoForm = document.createElement('div');
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

  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'description:';
  const todoInputDescription = document.createElement('textarea');
  todoInputDescription.name = 'description';
  todoInputDescription.placeholder = 'todo description';
  todoInputDescription.id = 'todoInputDescription';
  
  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'due Date';
  const todoDueDate = document.createElement('input');
  todoDueDate.type = 'date';
  todoDueDate.name = 'due Date';

  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'priority level';
  const todoPriority = document.createElement('select');
  const options = ['low', 'medium', 'high'];
  options.forEach(optionText => {
    const option = document.createElement('option');
    option.value = optionText.toLowerCase();
    option.textContent = optionText;
    todoPriority.appendChild(option);
  });
  todoPriority.name = 'priority level';

  const todoConfirm = document.createElement('button');
  todoConfirm.type = 'submit';
  todoConfirm.name = 'confirm';
  todoConfirm.id = 'todoConfirmBtn';
  todoConfirm.textContent = 'confirm';
  todoConfirm.addEventListener('click', () => {
    const todoName = todoInputName.value;
    const description = todoInputDescription.value;
    const priority = todoPriority.value;
    const dueDate = todoDueDate.value;

    // Use currentProject for adding the new todo
    createNewTodoObj(todoName, description, dueDate, priority);

    clearTodoDialog();
  });

  const todoCancel = document.createElement('button');
  todoCancel.type = 'reset';
  todoCancel.name = 'cancel';
  todoCancel.id = 'todoCancelBtn';
  todoCancel.textContent = 'cancel';
  todoCancel.addEventListener('click', () => {
    clearTodoDialog();
  });

  todoForm.appendChild(todoHeading);
  todoForm.appendChild(inputLabel);
  todoForm.appendChild(todoInputName);
  todoForm.appendChild(descriptionLabel);
  todoForm.appendChild(todoInputDescription);
  todoForm.appendChild(dateLabel);
  todoForm.appendChild(todoDueDate);
  todoForm.appendChild(priorityLabel);
  todoForm.appendChild(todoPriority);
  todoForm.appendChild(todoConfirm);
  todoForm.appendChild(todoCancel);

  container.appendChild(todoForm);
}

// Function to clear the todo dialog box
function clearTodoDialog() {
  const todoForm = document.getElementById('todoForm');
  if (todoForm) {
    container.removeChild(todoForm);
  }
}
