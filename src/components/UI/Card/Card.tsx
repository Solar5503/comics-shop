import React, { ComponentProps } from 'react'
import styles from './Card.module.scss'

interface ICardProps {
  children?: React.ReactNode
  className?: string
  props?: ComponentProps<'div'>
}

const Card = ({ children, className, ...props }: ICardProps) => {
  const classes = `${styles.card} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
