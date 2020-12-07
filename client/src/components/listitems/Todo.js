import React,{ useState } from 'react'

import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'


const getStyles = () => ({
    card : {
        width: '500px'
    }
})

const Contact = (props) => {
    const [id] = useState(props.id)
    const [item, setItem] = useState(props.item)
    const [completed, setCompleted] = useState(props.completed)
    const [editMode, setEditMode] = useState(false)

    const styles = getStyles()

    return (
        <div>
            <Card
                id={props.id}
                style={styles.card}
            >
                {item}
            </Card>
        </div>
    )

}

export default Contact