/*
* This React app is not heavily nested with multiple components. Prop drilling is only utilized on one level.
*
* ContextAPI had been illustrated with task state, usePrevious custom hook and addTask helper function.
* */

import {createContext, useContext, useEffect, useRef, useState} from "react";
import {dummyTasks} from "./dummyTasks.js";


// install "npm install nanoid"
// nanoid is used to generate unique ids for every new task added
import {nanoid} from "nanoid";

const TodoContext = createContext({

});


function usePrevious(value){
    // this hook prevents edit button selection on initial loading by storing previous edit state.
    // initially wasEditing should be false
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current
    }

export default function TodoContextProvider({ children }) {
    // Manage tasks
    const [tasks, setTasks] = useState(dummyTasks);

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

     const ctxValue =
         {
             tasks:tasks,
             setTasks:setTasks,
             usePrevious:usePrevious,
             addTask: addTask,
         };
    return (
        <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    return useContext(TodoContext)
}