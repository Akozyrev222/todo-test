import Api from "./Api";
import {TodoModel} from "../models/redux-models";

export default {
    async getAllTodos() {
        const response = await Api().get('todos');
        return response.data.todos
    },
    async putToggleCompleted(todo_id: number, completed: boolean) {
        try {
            const response = await Api().put(`todos/${todo_id}`,
                {
                    completed
                }
            )
            return response
        } catch (error) {
            console.error(error)
        }
    },
    async putToggleTodo(todo: Omit<TodoModel, 'completed'>) {
        try {
            const response = await Api().put(`todos/${todo.id}`,
                {
                    todo: todo.todo,
                    userId: todo.userId
                }
            )
            return response
        } catch (error) {
            console.error(error)
        }
    },
    async deleteToggleTodo(id: number) {
        try {
            const response = await Api().delete(`todos/${id}`)
            return response
        } catch (error) {
            console.error(error)
        }
    },
    async postToggleTodo(todo: Omit<TodoModel, 'id'>) {
        try {
            const response = await Api().post(`todos/add`,
                todo
            )
            return response
        } catch (error) {
            console.error(error)
        }
    },
}