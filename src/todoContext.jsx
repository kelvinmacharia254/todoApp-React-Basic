import {createContext, useContext, useState} from "react";
import {dummyTasks} from "./dummyTasks.js";


const TodoContext = createContext({

});

export default function TodoContextProvider({ children }) {
    // Manage tasks
    const [tasks, setTasks] = useState(dummyTasks);

     const ctxValue =
         {
             tasks:tasks,
             setTasks:setTasks
         };
    return (
        <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    return useContext(TodoContext)
}