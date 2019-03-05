import { TodoContextType, TodoItem, withTodoContext } from 'contexts'
import * as React from 'react'
import { FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import { Item } from './Item'

const _keyExtractor = (item: TodoItem) => item.id.toString()

const _renderItem = ({ item }: { item: TodoItem }) => <Item info={item} />

const ListComponent = ({ ctx }: { ctx: TodoContextType }) => {
  return (
    <FlatList
      data={ctx.todos}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      ItemSeparatorComponent={Divider}
    />
  )
}

export const List = withTodoContext(ListComponent)
