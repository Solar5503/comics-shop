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
  orderBy?: TOrderBy
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

export interface IComicResults {
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

export interface IMarvelServerResponse<T = IComicResults> {
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
    results: T[]
  }
}

export type TSortComicBy = 'title' | 'format' | 'price' | ''

export interface IComicFilter {
  sort: TSortComicBy
  query: string
  limitComics: number
  orderByDate: TOrderBy
}

export type TCharacter = {
  id: number
  name: string
  description?: string
  thumbnail: string
  comics: Array<{
    comicId: number
    name: string
  }>
  series: Array<{
    seriesId: number
    name: string
  }>
  orderBy?: TOrderCharacterBy
}

export type TOrderCharacterBy = 'name' | '-name' | 'modified' | '-modified'

export interface ICharacterFilter {
  orderBy: TOrderCharacterBy
  query: string
  limitCharacters: number
}

export interface ICharacterResults {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    available: number
    collectionURI: string
    items: Array<{
      name: string
      resourceURI: string
    }>
    returned: number
  }
  series: {
    available: number
    collectionURI: string
    items: Array<{
      name: string
      resourceURI: string
    }>
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: Array<{
      name: string
      resourceURI: string
      type: string
    }>
    returned: number
  }
  events?: {
    available: number
    collectionURI: string
    items: Array<{
      name: string
      resourceURI: string
    }>
    returned: number
  }
  urls: Array<{
    type: string
    url: string
  }>
}
