import todoSlice from "./todo-slice";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {TodoModel} from "../models/redux-models";
import {RootState} from "./index";
import TodoService from "../service/todo-service";

export const todoActions = todoSlice.actions

export const fetchTodos = (): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch, getState) => {
        if (getState().todo.all_todos.length === 0) {
            const response = await TodoService.getAllTodos();
            dispatch(todoActions.setTodos(response))
        }
    }
}
export const fetchToggleCompleted = (todo_id: number, completed: boolean): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch) => {
        dispatch(todoActions.toggleTodoCompleted({id: todo_id, completed}))
        const response = await TodoService.putToggleCompleted(todo_id, completed)
        console.log(response)
    }
}
export const fetchToggleTodo = (todo: Omit<TodoModel, 'completed'>): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch) => {
        dispatch(todoActions.toggleTodo(todo))
        const response = await TodoService.putToggleTodo(todo)
        console.log(response)
    }
}
export const deleteToggleTodo = (id: number): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch) => {
        dispatch(todoActions.deleteTodo(id))
        const response = await TodoService.deleteToggleTodo(id)
        console.log(response)
    }
}
export const addToggleTodo = (todo: Omit<TodoModel, 'id'>): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch) => {
        const response = await TodoService.postToggleTodo(todo)
        if (response) {
            dispatch(todoActions.addTodo(response.data))
        }
        console.log(response)
    }
}


