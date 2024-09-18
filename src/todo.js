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
export function makeNewTodoObj(todoName,description,dueDate,priority) {

  const todo1 = new Todo(todoName,description,dueDate,priority);
  console.log(todo1);
}

export function linkProjectWithTodo() {

}