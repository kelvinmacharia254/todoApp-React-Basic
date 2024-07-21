/*
* This React app is not heavily nested with multiple components. Prop drilling is only utilized on one level.
*
* ContextAPI had been illustrated with task state, usePrevious custom hook and addTask helper function.
* */

import {createContext, useContext, useEffect, useRef, useState, useReducer} from "react";
import {initialTasks} from "./initialTasks.js";


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

function tasksReducer(state, action) {
    switch(action.type){
        case "ADD-TASK":
            const newTask = {id:`todo-${nanoid()}`, name: action.payload, completed: false};
            const updatedTasks = [...state, newTask]
            console.log(updatedTasks)
            return updatedTasks
    }
}

export default function TodoContextProvider({ children }) {
    // Manage tasks
    // const [tasks, setTasks] = useState(initialTasks);
    const [tasks, tasksDipatch] = useReducer(tasksReducer, initialTasks)

    function addTask(name){
        tasksDipatch({type:"ADD-TASK", payload: name})
    }

     const ctxValue =
         {
             tasks:tasks,
             // setTasks:setTasks,
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
