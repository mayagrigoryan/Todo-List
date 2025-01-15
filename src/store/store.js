export const initialState = {
    text: '',
    todos: [],
}

export function reducer(state, action) {
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