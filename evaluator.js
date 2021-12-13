exports.postEvaluate = (req, res, next) => {
  const scheduledTasks = [];
  const timePerDay = req.body.timePerDay;
  const totalTasks = req.body.totalTasks;
  let tasks = [];
  for (let i = 1; i <= totalTasks; i++) {
    let task = {
      name: "",
      duration: 0,
      deadline: 0,
    };
    task.name = req.body[`task-${i}-name`];
    task.deadline = parseInt(req.body[`task-${i}-deadline`]);
    task.duration = parseInt(req.body[`task-${i}-duration`]);
    tasks.push(task);
  }

  tasks.sort((a, b) => {
    return a.deadline - b.deadline;
  });

  let maxDeadline = 0;

  tasks.map((task) => {
    if (task.deadline > maxDeadline) {
      maxDeadline = task.deadline;
    }
  });

  for (let i = 0; i < maxDeadline; i++) {
    scheduledTasks.push({
      tasksForDay: [],
      availableTime: timePerDay,
    });
  }

  let notAdjustedTasks = [];

  // copying tasks
  let tasksCopy = [...tasks];

  tasksCopy.map((task) => {
    let index = task.deadline - 1;

    for (let x = 0; x <= index; x++) {
      //if task is completely assigned exit
      if (task.duration === 0) {
        break;
      } else {
        //check for available time
        if (scheduledTasks[x].availableTime) {
          //if available time for day >= task duration then push whole task
          if (scheduledTasks[x].availableTime >= task.duration) {
            let pushedTask = { ...task };
            scheduledTasks[x].tasksForDay.push(pushedTask);
            scheduledTasks[x].availableTime =
              scheduledTasks[x].availableTime - task.duration;
            task.duration = 0;
            break;
          }

          //else just partially push task and decrease its duration equal to available time
          else {
            let newDuration = scheduledTasks[x].availableTime;

            let pushedTask = {
              name: task.name,
              duration: newDuration,
              deadline: task.deadline,
            };

            scheduledTasks[x].tasksForDay.push(pushedTask);
            task.duration = task.duration - scheduledTasks[x].availableTime;
            scheduledTasks[x].availableTime = 0;
          }
        }

        //if time not available for the day
        else {
          continue;
        }
      }
    }

    if (task.duration > 0) {
      notAdjustedTasks.push(task);
    }
  });

  //solution is array of objects -> contains object which has tasks for day and availabletime for a day

  res.render("result", {
    solutions: scheduledTasks,
    unadjusted: notAdjustedTasks,
  });
};
