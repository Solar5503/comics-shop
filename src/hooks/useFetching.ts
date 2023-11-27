/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import { getErrorMessage } from '../utils/getErrorMessage'
/**
 * This is a custom hook for fetching data.
 * @param {function} callback - The callback function that performs the fetching.
 * @param {unknown} T - The type of the first argument of the callback function.
 * @param {unknown} R - The type of the second argument of the callback function.
 * @param {unknown} Q - The type of the third argument of the callback function.
 * @return {[function, boolean, string]} An array containing the fetching function, a boolean indicating if the fetching is in progress, and a string representing any error that occurred during the fetching.
 */
export const useFetching = function <T = unknown, R = unknown, Q = unknown>(
  callback: (...args: [T?, R?, Q?]) => Promise<void>
): [(...args: [T?, R?, Q?]) => Promise<void>, boolean, string] {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetching: (...args: [T?, R?, Q?]) => Promise<void> = useCallback(
    async (...args) => {
      try {
        setIsLoading(true)
        setError('')
        await callback(...args)
      } catch (error) {
        setError(getErrorMessage(error))
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return [fetching, isLoading, error]
}
