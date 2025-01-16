import axios from 'axios';
import { addTodoActionCreator, removeTodoActionCreator, saveEditActionCreator, setTodosActionCreator, updateTodoActionCreator } from '../store/store';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/todos'
})

export const API = {
    getTodos(dispatch) {
        instance.get('?_limit=3')
            .then((res) => dispatch(setTodosActionCreator(res.data)))
    },

    addTodo(dispatch, title) {
        instance.post('', {
            userId: 1,
            title,
            completed: false
        })
            .then((res) => dispatch(addTodoActionCreator(res.data)))
    },

    removeTodo(dispatch, id) {
        instance.delete(`/${id}`)
            .then(() => dispatch(removeTodoActionCreator(id)))
    },

    changeTodo(dispatch, id, completed) {
        instance.patch(`/${id}`, { completed: !completed })
            .then((res) => {
                dispatch(updateTodoActionCreator(id, res.data.completed))
            })
    },

    saveEdit(dispatch, id, newTitle) {
        instance.put(`/${id}`, { title: newTitle })
            .then((res) => dispatch(saveEditActionCreator(id, res.data.title)))
    }
}