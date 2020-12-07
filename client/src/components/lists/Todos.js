import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from '../../graphql/queries'
import { List } from 'antd'

import Todo from '../listitems/Todo'


const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Todos = () => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_TODOS)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    console.log('data', data)

    return (
        <List grid={{ gutter: 20, column:1}} style={styles.list}>
            {data.todos.map( ({id, item, completed}) => (
                <List.Item key={id}>
                    <Todo
                        key={id}
                        id={id}
                        item={item}
                        completed={completed}
                    />
                </List.Item>
            ) )}
        </List>
    )
}

export default Todos