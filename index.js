// db
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://crud-app-c64ce-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(appSettings);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const tasksInDb = ref(database, "tasks");

onValue(tasksInDb, (snapshot) => {
  if (snapshot.exists()) {
    const data = Object.entries(snapshot.val());
    clearTasksList();
    addTasksFromDB(data);
  } else {
    ulList.innerHTML = "<h2>No tasks in list</h2>";
  }
});

// dom elements
const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const ulList = document.getElementsByClassName("task-ul")[0];

addButton.addEventListener("click", () => {
  let inputVal = inputField.value;

  if (inputVal == "") {
    alert("task cannot be empty");
  } else {
    push(tasksInDb, inputVal);
    clearInputfield();
  }
});

const createLiElement = (value) => {
  const task = document.createElement("li");
  task.textContent = value[1];

  task.addEventListener("dblclick", () => {
    let locOfTaskInDb = ref(database, `tasks/${value[0]}`);
    remove(locOfTaskInDb);
  });

  ulList.append(task);
};

const clearInputfield = () => {
  inputField.value = "";
};

const addTasksFromDB = (data) => {
  data.forEach((task) => {
    createLiElement(task);
  });
};

const clearTasksList = () => {
  ulList.innerHTML = "";
};
