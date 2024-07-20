import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";

import {useState, useRef, useEffect, useContext} from "react";
// install "npm install nanoid"
// nanoid is used to generate unique ids for every new task added
import { nanoid } from "nanoid";

// Remembers components and the App() will re-render with changes in state as expected.
// All constants should be defined outside the App() to ensure they retain their values all the time.
const FILTER_MAP = {
    All: ()=> true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
}

const FILTER_NAMES =Object.keys(FILTER_MAP)

import {useTodoContext} from "./todoContext.jsx";

function usePrevious(value){
    // this hook prevents edit button selection on initial loading by storing previous edit state.
    // initially wasEditing should be false
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current
}

function App() {
    // Manage tasks.
    const {tasks, setTasks} = useTodoContext()

    // Filter task based on completion status. Initial state displays all tasks
    const [filter, setFilter] = useState("All");
    
    function addTask(name){
        // Function passed as callback prop to the Form component to fetch task name
        // Receive task from Form component
        // Update task state
        // Note: name is a string. Restructure to object to match task object state.
        // Generate unique ID for each task using nanoid package
        const newTask = {id:`todo-${nanoid()}`, name, completed: false};
        // add a new task to the existing list of tasks
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id){
        // update task completion status.
        // update tasks completion status depending on the status of the checkbox.
        // Note: This step is syncing the app with the UI i.e. synchronizing the browser with the underlying state data
        const updatedTasks = tasks.map((task) =>{
            // if this task has the same ID as the target task, invert completion status boolean
            if(task.id === id){
                return {...task, completed: !task.completed};
            }
            return task
        })
        setTasks(updatedTasks); // update tasks state
    }

    function deleteTask(id){
        // delete task using filter function
         const remainingTasks = tasks.filter((task) => id !== task.id);
         setTasks(remainingTasks);
    }


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
    // console.log(tasks);

    // Count tasks
    const tasksNoun = tasks.length !== 1? "tasks": "task"
    const headingText = `${tasks.filter(FILTER_MAP[filter]).length} ${tasksNoun}`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(()=>{
        if(tasks.length < prevTaskLength){
            listHeadingRef.current.focus()
        }
    },[tasks.length, prevTaskLength]);
  return (
    <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={addTask}/>
        <div className="filters btn-group stack-exception">
            {FILTER_NAMES.map((name)=>(
            <FilterButton
            key={name}
            name={name}
            isPressed={name===filter}
            setFilter={setFilter}
            />
            ))}
        </div>

        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading">
            {tasks.filter(FILTER_MAP[filter]).map((task) => (
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
  )
}

export default App;
