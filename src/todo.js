let currentProject; // points to currently opened project
let projects = []; // stores all the projects


class Project {

  constructor(name) {
    this.name = name;
    this.todo = [];
  }

  addTodo(todo) {
    this.todo.push(todo);
  }

}

class Todo {

  constructor(todoName,description,dueDate,priority) {
    this.todoName = todoName;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

}

export function createNewProjectObj(name) {

  let project1 = new Project(name);

  currentProject = project1;
  projects.push(project1);

  return project1;
}

export function createNewTodoObj(todoName, description, dueDate, priority) {
  let todo1 = new Todo(todoName, description, dueDate, priority);

  if (currentProject) {
    currentProject.addTodo(todo1); // Add todo to the current active project
    console.log(currentProject);   // Logging the current project with its todos
    console.log(projects);         // Logging all the projects
  } else {
    console.error("No project selected to add a todo to!");
  }
}
