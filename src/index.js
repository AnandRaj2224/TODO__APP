import "./index.css";
import { domCreation } from "./domController";
import { loadFromLocalStorage } from "./projectManager";

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  loadFromLocalStorage(); // Load saved projects from localStorage
  domCreation(); // Initialize the page
});
