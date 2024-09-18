export class ProjectManager {
  constructor() {
    // Load projects from localStorage when initializing
    this.projects = this.loadProjectsFromStorage();
  }

  // Function to add a new project
  addProject(project) {
    this.projects.push(project);
    this.saveProjectsToStorage();
  }

  // Function to add a todo to a project
  addTodoToProject(projectName, todo) {
    const project = this.projects.find(p => p.name === projectName);
    if (project) {
      project.todos.push(todo);
      this.saveProjectsToStorage();
    } else {
      console.error(`Project ${projectName} not found.`);
    }
  }

  // Save projects to localStorage
  saveProjectsToStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  // Load projects from localStorage
  loadProjectsFromStorage() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
  }

  // Clear all projects (optional)
  clearProjects() {
    this.projects = [];
    this.saveProjectsToStorage();
  }
}

// Helper function to clear the entire local storage (optional)
export function clearLocalStorage() {
  localStorage.clear();
}
