import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/todos'
})

export const API = {
    getTodos(dispatch) {
        instance.get('?_limit=3')
            .then((res) => dispatch({ type: 'SET_TODOS', payload: res.data }))
    },

    addTodo(dispatch, title) {
        instance.post('', {
            userId: 1,
            title,
            completed: false
        })
            .then((res) => dispatch({ type: 'ADD_TODO', payload: res.data }))
    },

    removeTodo(dispatch, id) {
        instance.delete(`/${id}`)
            .then(() => dispatch({ type: 'REMOVE_TODO', payload: id }))
    },

    changeTodo(dispatch, id, completed) {
        instance.patch(`/${id}`, { completed: !completed })
            .then((res) => {
                dispatch({
                    type: 'UPDATE_TODO',
                    payload: { id, completed: res.data.completed }
                })
            })
    },

    saveEdit(dispatch, id, newTitle) {
        instance.put(`/${id}`, { title: newTitle })
            .then((res) => dispatch({
                type: 'SAVE_EDIT',
                payload: { id, newTitle: res.data.title }
            }))
    }
}