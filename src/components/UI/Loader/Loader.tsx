import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img
        src="/loader/loader-fast.gif"
        alt="loader"
        width="131"
        height="135"
      />
    </div>
  )
}

export default Loader
