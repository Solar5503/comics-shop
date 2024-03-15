const dateNow = new Date()
export const onsaleDateFormatted = (date: string) =>
  dateNow >= new Date(date)
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not on sale yet'

export const priceFormatted = (price: number) =>
  price === 0
    ? 'Free'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
export const descriptionFormatted = (description?: string) =>
  description ? description.replace(/<\/?[^>]+>/gi, '') : 'No description'

export const roleFormatted = (role: string) =>
  role.charAt(0).toUpperCase() + role.slice(1)

export const formatColorStyle = (
  styles: CSSModuleClasses,
  classesArr: string[],
  format: string
) => {
  const classNameFormat = (className: string) =>
    className
      .split('--')[1]
      .split('-')
      .reduce((acc, word) => acc + word[0].toUpperCase() + word.slice(1), '')
  const stylesObject = classesArr.reduce(
    (acc: Record<string, string>, className) => ({
      ...acc,
      [classNameFormat(className)]: styles[className],
    }),
    {}
  )

  return stylesObject[format?.replace(/ /g, '')]
}
