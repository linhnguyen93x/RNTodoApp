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

      ctx.addTodo(this.state.value)
    }
  }

  render() {
    return (
      <TextInput
        value={this.state.value}
        onChangeText={value => this.setState({ value })}
        placeholder="Your todo..."
        onSubmitEditing={this.addNewTodo}
      />
    )
  }
}

export const AddInput = withTodoContext(AddInputComponent)
