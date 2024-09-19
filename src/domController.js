import { createNewProjectObj, createNewTodoObj } from "./todo";
import { projects, currentProject, saveToLocalStorage, loadFromLocalStorage } from "./projectManager";

let container, sideBar, mainArea, overlay;

// Function to generate the page.
export function domCreation() {
  console.log('Calling domCreation()');

  // Access DOM elements here to ensure they're available
  container = document.getElementById('container');
  sideBar = document.getElementById('sideBar');
  mainArea = document.getElementById('mainArea');

  // Create and append the overlay
  createOverlay();

  sideBarCreation();  // Create the sidebar structure
  mainAreaCreation(); // Create the main area structure

  // Load projects from localStorage and display them in the sidebar
  loadFromLocalStorage(makeNewProject, displayTodos);
}

// Create the overlay dynamically
function createOverlay() {
  overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '100'; // Ensures it is on top of everything else
  container.appendChild(overlay);
}

// The sidebar DOM creation code.
function sideBarCreation() {
  console.log('Generating sidebar');

  const projectsDiv = document.createElement('div');
  projectsDiv.id = 'projectsDiv';
  projectsDiv.textContent = 'Projects';

  const createProjectsBtn = document.createElement('button');
  createProjectsBtn.id = 'createProjectBtn';
  createProjectsBtn.textContent = 'New Project';
  createProjectsBtn.addEventListener('click', () => {
    createProjectDialog();
    showOverlay(); // Show the overlay when project dialog is open
  });

  sideBar.appendChild(createProjectsBtn);
  sideBar.appendChild(projectsDiv);
}

// Function to create a new project tab/div on the sidebar
export function makeNewProject(project) {
  const newProjectDiv = document.createElement('div');
  newProjectDiv.classList.add('newProjectDiv'); // Class for multiple projects
  
  const newProjectDivName = document.createElement('p');
  newProjectDivName.textContent = project.name;

  const newProjectDivDelete = document.createElement('button');
  newProjectDivDelete.textContent = 'Delete';
  newProjectDivDelete.classList.add('newProjectDivDelete');
  newProjectDivDelete.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents project selection on delete click
    deleteProject(project.name); // Delete project by name
  });

  // When the user clicks on the project, set it as the current project
  newProjectDiv.addEventListener('click', () => {
    currentProject = project; // Set the selected project as current
    document.getElementById('currentProject').textContent = `Project: ${project.name}`; // Update main area
    displayTodos(); // Refresh todos display
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
  currentProjectDiv.textContent = 'No project selected';

  const addTodoBtn = document.createElement('button');
  addTodoBtn.id = 'addTodoBtn';
  addTodoBtn.textContent = 'Add Todo';
  addTodoBtn.addEventListener('click', () => {
    if (currentProject) {
      createTodoDialog();
      showOverlay(); // Show the overlay when todo dialog is open
    } else {
      alert("Please select a project first");
    }
  });

  const allTodoDisplay = document.createElement('div');
  allTodoDisplay.id = 'allTodoDisplay';

  headerDiv.appendChild(currentProjectDiv);
  headerDiv.appendChild(addTodoBtn);
  mainArea.appendChild(headerDiv);
  mainArea.appendChild(allTodoDisplay);
}

// Function to display todos in the current project
export function displayTodos() {
  const allTodoDisplay = document.getElementById('allTodoDisplay');
  allTodoDisplay.innerHTML = ''; // Clear existing todos

  if (currentProject && currentProject.todo.length > 0) {
    currentProject.todo.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todoItem');
      todoItem.textContent = `${todo.todoName} - ${todo.description} (Due: ${todo.dueDate}, Priority: ${todo.priority})`;
      allTodoDisplay.appendChild(todoItem);
    });
  } else {
    allTodoDisplay.textContent = 'No todos found';
  }
}

