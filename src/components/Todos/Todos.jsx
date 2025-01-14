import { useContext } from 'react'
import { MyContext } from '../../context/context'
import './Todos.css'

const Todos = (props) => {
    const { change, startEditing, saveEdit, remove } = useContext(MyContext);

    const DoubleClick = () => {
        startEditing(props.todo.id)
    }

    const handleBlur = (e) => {
        if (e.target.value.trim()) {
            saveEdit(props.todo.id, e.target.value)
        } else {
            saveEdit(props.todo.id, props.todo.title)
        }
    }

    return (
        <li>
            <input type={'checkbox'} checked={props.todo.completed} onChange={() => change(props.todo.id, props.todo.completed)} />
            {props.todo.isEditing ? (
                <input
                    type="text"
                    defaultValue={props.todo.title}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={DoubleClick}>{props.todo.title}</span>
            )}
            <button onClick={() => remove(props.todo.id)}>x</button>
        </li>
    )
}

export default Todos