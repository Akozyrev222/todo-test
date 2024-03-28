import React, {useEffect} from 'react';
import './App.css';
import Todo from "./components/Todo";
import {fetchTodos} from "./store/todo-actions";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";
import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

function App() {
    const dispatch = useAppDispatch()
    const allTodos = useAppSelector(state => state.todo.all_todos)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        allTodos.length !== 0 ?
            <Todo/>
            :
            <Flex justify='center' style={{marginTop: '24px'}}>
                <Spin indicator={<LoadingOutlined style={{fontSize: 100}} spin/>}/>
            </Flex>
    );
}

export default App;
