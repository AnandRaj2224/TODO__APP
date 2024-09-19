const projects = [];

class Project {

  constructor(name) {
    this.name = name;
    this.todo = [];
  }

  addTodos(todo) {
    this.todo.push(todo);
  }

  addprojects(project) {
    projects.push(project);
  }

}

class Todo {

  constructor(todoName,discription,dueDate,priority) {
    this.todoName = todoName;
    this.discription = discription;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// to make a new project object.
export function makeNewProjectObj(name) {

  const Project1 = new Project(name);
  console.log(Project1);
}

// to make new todo object.
export function makeNewTodoObj(todoName, description, dueDate, priority) {
  const todo1 = new Todo(todoName, description, dueDate, priority);
  console.log(todo1);
  return todo1; // Return the new todo object
}

let currentProject = null; // Global variable to track the current selected project

// to link the todo to the current project
export function linkProjectWithTodo(todoObj) {
  if (currentProject) {
    currentProject.addTodos(todoObj); // Add todo to the current project
    console.log(`Todo added to project: ${currentProject.name}`);
    console.log(currentProject.todo); // Display todos of current project
  } else {
    console.log("No project selected.");
  }
}