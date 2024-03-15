export const navigateToNextAndPrevById = function <
  T extends { id: number } & Record<string, unknown>
>(currId: number, array: T[]): T[] {
  const result: T[] = []

  array.forEach((el, i) => {
    const length = array.length
    const prev = i === 0 ? length - 1 : i - 1
    const next = i === length - 1 ? 0 : i + 1

    if (el.id === currId) result.push(array[prev], array[next])
  })
  return result
}
