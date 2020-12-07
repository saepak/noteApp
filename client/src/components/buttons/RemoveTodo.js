import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'
import { GET_TODOS, REMOVE_TODO } from '../../graphql/queries'

const RemoveTodo= ({id, item, completed}) => {

    const [removeTodo] = useMutation(REMOVE_TODO, {
        update(proxy, {data: {removeTodo}}) {
            const {todos} = proxy.readQuery({query: GET_TODOS})
            proxy.writeQuery({
                query: GET_TODOS,
                data: {
                    todos: filter(todos, c => {
                        return c.id !== removeTodo.id
                    })
                }
            })
        }
    })


const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this task?')
    if (result) {
      removeTodo({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeTodo: {
            __typename: 'Contact',
            id,
            item,
            completed
          }
        }
      })
    }
  }


    return (
        <DeleteOutlined 
            key='delete'
            style={{color: 'red'}}
            onClick={handleButtonClick}
        />
    )
}

export default RemoveTodo