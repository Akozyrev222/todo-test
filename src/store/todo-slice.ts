import {TodoArrayModel, TodoModel} from "../models/redux-models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialTodoState: TodoArrayModel = {
    all_todos: [],
    particular_todo: {
        "id": 0,
        "todo": '',
        "completed": false,
        "userId": 0
    }
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        setTodos(state, action: PayloadAction<TodoModel[]>) {
            state.all_todos = action.payload
        },
        toggleTodoCompleted(state, action: PayloadAction<Omit<TodoModel, 'userId' | 'todo'>>) {
            state.all_todos = state.all_todos.map(obj => obj.id === action.payload.id ? {
                ...obj,
                completed: action.payload.completed
            } : obj)
        },
        toggleTodo(state, action: PayloadAction<Omit<TodoModel, 'completed'>>) {
            state.all_todos = state.all_todos.map(obj => obj.id === action.payload.id ? {
                ...obj,
                todo: action.payload.todo,
                userId: action.payload.userId
            } : obj)
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.all_todos = state.all_todos.filter(obj => obj.id !== action.payload)
        },
        addTodo(state, action: PayloadAction<TodoModel>) {
            state.all_todos = [...state.all_todos, action.payload]
        }
    }
})
export default todoSlice