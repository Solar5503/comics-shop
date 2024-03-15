import { ComponentProps } from 'react'
import styles from './NextButton.module.scss'

interface INextButtonProps extends ComponentProps<'button'> {
  stylesForArrow?: Record<string, string>
}

const NextButton = ({
  className,
  stylesForArrow,
  ...props
}: INextButtonProps) => {
  const classes = `${styles['next-button']} ${className}`

  return (
    <button className={classes} {...props}>
      <i className={styles['next-button__arrow-next']} style={stylesForArrow} />
    </button>
  )
}

export default NextButton
