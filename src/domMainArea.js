const mainArea = document.querySelector('#mainArea');

// code for  MainArea.
export function generateMainArea () {

  const headerArea = document.createElement('div');
  headerArea.id = 'headerArea';

  const displayCurrent = document.createElement('div');
  displayCurrent.id = 'displayCurrent';

  const createNewTodoBtn = document.createElement('button');
  createNewTodoBtn.textContent = 'add todo';
  createNewTodoBtn.id = 'createNewTodoBtn';

  const bodyDisplayArea = document.createElement('div');
  bodyDisplayArea.id = 'bodyDisplayArea';

  mainArea.appendChild(headerArea);
  mainArea.appendChild(bodyDisplayArea);

  headerArea.appendChild(displayCurrent);
  headerArea.appendChild(createNewTodoBtn);
}