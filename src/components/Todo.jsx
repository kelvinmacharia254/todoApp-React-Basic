import {useState, useRef, useEffect} from "react";


function usePrevious(value){
    // this hook prevents edit button selection on initial loading by storing previous edit state.
    // initially wasEditing should be false
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current
}
function Todo(props){
    // use this state to determine whether to edit or display a task using the edit and view template
    const [isEditing, setIsEditing] = useState(false);
    // manage state of new name with two-way binding
    const [newName, setNewName] = useState("");

    // Access DOM of HTML elements to determine when to focus on each
    const editFieldRef = useRef(null); //
    const editButtonRef = useRef(null);

    // custom usePrevious hook. Prevent edit button selection on initial app load
    const wasEditing = usePrevious(isEditing);

    function handleChange(e){
        setNewName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("")
        setIsEditing(false);
    }

    const editingTemplate = (
              <form className="stack-small" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                  </label>
                  <input
                      id={props.id}
                      className="todo-text"
                      type="text"
                      value={newName}
                      onChange={handleChange}
                      ref={editFieldRef}
                  />
                </div>
                <div className="btn-group">
                  <button type="button" className="btn todo-cancel" onClick={()=> setIsEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                  </button>
                  <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                  </button>
                </div>
              </form>
                );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button
              type="button"
              className="btn"
              onClick={() => setIsEditing(true)}
              ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}>
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
      </div>
    );
    // set focus on input in task edit mode and edit button in view mode
    useEffect(() => {
        if (!wasEditing && isEditing){
            editFieldRef.current.focus()
        }else if(wasEditing && !isEditing){
            editButtonRef.current.focus()
        }
    }, [isEditing]);

    return (
        <li className="todo stack-small">
            {isEditing? editingTemplate : viewTemplate}
        </li>
    )
}


export default Todo;