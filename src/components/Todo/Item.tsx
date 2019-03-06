import { TodoContextType, TodoItem, withTodoContext } from 'contexts'
import * as React from 'react'
import { View } from 'react-native'
import { Button, CheckBox, Icon } from 'react-native-elements'

const ItemComponent = ({
  ctx,
  info,
}: {
  ctx: TodoContextType
  info: TodoItem
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <CheckBox
      containerStyle={{
        backgroundColor: 'transparent',
        borderWidth: 0,
        flex: 1,
      }}
      textStyle={{
        textDecorationLine: info.done ? 'underline line-through' : 'none',
        opacity: info.done ? 0.3 : 1,
      }}
      title={info.name}
      checked={info.done}
      onPress={() => ctx.updateTodoStatus(info.id)}
    />
    <Button
      containerStyle={{ marginRight: 16 }}
      buttonStyle={{ backgroundColor: 'red' }}
      icon={<Icon name="delete" size={15} color="white" />}
      title=""
      onPress={() => ctx.deleteTodo(info.id)}
    />
  </View>
)

export const Item = withTodoContext(ItemComponent)
