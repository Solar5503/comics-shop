import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink className={styles['header__link-logo']} to="/">
        <img
          className={styles['header__logo']}
          src="/logo/logo.svg"
          alt="logo"
        />
      </NavLink>
      <h1 className={styles['header__heading']}>The Marvel Universe</h1>
      <Navbar />
    </header>
  )
}

export default Header
