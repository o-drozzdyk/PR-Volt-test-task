import './Error.scss'

export const Error: React.FC = () => {
  return (
    <div className="error">
      <p className="error__message">
        Todo length must be between 3 and 20 characters
      </p>
    </div>
  )
}