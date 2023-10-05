import styles from './Error.module.scss'
interface IErrorProps {
  error: string
}

const Error = ({ error }: IErrorProps) => {
  return (
    <div className={styles.error}>
      <h1>An error has occurred:</h1>
      <h2>💥 {error} 💥</h2>
    </div>
  )
}

export default Error
