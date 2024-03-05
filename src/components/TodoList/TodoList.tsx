import './TodoList.scss'
import { useAppSelector } from '../../store/hooks'
import { TodoItem } from '../TodoItem'

export const TodoList: React.FC = () => {
  const { visibleTodos } = useAppSelector(state => state.todos)

  return (
    <div className="todos">
      {visibleTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </div>
  )
}
