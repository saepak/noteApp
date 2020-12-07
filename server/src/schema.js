import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'


const todos = [
    {
        id: '1',
        item: 'Analyze the survey results',
    },
    {
        id: '2',
        item: 'Publish an article',
    },
    {
        id: '3',
        item: 'Learn to use lodash',
    },
]

const typeDefs = gql`
    type Todo {
        id: String!
        item: String
    }

    type Query {
        todo(id: String!): Todo
        todos: [Todo]
    }

    type Mutation {
        addTodo(id: String!, item: String!): Todo
        updateTodo(id: String!, item: String!): Todo
        removeTodo(id: String!): Todo
    }
`

const resolvers = {
    Query: {
        todos: () => todos,
        todo(parent, args, context, info){
            return find(todos, {id:args.id})
        }
    },
    Mutation: {
        addTodo: (root, args) => {
            const newTodo = {
                id: args.id,
                item: args.item,
            }
            todos.push(newTodo)
            return newTodo
        },
        updateTodo: (root, args) => {
            const todo = find(todos, {id: args.id})
            if(!todo) {
                throw new Error(`Couldn't find todo with id ${args.id}`)
            }
            todo.item = args.item
            return todo
        },
        removeTodo: (root, args) => {
            const removedTodo = find(todos, {id: args.id})
            if(!removedTodo) {
                throw new Error(`Couldn't find todo with id ${args.id}`)
            }
            remove(todos, c  => {
                return c.id === removedTodo.id
            })
            return removedTodo
        }
    }

}

export { typeDefs, resolvers }
