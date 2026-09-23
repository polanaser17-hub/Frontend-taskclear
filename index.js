const taskinput = document.querySelector("#taskinput");
const descriptioninput = document.querySelector("#descriptioninput");
const categoryinput = document.querySelector("#categoryinput");
const dateinput = document.querySelector("#dateinput");
const btnaddtask = document.querySelector("#btnaddtask");
const todayTasks = document.querySelector("#todayTasks");
const taskstat = document.querySelector("#taskstat");
const progressbar = document.querySelector("#progressbar");
const progressPercentage = document.querySelector("#progressPercentage");

let tasks = [];

loaddata()

function savedtasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loaddata() {
    let savedata = localStorage.getItem("tasks")

    if (savedata) {
        tasks = JSON.parse(savedata)
    }
    displaydata()
}

btnaddtask.addEventListener("click", function () {
    if (taskinput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }
    let task = {
        title: taskinput.value,
        description: descriptioninput.value,
        category: categoryinput.value,
        date: dateinput.value,
        completed: false
    }
    tasks.push(task)
    displaydata()
    let modalElement = document.querySelector("#addTaskModal");

    document.activeElement.blur();

    let modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide()
    savedtasks()
})

todayTasks.addEventListener("change", function (event) {
    if (event.target.classList.contains("taskcheck")) {
        let index = event.target.dataset.index;
        tasks[index].completed = event.target.checked
        displaydata()
        udatedstatistics()
        savedtasks()
    }
})

todayTasks.addEventListener("click", function (event) {
    if (event.target.classList.contains("btndel")) {
        let index = event.target.dataset.index;
        tasks.splice(index, 1)
        displaydata()
        savedtasks()
    }
})

todayTasks.addEventListener("click", function (event) {
    if (event.target.classList.contains("btned")) {
        let index = event.target.dataset.index
        let NEWTASK = prompt("edit your task")
        tasks[index].title = NEWTASK
        displaydata()
        savedtasks()
    }
})

function udatedstatistics() {
    let completedtasks = tasks.filter(function (task) {
        return task.completed === true;
    })
    taskstat.textContent = completedtasks.length
    let progress = 0
    if (tasks.length > 0) {
        progress = (completedtasks.length / tasks.length) * 100;
    }
    progress = Math.round(progress);
    progressbar.style.width = `${progress}%`
    progressPercentage.textContent = `${progress}%`;
}

function displaydata() {
    todayTasks.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        todayTasks.innerHTML += `
        <div class="card border rounded-4 mb-3 shadow-sm">

            <div class="card-body p-4">

                <!-- Top -->
                <div class="d-flex align-items-start gap-3">

                    <!-- Checkbox -->
                    <div class="form-check mt-1">
                        <input
                            class="form-check-input taskcheck"
                            type="checkbox"
                            data-index="${i}"
                            ${tasks[i].completed ? "checked" : ""}>
                    </div>


                    <!-- Task Content -->
                    <div class="flex-grow-1">

                        <h6 class="mb-1 fw-semibold ${tasks[i].completed
                ? "text-decoration-line-through text-secondary"
                : ""
            }">
                            ${tasks[i].title}
                        </h6>

                        <p class="text-secondary small mb-3">
                            ${tasks[i].description || "No description"}
                        </p>


                        <!-- Category + Date -->
                        <div class="d-flex align-items-center gap-2 flex-wrap">

                            <span class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                ${tasks[i].category}
                            </span>

                            <span class="text-secondary small">
                                <i class="bi bi-calendar3 me-1"></i>
                                ${tasks[i].date || "No date"}
                            </span>

                        </div>

                    </div>


                    <!-- Buttons -->
                    <div class="d-flex gap-2">

                        <button
                            class="btn btn-sm btn-outline-primary px-3 btned"
                            data-index="${i}">
                            <i class="bi bi-pencil me-1"></i>
                            Edit
                        </button>

                        <button
                            class="btn btn-sm btn-outline-danger px-3 btndel"
                            data-index="${i}">
                            <i class="bi bi-trash me-1"></i>
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>
        `;
    }
    udatedstatistics()

}