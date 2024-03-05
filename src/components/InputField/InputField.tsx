import React, { useEffect, useState } from 'react'
import './InputField.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTodo, setError, updateTodo } from '../../store/todosSlice'

export const InputField: React.FC = () => {
  const [input, setInput] = useState('')

  const { selectedTodoId, visibleTodos } = useAppSelector(state => state.todos)

  useEffect(() => {
    if (selectedTodoId) {
      setInput(visibleTodos.find(todo => todo.id === selectedTodoId)?.title || '')
    }
  }, [selectedTodoId])

  const dispatch = useAppDispatch()

  const addNewtodo = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const validInput = input.trim()

      if (validInput.length >= 3 && validInput.length <= 20) {
        if (selectedTodoId) {
          dispatch(updateTodo(validInput))
        } else {
          dispatch(addTodo({
            id: Date.now(),
            title: validInput,
            isCompleted: false,
          }))
        }

        setInput('')
      } else {
        dispatch(setError(true))
      }
    }
  }

  return (
    <input
      type="text"
      placeholder="New todo"
      value={input}
      onChange={(event): void => setInput(event.target.value)}
      onKeyDown={addNewtodo}
      onBlur={(): void => setInput('')}
      className="input"
    />
  )
}