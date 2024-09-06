import { createNewProject, deleteProject ,} from "./projectManager";
import { destroyDialogBox } from "./projects";

const sideBar = document.querySelector('#sideBar');
const container = document.querySelector('#container');


export function generateSideBar () {

  // code for sidebar creation.
  const allProjectDiv = document.createElement('div');
  allProjectDiv.textContent = 'all projects';
  allProjectDiv.id = 'allProjectDiv';

  const thisWeekDiv = document.createElement('div');
  thisWeekDiv.textContent = 'this week';
  thisWeekDiv.id = 'thisWeekDiv';

  const todayDiv = document.createElement('div');
  todayDiv.textContent = 'today';
  todayDiv.id = 'todayDiv';

  const sectionOff = document.createElement('div');
  sectionOff.textContent = 'projects';

  const addNewProjectBtn = document.createElement('button');
  addNewProjectBtn.textContent = 'create project';
  addNewProjectBtn.id = 'addNewProjectBtn';
  addNewProjectBtn.addEventListener('click', () => {

    createNewProjects(container);
  })
  

  sideBar.appendChild(allProjectDiv);
  sideBar.appendChild(thisWeekDiv);
  sideBar.appendChild(todayDiv);
  sideBar.appendChild(sectionOff);
  sideBar.appendChild(addNewProjectBtn);

}

// dom code for create the new project dialog.


function createNewProjects(container) {

  const projectDialog = document.createElement('div');
  projectDialog.id = 'projectDialog';

  const projectDialogTitle = document.createElement('p');
  projectDialogTitle.id = 'projectDialogTitle';
  projectDialogTitle.textContent = ' create new project';

  const projectDialogName = document.createElement('input');
  projectDialogName.id = 'projectDialogName';
  projectDialogName.placeholder = 'Project Name';

  const projectDialogCreateBtn = document.createElement('button');
  projectDialogCreateBtn.classList.add('projectDialogBtn');
  projectDialogCreateBtn.textContent = 'create';
  projectDialogCreateBtn.addEventListener('click', () => {

    let newProjectName = projectDialogName.value;
    createNewProject(newProjectName);
    destroyDialogBox(container,projectDialog);

  })

  const projectDialogCancelBtn = document.createElement('button');
  projectDialogCancelBtn.classList.add('projectDialogBtn');
  projectDialogCancelBtn.textContent = 'cancel';
  projectDialogCancelBtn.addEventListener('click', () => {

    destroyDialogBox(container);
  })

  container.appendChild(projectDialog);
  projectDialog.appendChild(projectDialogTitle);
  projectDialog.appendChild(projectDialogName);
  projectDialog.appendChild(projectDialogCreateBtn);
  projectDialog.appendChild(projectDialogCancelBtn);
}