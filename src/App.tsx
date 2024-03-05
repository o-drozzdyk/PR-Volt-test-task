import React, { useEffect } from 'react'
import './App.scss'
import { InputField } from './components/InputField'
import { TodoList } from './components/TodoList'
import { FilterSection } from './components/Filter'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setError } from './store/todosSlice'
import { Error } from './components/Error'

const App: React.FC = () => {
  const { todos, isError } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isError) {
      setTimeout(() => dispatch(setError(false)), 5000)
    }
  }, [isError])

  return (
    <div className="app">
      <h1 className="app__title">Todo App</h1>

      <InputField />

      {isError && <Error />}

      {todos.length > 0 &&
        <div className="app__main">
          <FilterSection />

          <TodoList />
        </div>
      }
    </div>
  )
}

export default App
