import { useLayoutEffect, useRef } from 'react'
import styles from './Select.module.scss'

interface ISelectProps<T> {
  options: {
    name: string
    value: T
  }[]
  defaultValue: string
  value: T
  urlArrow?: string
  changeHandler: (value: string) => void
  className?: string
}

const Select = function <T extends string | number>({
  options,
  defaultValue,
  value,
  urlArrow,
  changeHandler,
  className,
}: ISelectProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const classes = `${styles['select-wrapper']} ${className}`

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty(
        '--url-arrow',
        urlArrow ? `url(${urlArrow})` : 'url("/select/spiderman-arrow.svg")'
      )
    }
  }, [urlArrow])

  return (
    <div className={classes} ref={wrapperRef}>
      <select
        name={`select-${defaultValue}`}
        className={styles.select}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          changeHandler(e.target.value)
        }
      >
        <option value="" disabled>
          {`-- ${defaultValue} --`}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
