import { ICharacterResults, TOrderCharacterBy } from '../types/types'

const dateNow = new Date()
export const onsaleDateFormatted = (date: string) =>
  dateNow >= new Date(date)
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not on sale yet'

export const priceFormatted = (price: number = 0) =>
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

export const charactersFormatted = function (
  characters: ICharacterResults[],
  orderBy?: TOrderCharacterBy
) {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    description: character.description,
    thumbnail: !character.thumbnail.path.includes('image_not_available')
      ? `${character.thumbnail.path}.${character.thumbnail.extension}`
      : '/images/no-character.webp',
    comics: character.comics.items.map((comic) => ({
      comicId: Number(comic.resourceURI.match(/\d+$/)?.[0] || 0),
      name: comic.name,
    })),
    series: character.series.items.map((series) => ({
      seriesId: Number(series.resourceURI.match(/\d+$/)?.[0] || 0),
      name: series.name,
    })),
    orderBy: orderBy ?? 'name',
  }))
}
