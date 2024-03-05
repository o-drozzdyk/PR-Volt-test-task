import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Todo } from '../types/Todo'
import { Filter } from '../types/Filter'

type State = {
  todos: Todo[]
  visibleTodos: Todo[]
  selectedTodoId: number | null
  completedCount: number
  currentCount: number
  filterBy: Filter
  isError: boolean
}

function calculateInitialState(): State {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]')
  const visibleTodos = [...todos]

  const completedCount = todos.filter((todo: Todo) => todo.isCompleted).length
  const currentCount = todos.filter((todo: Todo) => !todo.isCompleted).length

  return {
    todos,
    visibleTodos,
    selectedTodoId: null,
    completedCount,
    currentCount,
    filterBy: Filter.all,
    isError: false,
  }
}

const initialState: State = calculateInitialState()

function updateTodos(state: State): void {
  localStorage.setItem('todos', JSON.stringify(state.todos))

  state.completedCount = state.todos.filter(todo => todo.isCompleted).length
  state.currentCount = state.todos.filter(todo => !todo.isCompleted).length

  state.visibleTodos = state.todos.filter(todo => {
    switch (state.filterBy) {
      case Filter.completed:
        return todo.isCompleted

      case Filter.current:
        return !todo.isCompleted

      default:
        return true
    }
  })
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload)

      updateTodos(state)
    },

    setSelectedTodo: (state, action) => {
      state.selectedTodoId = action.payload
    },

    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filterBy = action.payload

      updateTodos(state)
    },

    changeStatus: (state, action: PayloadAction<number>) => {
      const currentTodo = state.todos.find(todo => todo.id === action.payload)

      if (currentTodo) {
        currentTodo.isCompleted = !currentTodo.isCompleted

        updateTodos(state)
      }
    },

    updateTodo: (state, action) => {
      if (state.selectedTodoId) {
        const updatedTodo = state.todos.find(todo => todo.id === state.selectedTodoId)

        if (updatedTodo) {
          updatedTodo.title = action.payload
        }
      }

      state.selectedTodoId = null

      updateTodos(state)
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)

      updateTodos(state)
    },

    checkAll: (state) => {
      if (state.todos.some(todo => !todo.isCompleted)) {
        state.todos.forEach(todo => todo.isCompleted = true)
      } else {
        state.todos.forEach(todo => todo.isCompleted = false)
      }

      updateTodos(state)
    },

    clearChecked: (state) => {
      state.todos = state.todos.filter(todo => !todo.isCompleted)

      updateTodos(state)
    },

    setError: (state, action) => {
      state.isError = action.payload
    },
  },
})

export const {
  addTodo, setFilter, changeStatus, updateTodo, deleteTodo,
  checkAll, clearChecked, setSelectedTodo, setError,
} = todosSlice.actions

export default todosSlice.reducer

