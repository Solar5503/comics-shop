import Card from '../../components/UI/Card/Card'
import styles from './Page404.module.scss'

const Page404 = () => {
  return (
    <Card className={styles.error404}>
      <h1>💥 You have landed on a non-existent page ! 💥</h1>
      <img
        className={styles['error404__img']}
        src="/images/404.png"
        alt="Error404"
      />
    </Card>
  )
}

export default Page404
