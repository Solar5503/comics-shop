export interface IImagesCarousel {
  title: string
  src: string
  srcSetWebp: string
  srcSetJpg: string
  alt: string
  path: string
}

export type TOrderBy =
  | 'onsaleDate'
  | 'modified'
  | 'focDate' // Final Date of Order Cut-off
  | '-onsaleDate'
  | '-modified'
  | '-focDate'

export type TComic = {
  id: number
  title: string
  description?: string
  price: number
  thumbnail: string
  onsaleDate: string
  pageCount: number
  format: string
  series?: {
    seriesId: string
    name: string
  }
  creators?: Array<{
    creatorId: string
    name: string
    role: string
  }>
  characters?: Array<{
    characterId: string
    name: string
  }>
}
export interface ISeries {
  id: number
  name: string
  description: string
  comics: TComic[]
}

interface IResults {
  id: number
  title: string
  description: string
  textObjects: Array<{
    type: string
    text: string
  }>
  prices: Array<{
    type: string
    price: number
  }>
  thumbnail: {
    path: string
    extension: string
  }
  dates: Array<{
    type: string
    date: string
  }>
  pageCount: number
  format: string
  series: {
    name: string
    resourceURI: string
  }
  creators: {
    items: Array<{
      name: string
      resourceURI: string
      role: string
    }>
  }
  characters: {
    items: Array<{
      name: string
      resourceURI: string
    }>
  }
}

export interface MarvelServerResponse {
  attributionText: string
  attributionHTML: string
  etag: string
  code: number
  status: string
  copyright: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: IResults[]
  }
}

export type TSortBy = 'title' | 'format' | 'price' | ''

export interface IFilter {
  sort: TSortBy
  query: string
  limitComics: number
  orderByDate: TOrderBy
}
