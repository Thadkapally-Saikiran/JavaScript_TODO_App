/*
   This JavaScript file manages the behavior of our to-do list.
   It handles adding, editing, deleting, and displaying tasks.
   Each task has a time, a description, and a priority level.
*/

// This is our starting list of tasks with time, description, and priority.
let todos = [
    { time: "8AM", task: "breakfast", priority: "High" },
    { time: "9AM", task: "practice", priority: "Medium" },
    { time: "10AM", task: "class", priority: "Low" },
];

/*
   This helper function returns a CSS class name based on the task's priority.
   We use this to style tasks differently according to their importance.
*/
function getPriorityClass(priority) {
    if (priority === "High") return "priority-high";
    else if (priority === "Medium") return "priority-medium";
    else if (priority === "Low") return "priority-low";
    else return "";
}

/*
   The display() function builds the HTML for the task list and shows it on the page.
   It goes through each task in our 'todos' array and creates a list item.
*/
function display() {
    // Use reduce to build the HTML string for each task
    let tasks = todos.reduce(function (str, obj, index) {
        return str + `
            <li class="task-item ${getPriorityClass(obj.priority)}">
                <!-- Show task description and time -->
                <span class="task-text">${obj.task} (${obj.time})</span>
                <!-- Show a badge indicating the priority level -->
                <span class="priority-badge">${obj.priority}</span>
                <!-- Buttons to edit or delete this task -->
                <div>
                    <button class="btn btn-secondary me-2" onclick="openEditModal(${index});" data-bs-toggle="modal" data-bs-target="#editTask">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTask(${index});">Delete</button>
                </div>
            </li>
        `;
    }, "");

    // Wrap the tasks in an ordered list and insert into the page
    let tasksStr = `<ol>${tasks}</ol>`;
    document.getElementById("todosEle").innerHTML = tasksStr;
}

/*
   The addTask() function is called when the user clicks the "Add Task" button.
   It gets the values from the input fields and adds a new task to the list.
*/
function addTask() {
    // Read values from the input fields and remove any extra spaces
    let time = document.getElementById("time").value.trim();
    let task = document.getElementById("task").value.trim();
    let priority = document.getElementById("priority").value.trim();

    // Check if any field is empty; if so, alert the user and stop
    if (task === "" || time === "" || priority === "") {
        alert("Please enter task, time, and select a priority!");
        return;
    }

    // Add the new task to our todos array
    todos.push({ time: time, task: task, priority: priority });
    // Refresh the task display to show the new task
    display();

    // Clear the input fields so the user can add another task easily
    document.getElementById("time").value = "";
    document.getElementById("task").value = "";
    document.getElementById("priority").value = "";
}

/*
   The deleteTask() function removes a task from our list.
   It uses the task's index to remove it from the array and then updates the display.
*/
function deleteTask(index) {
    todos.splice(index, 1);
    display();
}

/*
   The clearAllTasks() function empties the entire list of tasks.
   It resets the todos array and refreshes the display.
*/
function clearAllTasks() {
    todos = [];
    display();
}

/*
   The openEditModal() function opens the modal window for editing a task.
   It fills in the current task details so the user can update them.
*/
function openEditModal(index) {
    let data = todos[index];
    document.getElementById("editTaskTextBox").value = data.task;
    document.getElementById("editTaskTimeBox").value = data.time;
    document.getElementById("editTaskPriorityBox").value = data.priority;
    // Store the index of the task being edited in a hidden input
    document.getElementById("taskIndex").value = index;
}

/*
   The updateTask() function saves the changes made in the edit modal.
   It updates the corresponding task in the todos array and refreshes the display.
*/
function updateTask() {
    let index = document.getElementById("taskIndex").value;
    let task = document.getElementById("editTaskTextBox").value.trim();
    let time = document.getElementById("editTaskTimeBox").value.trim();
    let priority = document.getElementById("editTaskPriorityBox").value.trim();

    // Check if any updated field is empty; if so, alert the user
    if (task === "" || time === "" || priority === "") {
        alert("Please enter task, time, and select a priority!");
        return;
    }

    // Update the task with the new details
    todos[index] = { time: time, task: task, priority: priority };
    // Refresh the display to show the updated task
    display();
}

// Call the display() function once when the page loads to show the current tasks.
display();
