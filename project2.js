
function Task(task_id) {
  this.task_id = task_id
  this.completed = false
}

Task.prototype.task_description = function(task_description) {
  return this.task_description = task_description;
};

Task.prototype.due_date = function(date) {
  let _date = date.split("-")
  return this.date = new Date(parseInt(_date[0]),parseInt(_date[1])-1,parseInt(_date[2])+1);
};

Task.prototype.priority_level = function(priority_input) {
  let priorities_level = ['High' , 'Medium', 'Low']
  let check = priorities_level.includes(priority_input)? priority_input : 'Invalid Priority Level Input';
  return this.priority_level = check
};

let tasks = [];

function addNewTask (task_id,task_description, date, priority_input)  {
  let t = new Task(task_id);
  t.task_description(task_description);
  t.due_date(date);
  t.priority_level(priority_input)
  tasks.push(t)
}

 function listOfAllTasks () {
  console.log(tasks)
}

function getTask (task_id) {
  let task = tasks.filter(task => {
    return task.task_id === task_id

  })
  console.log(task)
}

function completeTask (task_id) {
  tasks.map(task => {
    task.task_id === task_id ? task.completed = true : null
  })
  getTask (task_id)
}


let comp_tasks;
function listOfbyCompletingStatus (input) {
  if (input === 'completed') {
     comp_tasks = tasks.filter( task => {
      return task.completed === true
    })
  }


  if (input === 'incomplete') {
    comp_tasks = tasks.filter(task => {
      return task.completed === false
    })
  }
  
  console.log(comp_tasks)
}

function deleteTask (task_id) {
  const index = tasks.findIndex(task => task.task_id === task_id);
  
  tasks.splice(index, 1);

}

function sortByDate () {
    console.log(tasks.sort((a,b) => {
        return a.date - b.date
    }))
}

function sortByPriority () {
  
  let levels = ['High', 'Medium', 'Low'];

    console.log(tasks.sort(function ( a, b ) {
        let x = levels.indexOf(a.priority_level);
        let y = levels.indexOf(b.priority_level);

        if ( x < y ) return -1 ;
        if ( x > y ) return 1 ;
        return 0;
    }))
}

function clearAllTasks () {
  tasks = []
}

const readline = require('readline')

const cmd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function main() {
  cmd.question(`Please Choose Number : \n
0 : Add New Task,
1 : List all of tasks,
2: List of tasks by it completing status,
3: Delete Task
4: sort tasks by date
5: sort tasks by priority,
6: clear all tasks
7: Make task completed
100: Close the app
`, (input) => {

    if (input === '0') {
      let inputs = []
      let id = Math.floor((Math.random() * 100) + 1)
      inputs.push(id)
      cmd.question('please enter task description \n' , (input) => {
        inputs.push(input)
        cmd.question('please enter task data in form year-month-day \n' , (input) => {
          inputs.push(input)
          cmd.question('please choose one of the following priority level: High, Medium , Low \n' , (input) => {
            inputs.push(input)
            addNewTask(...inputs)
            listOfAllTasks()
            console.log('Your new task is added successfully! \n')

            backToMainMenu ()
          })
        })
      })

    }

    else if (input === '1') {
      listOfAllTasks()
      backToMainMenu ()
    }

    else if (input === '2') {
      cmd.question(`please enter \n 
    0 : To list Completed Tasks
    1: To list Incomplete Tasks \n` ,(input) => {

        if (input === '0') {
          listOfbyCompletingStatus('completed')
          backToMainMenu ()
        }
        if (input === '1') {
          listOfbyCompletingStatus('incomplete')
          backToMainMenu ()
        }
      })
    }

    else if (input === '3') {
      cmd.question(`please enter the task id you want to delete \nx` ,(input) => {
        deleteTask(parseInt(input))
        console.log(`The task with id ${input} is deleted`)
        backToMainMenu ()
      })
    }

    else if (input === '4') {
      sortByDate()
      backToMainMenu ()
    }

    else if (input === '5') {
      sortByPriority()
      backToMainMenu ()
    }

    else if (input === '6') {
      cmd.question(`please enter the task id you want to delete \n` ,() => {
        clearAllTasks();
        console.log('All tasks are cleared')
        backToMainMenu ()
      })
    }

    else if (input === '7') {
      cmd.question(`please enter the task id you completed \n` ,(input) => {
        completeTask(parseInt(input));
        getTask(input)
        backToMainMenu ()
      })
    }

    else if (input === '100') {
      cmd.close()
    }

  })


}

function backToMainMenu () {
  cmd.question('Please Enter 9 to back to main menu \n', (input) => {
    if (input === '9') {
      main()
    }
  })
}

main()


