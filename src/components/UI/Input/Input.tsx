import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react'
import styles from './Input.module.scss'

interface IInputProps extends ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current!)

    const classes = `${styles.input} ${className}`

    return <input ref={inputRef} className={classes} {...props} />
  }
)

export default Input
