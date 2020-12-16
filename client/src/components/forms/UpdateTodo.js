import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import { UPDATE_TODO } from '../../graphql/queries'


const getStyle = () => ({
    form: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 20
    },
    formText: {
      height: 50
    },
    formBtn: {
      height: 50,
      marginLeft: 10
    }
  })

const UpdateTodo = (props) => {

    const styles = getStyle()

    const [id] = useState(props.id)
    const [item, setItem] = useState(props.item)
    const [updateTodo] = useMutation(UPDATE_TODO)
  
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = (values) => {
        const { item } = values
        updateTodo({
            variables: {
                id,
                item
            },
            optimisticResponse: {
                __typename: 'Mutation',
                updateTodo: {
                    __typename: 'Todo',
                    id,
                    item
                }
            }
        })
        props.onButtonClick()
    }   

    return (
        <Form
            form={form}
            style={styles.form}
            name='update-todo-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                item: item
            }}
            size='large'
        >
            <Form.Item
                name='item'
                rules={[{ required: true, message: 'Please input your task!' }]}
            >
                <Input
                    style={styles.formText}
                    onChange={e => props.updateStateVariable('item', e.target.value)}
                    placeholder='input your task'
                />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        style={styles.formBtn}
                        type='primary'
                        htmlType='submit'
                    >
                        Update Todo
                    </Button>
                )}
            </Form.Item>
            <Button style={styles.formBtn} onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}


export default UpdateTodo
