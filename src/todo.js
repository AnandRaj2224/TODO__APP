export function createNewProjectObj(name) {
  return {
    name,
    todo: [],
    addTodo(todo) {
      this.todo.push(todo);
    },
  };
}

export function createNewTodoObj(todoName, description, dueDate, priority) {
  return {
    todoName,
    description,
    dueDate,
    priority,
  };
}
