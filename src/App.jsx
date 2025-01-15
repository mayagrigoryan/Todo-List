import { useEffect, useReducer } from 'react'
import { MyContext } from './context/context'
import { API } from './api/api'
import { reducer, initialState } from './store/store'
import './App.css'

import Todos from './components/Todos/Todos'
import Input from './components/Input/Input'

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    API.getTodos(dispatch)
  }, [])

  const changeText = (e) => {
    dispatch({ type: 'SET_TEXT', payload: e.target.value })
  }

  const addTodo = () => {
    if (!state.text.trim()) {
      return
    }

    API.addTodo(dispatch, state.text)
  }

  const remove = (id) => {
    API.removeTodo(dispatch, id)
  }

  const change = (id, completed) => {
    API.changeTodo(dispatch, id, completed)
  }

  const startEditing = (id) => {
    dispatch({ type: 'START_EDITING', payload: id })
  }

  const saveEdit = (id, newTitle) => {
    API.saveEdit(dispatch, id, newTitle)
  }

  return (
    <MyContext.Provider value={{
      state,
      dispatch,
      change,
      startEditing,
      saveEdit,
      addTodo,
      changeText,
      remove
    }}>
      <div className='App'>
        <h1>My To Do List</h1>
        <div className='todo'>
          <Input />
          <div>
            {state.todos.map((todo) => (
              <Todos
                key={todo.id}
                todo={todo}
                remove={() => remove(todo.id)}
              />
            ))
            }
          </div>
        </div>
      </div>
    </MyContext.Provider>
  )
}

export default App