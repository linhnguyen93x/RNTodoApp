import * as React from 'react'
import { Omit } from './helpers'

export interface TodoItem {
  id: string
  name: string
  done: boolean
}

export interface TodoState {
  todos: TodoItem[]
  selectedIndex: number
}

export interface TodoAction {
  addTodo: (name: string) => void
  deleteTodo: (id: string) => void
  toggleAll: () => void
  updateTodoStatus: (id: string) => void
  updateSelectedIndex: (index: number) => void
}

export type TodoContextType = TodoState & TodoAction

const initialFunction = () => {}

const ctx = React.createContext<TodoContextType>({
  todos: [],
  selectedIndex: 0,
  addTodo: initialFunction,
  deleteTodo: initialFunction,
  toggleAll: initialFunction,
  updateTodoStatus: initialFunction,
  updateSelectedIndex: initialFunction,
})

const TodoContextConsumer = ctx.Consumer

export function withTodoContext<
  P extends { ctx: TodoContextType },
  R = Omit<P, 'ctx'>
>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <TodoContextConsumer>
        {value => <Component {...props} ctx={value} />}
      </TodoContextConsumer>
    )
  }
}

export const TodoContextProvider = ctx.Provider
