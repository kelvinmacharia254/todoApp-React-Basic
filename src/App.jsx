import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import FilterButton from "./components/FilterButton.jsx";
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

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form/>
        <div className="filters btn-group stack-exception">
            <FilterButton/>
            <FilterButton/>
            <FilterButton/>
        </div>


      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {/*<Todo name="Eat" id="todo-0" completed/>*/}
        {/*<Todo name="Sleep" id="todo-1"/>*/}
        {/*<Todo name="Repeat" id="todo-2"/>*/}
        {props.tasks?.map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
        />
    ))}
      </ul>
    </div>
  );
}

export default App;
