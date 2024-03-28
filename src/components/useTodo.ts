import {useState} from "react";
import {addToggleTodo, deleteToggleTodo, fetchToggleCompleted, fetchToggleTodo} from "../store/todo-actions";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {Form, FormInstance} from "antd";
import {TodoModel} from "../models/redux-models";

type useTodoType = {
    allTodos: TodoModel[],
    form: FormInstance<any>
    newTodo: FormInstance<any>
    editingID: number | null
    edit: (record: Partial<TodoModel> & { id: number }) => void
    deleteTodo: (id: number) => void
    cancel: () => void
    save: (id: number) => Promise<void>
    isEditing: (record: TodoModel) => boolean
    handleSubmit: () => void
    handleSelect: (id: number, completed: boolean) => void
}
export const useTodo = (): useTodoType => {

    const dispatch = useAppDispatch()
    const allTodos = useAppSelector(state => state.todo.all_todos)
    const [form] = Form.useForm();
    const [newTodo] = Form.useForm();
    const [editingID, setEditingID] = useState<number | null>(null);
    const isEditing = (record: TodoModel) => record.id === editingID;

    const edit = (record: Partial<TodoModel> & { id: number }) => {
        form.setFieldsValue({userId: '', todo: '', ...record});
        setEditingID(record.id);
    };
    const deleteTodo = (id: number) => {
        dispatch(deleteToggleTodo(id))
    };
    const cancel = () => {
        setEditingID(null);
    };

    const save = async (id: number) => {
        const row = await form.getFieldsValue() as TodoModel
        if (row.userId && row.todo) {
            dispatch(fetchToggleTodo({...row, id}))
            setEditingID(null)
        }
    };
    const handleSubmit = () => {
        const todo = newTodo.getFieldsValue()
        dispatch(addToggleTodo({
            ...todo,
            completed: false
        }))
        newTodo.resetFields()
    }
    const handleSelect = (id: number, completed: boolean) => {
        dispatch(fetchToggleCompleted(id, !completed))
    }

    return {
        allTodos,
        form,
        newTodo,
        editingID,
        edit,
        cancel,
        save,
        deleteTodo,
        isEditing,
        handleSubmit,
        handleSelect
    }
}