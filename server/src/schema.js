import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'


const todos = [
    {
        id: '1',
        item: 'Analyze the survey results',
        completed: false,
    },
    {
        id: '2',
        item: 'Publish an article',
        completed: false,
    },
    {
        id: '3',
        item: 'Learn to use lodash',
        completed: false,
    },
]

const typeDefs = gql`
    type Todo {
        id: String!
        item: String
        completed: Boolean!
    }

    type Query {
        todo(id: String!): Todo
        todos: [Todo]
    }

    type Mutation {
        addTodo(id: String!, item: String!, completed: Boolean!): Todo
        updateTodo(id: String!, item: String!, completed: Boolean!): Todo
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
                completed: args.completed
            }
            todos.push(newTodo)
            return newTodo
        },
        updateTodo: (root, args) => {
            const todo = find(todos, {id: args.id})
            if(!todo) {
                throw new Error(`Couldn't find todo with id ${argd.id}`)
            }
            todo.item = args.item
            todo.completed = args.completed
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
