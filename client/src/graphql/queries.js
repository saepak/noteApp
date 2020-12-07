import { gql } from '@apollo/client'

export const GET_TODOS = gql`
    {
        todos {
            id 
            item
            completed
        }
    }
`
export const ADD_TODO = gql`
    mutation AddTodo($id: String!, $item: String!, $completed: Boolean!) {
        addTodo(id: $id, item: $item, completed: $completed){
            id
            item
            completed
        }
    }
`
export const UPDATE_TODO = gql`
    mutation UpdatedTodo(
        $id: String!
        $item: String!
        $completed : Boolean!
    ){
        updateTodo(id:$id, item: $item, completed: $completed){
            id
            item
            completed
        }
    }
`