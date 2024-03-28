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
            console.log(response)
            return response.data
        }catch (error){
            console.error(error)
        }
    }
}