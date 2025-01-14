import { useContext } from 'react';
import { MyContext } from '../../context/context';
import './Input.css'

const Input = () => {
  const { changeText, addTodo, state } = useContext(MyContext);

  return (
    <div>
      <input value={state.text} onChange={changeText} />
      <button onClick={addTodo}>+</button>
    </div>
  )
}

export default Input