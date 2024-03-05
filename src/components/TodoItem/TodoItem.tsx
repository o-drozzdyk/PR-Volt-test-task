/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import './TodoItem.scss'
import { Todo } from '../../types/Todo'
import { useAppDispatch } from '../../store/hooks'
import { changeStatus, deleteTodo, setSelectedTodo } from '../../store/todosSlice'

type Props = {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, isCompleted } = todo

  const [isIconVisible, setIsIconVisible] = useState(false)

  const dispatch = useAppDispatch()

  const changeTodoStatus = () => {
    dispatch(changeStatus(id))
  }

  return (
    <article
      onMouseOver={() => setIsIconVisible(true)}
      onMouseOut={() => setIsIconVisible(false)}
      onDoubleClick={() => dispatch(setSelectedTodo(todo.id))}
      className="todo"
    >
      <img
        src={isCompleted ? 'img/checked.svg' : 'img/square.svg'}
        alt={isCompleted ? 'Checked' : 'Check'}
        onClick={changeTodoStatus}
        className={
          `todo__icon ${(isIconVisible || isCompleted) && 'todo__icon--visible'}
          todo__icon--${isCompleted ? 'checked' : 'square'}`
        }
      />

      <p
        className="todo__title"
        onClick={changeTodoStatus}
      >
        {title}
      </p>

      <img
        src="img/close.svg"
        alt="Delete"
        onClick={() => dispatch(deleteTodo(id))}
        className={`todo__icon ${isIconVisible && 'todo__icon--visible'} todo__icon--close`}
      />
    </article>
  )
}
