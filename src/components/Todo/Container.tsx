import { TodoContextProvider, TodoItem, TodoState } from 'contexts'
import * as React from 'react'
import { View } from 'react-native'
import { AddInput } from './AddInput'
import { List } from './List'

export class Container extends React.Component<any, TodoState> {
  state: TodoState = {
    todos: [
      {
        id: 1,
        name: 'Bi',
        done: false,
      },
      {
        id: 2,
        name: 'Jenny',
        done: true,
      },
    ],
  }

  addTodo = (name: string) => {
    const lastItem = this.state.todos.slice(-1)[0]
    const newTodo: TodoItem = {
      name,
      id: lastItem ? lastItem.id + 1 : 0,
      done: false,
    }

    this.setState(prev => ({
      todos: [...prev.todos, newTodo],
    }))
  }

  deleteTodo = (id: number) => {
    const index = this.state.todos.findIndex(item => item.id === id)

    this.setState(prev => ({
      todos: [...prev.todos.slice(0, index), ...prev.todos.slice(index + 1)],
    }))
  }

  toggleAll = () => {
    // console.log('toggle')
  }

  render() {
    return (
      <TodoContextProvider
        value={{
          todos: this.state.todos,
          addTodo: this.addTodo,
          deleteTodo: this.deleteTodo,
          toggleAll: this.toggleAll,
        }}
      >
        <View style={{ paddingTop: 40, alignSelf: 'stretch' }}>
          <AddInput />
          <List />
        </View>
      </TodoContextProvider>
    )
  }
}
