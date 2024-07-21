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
        case "ADD-TASK":{
            const newTask = {id:`todo-${nanoid()}`, name: action.payload, completed: false};
            let updatedTasks = [...state, newTask]
            console.log(updatedTasks)
            return updatedTasks}
        case "TOGGLE-TASK-STATUS": {
            let updatedTasks = action.payload.tasks.map((task) =>{
            // if this task has the same ID as the target task, invert completion status boolean
            if(task.id === action.payload.id){
                return {...task, completed: !task.completed};
            }
            return task
            })
            return updatedTasks }
        case "DELETE-TASK":
            const remainingTasks = action.payload.tasks.filter((task) => action.payload.id !== task.id);
            return remainingTasks
    }
}

export default function TodoContextProvider({ children }) {
    // Manage tasks
    // const [tasks, setTasks] = useState(initialTasks);
    const [tasks, tasksDipatch] = useReducer(tasksReducer, initialTasks)

    function addTask(name){
        tasksDipatch({type:"ADD-TASK", payload: name})
    }

    function toggleTaskCompleted(id){
        // update task completion status.
        // update tasks completion status depending on the status of the checkbox.
        // Note: This step is syncing the app with the UI i.e. synchronizing the browser with the underlying state data
        tasksDipatch({type:"TOGGLE-TASK-STATUS", payload:{id: id, tasks:tasks}})
    }

    function deleteTask(id){
        // delete task using filter function
        tasksDipatch({type:"DELETE-TASK", payload:{id: id, tasks:tasks}})
    }

     const ctxValue =
         {
             tasks:tasks,
             // setTasks:setTasks,
             toggleTaskCompleted: toggleTaskCompleted,
             deleteTask: deleteTask,
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
