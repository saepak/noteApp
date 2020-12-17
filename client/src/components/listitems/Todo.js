import React,{ useState } from 'react'
import RemoveTodo from '../buttons/RemoveTodo'
import { Card } from 'antd'
import { EditOutlined} from '@ant-design/icons'

import UpdateTodo from '../forms/UpdateTodo'


const getStyles = () => ({
    card : {
        width: '100%'
    }
})

const Todo = (props) => {
    const [id] = useState(props.id)
    const [item, setItem] = useState(props.item)
    const [editMode, setEditMode] = useState(false)

    const styles = getStyles()

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const items = () => {
        return `${item}`
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
                    {items()}
                </Card>
            )}
        </div>
    )

}

export default Todo