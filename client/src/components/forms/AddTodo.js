import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import {ADD_TODO, GET_TODOS} from '../../graphql/queries'



const AddTodo = () => {
    const [id] = useState(uuidv4())
    const [addTodo] = useMutation(ADD_TODO)
  
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
  
    // To disable submit button at the beginning.
    useEffect(() => {
      forceUpdate({})
    }, [])
  
    const onFinish = values => {
      const { item } = values
  
      addTodo({
        variables: {
          id,
          item
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addTodo: {
            __typename: 'Todo',
            id,
            item
          }
        },
        update: (proxy, { data: { addTodo } }) => {
          const data = proxy.readQuery({ query: GET_TODOS })
          proxy.writeQuery({
            query: GET_TODOS,
            data: {
              ...data,
              todos: [...data.todos, addTodo]
            }
          })
        }
      })
    }
  
    return (
      <Form
        form={form}
        name='add-todo-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px' }}
      >
        <Form.Item
          name='item'
          rules={[{ required: true, message: 'Please input your task!' }]}
        >
          <Input placeholder='input your task' />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
            >
              Add Todo
            </Button>
          )}
        </Form.Item>
      </Form>
    )
  }
  
  export default AddTodo