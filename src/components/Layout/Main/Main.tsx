import styles from './Main.module.scss'

interface IMainProps {
  children: React.ReactNode
}

const Main = ({ children }: IMainProps) => {
  return <main className={styles.main}>{children}</main>
}

export default Main