// Todo dialog box creation code.
function createTodoDialog() {
  const todoDialogBox = document.createElement('div');
  todoDialogBox.id = 'todoDialogBox';

  const todoDialogTitle = document.createElement('p');
  todoDialogTitle.id = 'todoDialogTitle';
  todoDialogTitle.textContent = 'Create New Todo';

  const todoDialogInputName = document.createElement('input');
  todoDialogInputName.id = 'todoDialogInputName';
  todoDialogInputName.placeholder = 'Todo Name';

  const todoDialogInputDesc = document.createElement('input');
  todoDialogInputDesc.id = 'todoDialogInputDesc';
  todoDialogInputDesc.placeholder = 'Description';

  const todoDialogInputDueDate = document.createElement('input');
  todoDialogInputDueDate.id = 'todoDialogInputDueDate';
  todoDialogInputDueDate.type = 'date';
  todoDialogInputDueDate.id = 'todoDialogInputDueDate';

  const todoDialogPriority = document.createElement('select');
  todoDialogPriority.id = 'todoDialogPriority';
  const priorities = ['Low', 'Medium', 'High'];
  priorities.forEach(priority => {
    const option = document.createElement('option');
    option.value = priority;
    option.textContent = priority;
    todoDialogPriority.appendChild(option);
  });

  const todoDialogSubmit = document.createElement('button');
  todoDialogSubmit.id = 'todoConfirmBtn';
  todoDialogSubmit.textContent = 'Submit';
  todoDialogSubmit.addEventListener('click', () => {
    let todoName = todoDialogInputName.value;
    let description = todoDialogInputDesc.value;
    let dueDate = todoDialogInputDueDate.value;
    let priority = todoDialogPriority.value;

    if (todoName && description && dueDate) {
      const newTodo = createNewTodoObj(todoName, description, dueDate, priority);
      currentProject.addTodo(newTodo); // Add todo to the current project
      displayTodos(); // Refresh the todo list
      clearTodoDialog(); // Clear the dialog
      hideOverlay(); // Hide the overlay
      saveToLocalStorage(); // Save to localStorage
    } else {
      alert("Please fill out all fields");
    }
  });

  const todoDialogCancel = document.createElement('button');
  todoDialogCancel.id = 'todoCancelBtn';
  todoDialogCancel.textContent = 'Cancel';
  todoDialogCancel.addEventListener('click', () => {
    clearTodoDialog();
    hideOverlay(); // Hide the overlay
  });

  todoDialogBox.appendChild(todoDialogTitle);
  todoDialogBox.appendChild(todoDialogInputName);
  todoDialogBox.appendChild(todoDialogInputDesc);
  todoDialogBox.appendChild(todoDialogInputDueDate);
  todoDialogBox.appendChild(todoDialogPriority);
  todoDialogBox.appendChild(todoDialogSubmit);
  todoDialogBox.appendChild(todoDialogCancel);

  container.appendChild(todoDialogBox);
}

// Clears the todo dialog box after creating/canceling a todo
function clearTodoDialog() {
  const todoDialogBox = document.getElementById('todoDialogBox');
  if (todoDialogBox) {
    container.removeChild(todoDialogBox);
  }
}

// Project dialog box creation code.
function createProjectDialog() {
  const projectDialogBox = document.createElement('div');
  projectDialogBox.id = 'projectDialogBox';

  const projectDialogTitle = document.createElement('p');
  projectDialogTitle.id = 'projectDialogTitle';
  projectDialogTitle.textContent = 'Create New Project';

  const projectDialogInput = document.createElement('input');
  projectDialogInput.id = 'projectDialogInput';
  projectDialogInput.placeholder = 'Project Name';

  const projectDialogSubmit = document.createElement('button');
  projectDialogSubmit.classList.add('projectBtns');
  projectDialogSubmit.textContent = 'Submit';
  projectDialogSubmit.addEventListener('click', () => {
    let projectName = projectDialogInput.value;
    if (projectName) {
      const newProject = createNewProjectObj(projectName);
      projects.push(newProject); // Add new project to projects array
      makeNewProject(newProject); // Create a new project in the DOM
      clearProjectDialog(); // Clear the dialog
      hideOverlay(); // Hide the overlay
      saveToLocalStorage(); // Save to localStorage
    } else {
      alert("Please enter a project name");
    }
  });

  const projectDialogCancel = document.createElement('button');
  projectDialogCancel.classList.add('projectBtns');
  projectDialogCancel.textContent = 'Cancel';
  projectDialogCancel.addEventListener('click', () => {
    clearProjectDialog();
    hideOverlay(); // Hide the overlay
  });

  projectDialogBox.appendChild(projectDialogTitle);
  projectDialogBox.appendChild(projectDialogInput);
  projectDialogBox.appendChild(projectDialogSubmit);
  projectDialogBox.appendChild(projectDialogCancel);

  container.appendChild(projectDialogBox);
}

// Clears the project dialog box after creating/canceling a project
function clearProjectDialog() {
  const projectDialogBox = document.getElementById('projectDialogBox');
  if (projectDialogBox) {
    container.removeChild(projectDialogBox);
  }
}

// Overlay management functions
function showOverlay() {
  if (overlay) {
    overlay.style.display = 'block';
  }
}

function hideOverlay() {
  if (overlay) {
    overlay.style.display = 'none';
  }
}
