let projects = [];
let currentProject;

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
  constructor(todoName, description, dueDate, priority) {
    this.todoName = todoName;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// Save projects to localStorage
export function saveToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
  console.log('Projects saved to localStorage');
}

// Load projects from localStorage and ensure they are rendered into the DOM
export function loadFromLocalStorage() {
  const savedProjects = JSON.parse(localStorage.getItem('projects'));
  if (savedProjects) {
    projects = savedProjects.map(projectData => {
      let project = new Project(projectData.name);
      project.todo = projectData.todo.map(todoData => new Todo(todoData.todoName, todoData.description, todoData.dueDate, todoData.priority));
      return project;
    });

    console.log('Projects loaded from localStorage: ', projects);

    // Ensure to rebuild the sidebar with loaded projects
    if (typeof window.makeNewProject === 'function') {
      projects.forEach(project => window.makeNewProject(project));
    } else {
      console.error('makeNewProject function is not available.');
    }
  } else {
    console.log('No projects found in localStorage');
  }
}

// Export the projects and currentProject so other files can use them
export { projects, currentProject, Project, Todo };
