import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import Todos from './components/lists/Todos'
import AddTodo from './components/forms/AddTodo'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
