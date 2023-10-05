/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import { getErrorMessage } from '../utils/getErrorMessage'

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
