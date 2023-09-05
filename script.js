const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let taskCounter = 1;

function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        const taskItem = document.createElement("li");
        const taskSpan = document.createElement("span");
        const editInput = document.createElement("input");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(editInput);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        editInput.style.display = "none";
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Устанавливаем номер задачи в начало текста
        taskSpan.textContent = taskCounter + ". " + taskText;
        taskCounter++; // Увеличиваем счетчик

        taskInput.value = "";

        taskItem.addEventListener("click", function (e) {
            if (e.target === editButton) {
                taskSpan.style.display = "none";
                editInput.style.display = "inline-block";
                editInput.value = taskSpan.textContent;
                editInput.focus();

                editInput.addEventListener("keyup", function (e) {
                    if (e.key === "Enter") {
                        taskSpan.style.display = "inline-block";
                        editInput.style.display = "none";
                        taskSpan.textContent = editInput.value;
                    }
                });
            } else if (e.target === deleteButton) {
                taskList.removeChild(taskItem);
                taskCounter--;

                const taskItems = taskList.getElementsByTagName("li");
                for (let i = 0; i < taskItems.length; i++) {
                    const taskSpan = taskItems[i].getElementsByTagName("span")[0];
                    taskSpan.textContent = (i + 1) + ". " + taskSpan.textContent.substring(3);
                }
            }
        });

        editInput.addEventListener("blur", function () {
            taskSpan.style.display = "inline-block";
            editInput.style.display = "none";
            taskSpan.textContent = editInput.value;
        });
    }
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
