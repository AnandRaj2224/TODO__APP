import Project from './projects.js';

// Function to save a project to localStorage
export function saveProjectToLocalStorage(project) {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to load projects from localStorage
export function loadProjectsFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  return projects.map(proj => Object.assign(new Project(), proj));
}

// Function to create a new project
export function createNewProject(newProjectName) {
  const project = new Project(newProjectName);
  saveProjectToLocalStorage(project);
  console.log(project);
}

// Function to delete a project
export function deleteProject(projectName) {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const updatedProjects = projects.filter(proj => proj.name !== projectName);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
}
