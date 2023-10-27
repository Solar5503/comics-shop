import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav role="navigation" aria-label="main">
      <ul className={styles.navbar}>
        <li>
          <NavLink className={styles['navbar__links']} to="/" aria-label="Home">
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
            aria-label="Comics"
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
            aria-label="Characters"
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
            aria-label="My comics zone"
          >
            My Comics Zone
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
