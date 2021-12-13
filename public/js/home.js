//name totalItems timePerDay

function formClickHandler() {
  const name = document.getElementById("name").value;
  const totalTasks = document.getElementById("totalTasks").value;
  const timePerDay = document.getElementById("timePerDay").value;
  const tasksForm = document.getElementById("tasks-form");
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/evaluate";

  for (let i = 1; i <= totalTasks; i++) {
    let elementDiv = document.createElement("div");

    //take name input of tasks
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = `task-${i}-name`;
    inputElement.value = `task-${i}`;
    inputElement.required = true;
    inputElement.placeholder = `Enter name of task ${i} `;

    //take duration of the task
    let inputElement2 = document.createElement("input");
    inputElement2.type = "number";
    inputElement2.id = `task${i}`;
    inputElement2.name = `task-${i}-duration`;
    inputElement2.required = true;
    inputElement2.placeholder = `Enter duration of task ${i} `;

    //creating label for deadline and taking input for the deadline of task

    let inputElement3 = document.createElement("input");
    inputElement3.type = "number";
    inputElement3.placeholder = "Enter no. days left(deadline)";
    inputElement3.id = `task${i}-deadline`;
    inputElement3.name = `task-${i}-deadline`;
    inputElement3.required = true;

    elementDiv.appendChild(inputElement);
    elementDiv.appendChild(inputElement2);

    elementDiv.appendChild(inputElement3);
    form.appendChild(elementDiv);
    // form.appendChild(inputElement);
    // form.appendChild(inputElement2);
  }

  //input to store number of tasks
  let totalTaskElement = document.createElement("input");
  totalTaskElement.value = totalTasks;
  totalTaskElement.name = "totalTasks";
  totalTaskElement.type = "hidden";

  form.appendChild(totalTaskElement);

  let timePerDayElement = document.createElement("input");
  timePerDayElement.value = timePerDay;
  timePerDayElement.name = "timePerDay";
  timePerDayElement.type = "hidden";

  form.appendChild(timePerDayElement);

  const submit = document.createElement("button");
  submit.type = "Submit";
  form.appendChild(submit);
  submit.textContent = "Submit";
  tasksForm.appendChild(form);
  tasksForm.classList.add("tasks-form");
}
