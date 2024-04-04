import { useCallback, useRef } from 'react'

/**
 * This is a custom hook for debouncing a function.
 * @param {function} callback - The callback function that will be debounced.
 * @param {number} delay - The delay in milliseconds (optional). Defaults to 500.
 * @returns {function} The debounced function.
 */
const useDebounce = <T = unknown>(
  callback: (...arg: T[]) => void,
  delay: number = 500
) => {
  const timer = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...arg: T[]) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        callback(...arg)
      }, delay)
    },
    [callback, delay]
  )
  return debouncedCallback
}

export default useDebounce
