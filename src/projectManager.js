let projects = [];
let currentProject = null; // Ensure it's initialized to null to avoid undefined errors.

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
  console.log('Projects saved to localStorage:', projects);
}

// Load projects from localStorage and ensure they are rendered into the DOM
export function loadFromLocalStorage(callbackMakeNewProject, callbackDisplayTodos) {
  try {
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    
    if (savedProjects && Array.isArray(savedProjects)) {
      projects = savedProjects.map(projectData => {
        const project = new Project(projectData.name);
        project.todo = projectData.todo.map(todoData => new Todo(todoData.todoName, todoData.description, todoData.dueDate, todoData.priority));
        return project;
      });

      console.log('Projects loaded from localStorage:', projects);

      // Ensure to rebuild the sidebar with loaded projects
      projects.forEach(project => callbackMakeNewProject(project));

      // Set currentProject if there's any saved project
      if (projects.length > 0) {
        currentProject = projects[0];  // Set to the first project by default
        document.getElementById('currentProject').textContent = `Project: ${currentProject.name}`;
        callbackDisplayTodos(); // Display todos of the first project
      } else {
        console.log('No projects available to display');
      }
    } else {
      console.log('No valid projects found in localStorage');
      // Initialize empty state
      projects = [];
    }
  } catch (error) {
    console.error('Error loading from localStorage. Clearing localStorage...', error);
    localStorage.clear(); // Clear localStorage if there's an error
    projects = [];
  }
}

// Export the projects and currentProject so other files can use them
export { projects, currentProject, Project, Todo };
