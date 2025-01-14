import { useEffect, useReducer } from 'react'
import { MyContext } from './context/context'
import './App.css'
import Todos from './components/Todos/Todos'
import Input from './components/Input/Input'

const initialState = {
  text: '',
  todos: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, text: action.payload }
    case 'SET_TODOS':
      return { ...state, todos: action.payload }
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos] }
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) }
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        )
      }
    case 'START_EDITING':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isEditing: true } : todo
        ),
      }
    case 'SAVE_EDIT':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.newTitle, isEditing: false }
            : todo
        ),
      }
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then((res) => res.json())
      .then((res) => dispatch({ type: 'SET_TODOS', payload: res }))
  }, [])

  const changeText = (e) => {
    dispatch({ type: 'SET_TEXT', payload: e.target.value })
  }

  const addTodo = () => {
    if (!state.text.trim()) {
      return
    }

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          "userId": 1,
          "title": state.text,
          "completed": false
        }
      )
    }).then((res) => res.json())
      .then((res) => dispatch({ type: 'ADD_TODO', payload: res }))
  }

  const remove = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    }).then(() => dispatch({ type: 'REMOVE_TODO', payload: id }))
  }

  const change = (id, completed) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          completed: !completed
        }
      )
    }).then((res) => res.json())
      .then((updatedTodo) => {
        dispatch({
          type: 'UPDATE_TODO',
          payload: { id, completed: updatedTodo.completed },
        })
      });
  }

  const startEditing = (id) => {
    dispatch({ type: 'START_EDITING', payload: id })
  }

  const saveEdit = (id, newTitle) => {
    dispatch({ type: 'SAVE_EDIT', payload: { id, newTitle } })
  }

  return (
    <MyContext.Provider value={{
      state,
      dispatch,
      change,
      startEditing,
      saveEdit,
      addTodo,
      changeText
    }}>
      <div className='App'>
        <h1>My To Do List</h1>
        <div className='todo'>
          <Input/>
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
