const SET_TEXT = 'SET_TEXT';
const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const START_EDITING = 'START_EDITING';
const SAVE_EDIT = 'SAVE_EDIT';

export const initialState = {
  text: '',
  todos: [],
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_TEXT:
      return { ...state, text: action.payload }
    case SET_TODOS:
      return { ...state, todos: action.payload }
    case ADD_TODO:
      return { ...state, todos: [action.payload, ...state.todos] }
    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        )
      }
    case START_EDITING:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isEditing: true } : todo
        ),
      }
    case SAVE_EDIT:
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

export const setTextActionCreator = (text) => ({ type: SET_TEXT, payload: text });
export const setTodosActionCreator = (todos) => ({ type: SET_TODOS, payload: todos });
export const addTodoActionCreator = (todo) => ({ type: ADD_TODO, payload: todo });
export const removeTodoActionCreator = (id) => ({ type: REMOVE_TODO, payload: id });
export const updateTodoActionCreator = (id, completed) => ({ type: UPDATE_TODO, payload: { id, completed } });
export const startEditingActionCreator = (id) => ({ type: START_EDITING, payload: id });
export const saveEditActionCreator = (id, newTitle) => ({ type: SAVE_EDIT, payload: { id, newTitle } });
