import Navbar from '../Navbar/Navbar'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles['header__logo']} src="/logo/logo.svg" alt="logo" />
      <h1 className={styles['header__heading']}>The Marvel Universe</h1>
      <Navbar />
    </header>
  )
}

export default Header
