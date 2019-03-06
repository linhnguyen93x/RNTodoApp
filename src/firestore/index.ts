import { TodoItemRequest } from 'components/Todo'
import { TodoItem } from 'contexts'
import * as firebase from 'firebase'

export class FirebaseConnect {
  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this())
  }
  private static _instance: FirebaseConnect

  constructor() {
    const config = {
      apiKey: 'AIzaSyB-Zt7YyHOfrEUXyK4tqPDURVRfvN9CSG0',
      authDomain: 'chatapp-1c794.firebaseapp.com',
      databaseURL: 'https://chatapp-1c794.firebaseio.com',
      projectId: 'chatapp-1c794',
      storageBucket: 'chatapp-1c794.appspot.com',
      messagingSenderId: '327775458472',
    }
    firebase.initializeApp(config)
    console.info('Firebase initial success')
  }

  public saveTodo(todo: TodoItemRequest) {
    return this.todoRef().push(todo)
  }

  public updateTodo(todo: TodoItem) {
    const updates: any = {}
    updates[todo.id] = todo
    return this.todoRef().update(updates)
  }

  public deleteTodo(id: string) {
    return this.todoRef()
      .child(`/${id}`)
      .remove()
  }

  public getTodo(): Promise<TodoItem[]> {
    return new Promise((resolve) => {
      this.todoRef()
        .limitToFirst(5)
        .once('value', (snapshot) => {
          const arr: TodoItem[] = []

          if (snapshot) {
            snapshot.forEach((item) => {
              arr.push({ ...item.val(), id: item.key })
            })
          }
          resolve(arr)
        })
    })
  }

  public toggleTodo(todos: TodoItem[]) {
    const updates: any = {}

    todos.forEach((item) => {
      updates[item.id] = item
    })

    return this.todoRef().update(updates)
  }

  private todoRef() {
    return firebase
      .database()
      .ref()
      .child('todos')
  }
}
