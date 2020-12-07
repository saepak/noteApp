import React,{ useState } from 'react'
import RemoveTodo from '../buttons/RemoveTodo'
import { Card, Button } from 'antd'
import { EditOutlined, CheckCircleFilled, CheckCircleTwoTone } from '@ant-design/icons'

import UpdateTodo from '../forms/UpdateTodo'


const getStyles = () => ({
    card : {
        width: '500px'
    }
})

const Todo = (props) => {
    const [id] = useState(props.id)
    const [item, setItem] = useState(props.item)
    const [completed, setCompleted] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const styles = getStyles()

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'item':
              setItem(value)
              break
            default:
              break
          }
    }

    const checkCompleted = () => {
        if (completed) {
            return setCompleted(false)
        } else {
            return setCompleted(true)
        }
    }

    return (
        <div>
            {editMode? (
                <UpdateTodo
                    id={props.id}
                    item={props.item}
                    onbuttonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    id={props.id}
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveTodo id={id} item={item} />
                    ]}
                >
                    <Button 
                        type="link"
                        onClick={checkCompleted}
                    >
                        {completed ? <CheckCircleTwoTone twoToneColor="#c9c9c9" /> : <CheckCircleFilled />}
                    </Button>
                    {item}
                </Card>
            )}
        </div>
    )

}

export default Todo