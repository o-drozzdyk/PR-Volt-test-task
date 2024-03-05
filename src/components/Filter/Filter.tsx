/* eslint-disable @typescript-eslint/explicit-function-return-type */
import './Filter.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { checkAll, clearChecked, setFilter } from '../../store/todosSlice'
import { Filter } from '../../types/Filter'

export const FilterSection: React.FC = () => {
  const { filterBy, completedCount, currentCount, visibleTodos } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const isClearButtonVisible = visibleTodos.some(todo => todo.isCompleted)
  const areAllTodosChecked = visibleTodos.every(todo => todo.isCompleted)

  const setNewFilter = (filter: Filter): void => {
    if (filter !== filterBy) {
      dispatch(setFilter(filter))
    }
  }

  return (
    <section className="section">
      <div className="section__filters">
        {Object.keys(Filter)
          .filter(key => isNaN(+key))
          .map(filter =>
            <p
              className={`section__filter ${filterBy === filter && 'section__filter--selected'}`}
              key={filter}
              onClick={(): void => setNewFilter(Filter[filter as keyof typeof Filter])}
            >
              {filter}
            </p>
          )}
      </div>

      <div className="section__counter">
        <p className="section__counter-item">Current: {currentCount}</p>
        <p className="section__counter-item">Completed: {completedCount}</p>
      </div>

      {visibleTodos.length > 0 && 
        <div className="section__buttons">
          <button
            type="button"
            className={
              `section__button ${areAllTodosChecked
                ? 'section__button--uncheck'
                : 'section__button--check'}`
            }
            onClick={() => dispatch(checkAll())}
          >
            {`${areAllTodosChecked ? 'Unmark' : 'Mark'} all`}
          </button>

          {isClearButtonVisible &&
            <button
              type="button"
              className="section__button section__button--clear"
              onClick={() => dispatch(clearChecked())}
            >
              Clear checked
            </button>
          }
        </div>
      }
    </section>
  )
}