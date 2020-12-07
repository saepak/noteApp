import { gql } from '@apollo/client'

export const GET_TODOS = gql`
    {
        todos {
            id 
            item
        }
    }
`
export const ADD_TODO = gql`
  mutation AddTodo($id: String!, $item: String!) {
    addTodo(id: $id, item: $item) {
      id
      item
    }
  }
`
export const UPDATE_TODO = gql`
    mutation UpdateTodo(
        $id: String!
        $item: String!
        $completed : Boolean!
    ){
        updateTodo(id:$id, item: $item){
            id
            item
        }
    }
`

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id) {
      id
      item
    }
  }
`