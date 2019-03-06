import { TodoContextType, withTodoContext } from 'contexts'
import * as React from 'react'
import { TextInput } from 'react-native'

interface Prop {
  ctx: TodoContextType
}

interface State {
  value: string
}

class AddInputComponent extends React.Component<Prop, State> {
  state = {
    value: '',
  }

  addNewTodo = () => {
    if (this.state.value) {
      const { ctx } = this.props

      this.setState({
        value: '',
      })
      ctx.addTodo(this.state.value)
    }
  }

  render() {
    return (
      <TextInput
        style={{
          marginHorizontal: 16,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 4,
        }}
        value={this.state.value}
        onChangeText={value => this.setState({ value })}
        placeholder="Your todo..."
        onSubmitEditing={this.addNewTodo}
      />
    )
  }
}

export const AddInput = withTodoContext(AddInputComponent)
