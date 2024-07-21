import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";

import {useState, useRef, useEffect} from "react";

// Remembers components and the App() will re-render with changes in state as expected.
// All constants should be defined outside the App() to ensure they retain their values all the time.
const FILTER_MAP = {
    All: ()=> true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
}

const FILTER_NAMES =Object.keys(FILTER_MAP)

import {useTodoContext} from "./todoContext.jsx";

function App() {
    // Manage tasks.
    const {tasks, usePrevious} = useTodoContext()

    // Filter task based on completion status. Initial state displays all tasks
    const [filter, setFilter] = useState("All");

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
        <Form/>
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
            editTask={editTask}
            />
            ))}
        </ul>
    </div>
  )
}

export default App
