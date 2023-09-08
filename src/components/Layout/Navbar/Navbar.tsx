import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navbar}>
        <li>
          <NavLink className={styles['navbar__links']} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles['navbar__links']} ${styles['navbar__links--active']}`
                : `${styles['navbar__links']}`
            }
            to="/comics"
          >
            Comics
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles['navbar__links']} ${styles['navbar__links--active']}`
                : `${styles['navbar__links']}`
            }
            to="/characters"
          >
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles['navbar__links']} ${styles['navbar__links--active']}`
                : `${styles['navbar__links']}`
            }
            to="/my-comics-zone"
          >
            My Comics Zone
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
