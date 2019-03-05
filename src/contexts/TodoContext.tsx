import * as React from 'react'
import { Omit } from './helpers'

export interface TodoItem {
  id: number
  name: string
  done: boolean
}

export interface TodoState {
  todos: TodoItem[]
}

export interface TodoAction {
  addTodo: (name: string) => void
  deleteTodo: (id: number) => void
  toggleAll: () => void
}

export type TodoContextType = TodoState & TodoAction

const initialFunction = () => {}

const ctx = React.createContext<TodoContextType>({
  todos: [],
  addTodo: initialFunction,
  deleteTodo: initialFunction,
  toggleAll: initialFunction,
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
