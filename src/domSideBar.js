const sideBar = document.querySelector('#sideBar');

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
  

  sideBar.appendChild(allProjectDiv);
  sideBar.appendChild(thisWeekDiv);
  sideBar.appendChild(todayDiv);
  sideBar.appendChild(sectionOff);
  sideBar.appendChild(addNewProjectBtn);

}
