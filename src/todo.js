import { saveToLocalStorage, projects, currentProject, Project, Todo } from './projectManager';

// Function to create a new project object
export function createNewProjectObj(name) {
  let project1 = new Project(name);
  currentProject = project1;
  projects.push(project1);

  saveToLocalStorage(); // Save the updated projects list
  return project1;
}

// Function to create a new todo object
export function createNewTodoObj(todoName, description, dueDate, priority) {
  let todo1 = new Todo(todoName, description, dueDate, priority);
  
  if (currentProject) {
    currentProject.addTodo(todo1);
    saveToLocalStorage(); // Save the updated projects list
  } else {
    console.error("No project selected to add a todo to!");
  }
}
