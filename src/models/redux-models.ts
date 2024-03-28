export interface TodoModel {
    "id": number,
    "todo": string,
    "completed": boolean,
    "userId": number
}

export interface TodoArrayModel {
    all_todos: TodoModel[]
    particular_todo: TodoModel
}