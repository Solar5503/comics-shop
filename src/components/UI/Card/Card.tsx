import React from 'react'
import styles from './Card.module.scss'

interface ICardProps {
  children?: React.ReactNode
  className?: string
}

const Card = ({ children, className }: ICardProps) => {
  const classes = `${styles.card} ${className}`

  return <div className={classes}>{children}</div>
}

export default Card
