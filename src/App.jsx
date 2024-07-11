import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";

import {useState} from "react";
// install "npm install nanoid"
// use to generate unique ids
import { nanoid } from "nanoid";

function App(props) {
    // const taskList = props.tasks?.map((task) => (
    //     <Todo
    //         id={task.id}
    //         name={task.name}
    //         completed={task.completed}
    //         key={task.id}
    //     />
    // ));
    // console.log(taskList);

    const [tasks, setTasks] = useState(props.tasks);
    function addTask(name){
        // Function passed as callback prop to the Form component to fetch task name

        // Test code
        // name? alert(name):alert("Task empty. Type name of a task to be done.");

        // Receive task from Form component
        // Update task state
        // Note: name is a string. Restructure to object to match task object state
        const newTask = {id:`todo-${nanoid()}`, name, completed: false};
        // update tasks on top of existing tast
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id){
        // update task completion status.
        // update tasks completion status depending on the status of the checkbox.
        // Note: This step is syncing the app with the UI. Synchronizing the browser with the underlying state data
        const updatedTasks = tasks.map((task) =>{
            // if this task has the same ID as the edited task
            if(task.id === id){
                return {...task, completed: !task.completed}; // update each task completion by inversion of boolean
            }
            return task
        })
        setTasks(updatedTasks); // update tasks state
    }

    function deleteTask(id){
        // delete task
         const remainingTasks = tasks.filter((task) => id !== task.id);
         console.log(remainingTasks);
         setTasks(remainingTasks);
    }

    // Count tasks
    const tasksNoun = tasks.length !== 1? "tasks": "task"
    const headingText = `${tasks.length} ${tasksNoun}`;

    function editTask(id, newName){
        // edit task

        const editedTaskList = tasks.map((task) =>{
            if(task.id === id){
                return {...task, name: newName};
            }
            return task
        })
        setTasks(editedTaskList);
    }
    // log task
    console.log(tasks);
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
        <div className="filters btn-group stack-exception">
            <FilterButton/>
            <FilterButton/>
            <FilterButton/>
        </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {/*<Todo name="Eat" id="todo-0" completed/>*/}
        {/*<Todo name="Sleep" id="todo-1"/>*/}
        {/*<Todo name="Repeat" id="todo-2"/>*/}
        {tasks?.map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ))}
      </ul>
    </div>
  );
}

export default App;
