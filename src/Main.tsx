import Todo from 'components/Todo'
import * as React from 'react'
import { View } from 'react-native'

const Main = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
    }}
  >
    <Todo />
  </View>
)

export default Main
