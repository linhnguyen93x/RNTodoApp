export enum Index {
  All,
  Active,
  Done,
}

export interface TodoItemRequest {
  name: string
  done: boolean
}
