import { TodoContextProvider, TodoItem, TodoState } from 'contexts'
import { FirebaseConnect } from 'firestore'
import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, ButtonGroup } from 'react-native-elements'
import { Index, TodoItemRequest } from './+model'
import { AddInput } from './AddInput'
import { List } from './List'

interface State extends TodoState {
  isFetching: boolean
}

export class Container extends React.Component<{}, State> {
  state: State = {
    isFetching: false,
    selectedIndex: Index.All,
    todos: [],
  }

  fb = FirebaseConnect.Instance

  componentDidMount() {
    this.setState({
      isFetching: true,
    })
    this.fb.getTodo().then(todos => this.setState({ todos, isFetching: false }))
  }

  addTodo = (name: string) => {
    const newTodo: TodoItemRequest = {
      name,
      done: false,
    }

    this.fb.saveTodo(newTodo).then((res) => {
      if (res.key) {
        this.setState(prev => ({
          todos: [...prev.todos, { ...newTodo, id: res.key } as TodoItem],
        }))
      }
    })
  }

  deleteTodo = (id: string) => {
    this.fb.deleteTodo(id).then(() => {
      const index = this.state.todos.findIndex(item => item.id === id)

      this.setState(prev => ({
        todos: [...prev.todos.slice(0, index), ...prev.todos.slice(index + 1)],
      }))
    })
  }

  toggleAll = () => {
    const { todos } = this.state
    const allDone = todos.every(item => item.done)
    const updatedItem = this.state.todos.map(item =>
      Object.assign({}, item, { done: !allDone })
    )

    this.fb.toggleTodo(updatedItem).then(() => {
      this.setState({
        todos: updatedItem,
      })
    })
  }

  updateStatus = (id: string) => {
    const { todos } = this.state
    const index = todos.findIndex(item => item.id === id)
    const updatedItem = { ...todos[index], done: !todos[index].done }

    this.fb.updateTodo(updatedItem).then(() => {
      this.setState({
        todos: Object.assign([], todos, { [index]: updatedItem }),
      })
    })
  }

  updateIndex = (selectedIndex: number) => {
    this.setState({ selectedIndex })
  }

  render() {
    const buttons = Object.keys(Index)
      .filter((value: string) => !isNaN(Number(value)))
      .map((key: any) => Index[key])

    return (
      <TodoContextProvider
        value={{
          selectedIndex: this.state.selectedIndex,
          todos: this.state.todos,
          addTodo: this.addTodo,
          deleteTodo: this.deleteTodo,
          toggleAll: this.toggleAll,
          updateTodoStatus: this.updateStatus,
          updateSelectedIndex: this.updateIndex,
        }}
      >
        <View style={{ flex: 1, paddingTop: 40, alignSelf: 'stretch' }}>
          <View style={{ flex: 1 }}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40, marginLeft: 0, marginRight: 0 }}
            />
            <AddInput />
            {!this.state.isFetching ? (
              <List />
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>

          <View
            style={{
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: '#e6e6e6',
            }}
          >
            <Button title="Toggle All" onPress={this.toggleAll} />
          </View>
        </View>
      </TodoContextProvider>
    )
  }
}
