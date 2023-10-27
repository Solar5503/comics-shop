import { useMemo } from 'react'

export const useSorting = function <T extends Record<string, unknown>>(
  array: T[],
  sort: string
): T[] {
  const sortedArray = useMemo(() => {
    if (sort) {
      return [...array].sort((a, b) => {
        switch (true) {
          case typeof a[sort] === 'number' && typeof b[sort] === 'number':
            return (a[sort] as number) - (b[sort] as number)
          case typeof a[sort] === 'string' && typeof b[sort] === 'string':
            return (a[sort] as string).localeCompare(b[sort] as string)
          default:
            return 0
        }
      })
    }

    return array
  }, [array, sort])

  return sortedArray
}

export const useSortingAndSearching = function <
  T extends Record<string, unknown>
>(array: T[], sort: string, query: string) {
  const sortedArray = useSorting(array, sort)

  const sortedAndFilteredArray = useMemo(() => {
    return sortedArray.filter((item) => {
      if (!query) return true
      if (typeof item.title === 'string')
        return item.title.toLowerCase().includes(query.toLowerCase())
    })
  }, [sortedArray, query])

  return sortedAndFilteredArray
}
