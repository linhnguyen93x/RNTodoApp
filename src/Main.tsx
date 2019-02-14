import AppButton from 'components/AppButton'
import * as React from 'react'
import {Text, View} from 'react-native'


interface State {
  message: string
  count: number
}

export default class Main extends React.Component<{}, State> {
  state = {
    message: 'this is a typescript counter',
    count: 0,
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        <Text>{this.state.message}</Text>

        <Text>Count: {this.state.count}</Text>

        <AppButton
          title={'increment'}
          onPress={() => this.setState({count: this.state.count + 1})}
        />
      </View>
    )
  }
}
