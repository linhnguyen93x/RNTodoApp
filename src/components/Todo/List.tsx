import { TodoContextType, TodoItem, withTodoContext } from 'contexts'
import * as React from 'react'
import { FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import { Index } from './+model'
import { Item } from './Item'

const _keyExtractor = (item: TodoItem) => item.id.toString()

const _renderItem = ({ item }: { item: TodoItem }) => <Item info={item} />

const ListComponent = ({ ctx }: { ctx: TodoContextType }) => {
  return (
    <FlatList
      data={ctx.todos.filter((item) => {
        switch (ctx.selectedIndex) {
          case Index.Active:
            return !item.done
          case Index.Done:
            return item.done
          default:
            return true
        }
      })}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      ItemSeparatorComponent={Divider}
    />
  )
}

export const List = withTodoContext(ListComponent)
