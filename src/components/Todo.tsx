import {Flex, Form, Popconfirm, Space, Table, Typography} from "antd";
import {TodoModel} from "../models/redux-models";
import CustomForm from "./Form/CustomForm";
import ProgressBar from "./ProgressBar/ProgressBar";
import {EditableCell} from "./EditableCell/EditableCell";
import {useTodo} from "./useTodo";


const Todo = () => {

    const {
        allTodos,
        newTodo,
        form,
        editingID,
        cancel,
        save,
        edit,
        deleteTodo,
        isEditing,
        handleSubmit,
        handleSelect
    } = useTodo()


    const columns = [
        {
            title: 'UserID',
            dataIndex: 'userId',
            editable: true,
        },
        {
            title: 'TODO',
            dataIndex: 'todo',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: TodoModel) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Space>
                        <Typography.Link disabled={editingID !== null} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Typography.Link onClick={() => deleteTodo(record.id)}>
                            Delete
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: TodoModel) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Flex style={
                {
                    margin: '24px', display: 'grid',
                    gridAutoFlow: 'column',
                    gridColumnGap: '25px'
                }
            }
                  justify='center'
                  align='center'
            >
                <CustomForm handleSubmit={handleSubmit} newTodo={newTodo}/>
                <ProgressBar allTodos={allTodos}/>
            </Flex>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowKey={(record) => record.id}
                bordered
                dataSource={allTodos}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                rowSelection={{
                    hideSelectAll: true,
                    selectedRowKeys: allTodos.filter(todo => todo.completed).map(todo => todo.id),
                    onSelect: (record) => {
                        handleSelect(record.id, record.completed)
                    }
                }}
            />
        </Form>
    );
};
export default Todo