import { ComponentProps } from 'react'
import styles from './PrevButton.module.scss'

interface IPrevButtonProps extends ComponentProps<'button'> {
  stylesForArrow?: Record<string, string>
}

const PrevButton = ({
  className,
  stylesForArrow,
  ...props
}: IPrevButtonProps) => {
  const classes = `${styles['prev-button']} ${className}`

  return (
    <button className={classes} {...props}>
      <i className={styles['prev-button__arrow-prev']} style={stylesForArrow} />
    </button>
  )
}

export default PrevButton
