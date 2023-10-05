export interface IImagesCarousel {
  title: string
  src: string
  srcSetWebp: string
  srcSetJpg: string
  alt: string
  path: string
}

export interface IComic {
  id: number
  title: string
  description?: string
  price: number
  thumbnail: string
  onsaleDate: string
  pageCount: number
  format: string
}

interface IResults {
  id: number
  title: string
  description: string
  textObjects: [
    {
      type: string
      text: string
    }
  ]
  prices: [
    {
      type: string
      price: number
    }
  ]
  thumbnail: {
    path: string
    extension: string
  }
  dates: [
    {
      type: string
      date: string
    }
  ]
  pageCount: number
  format: string
}

export interface MarvelServerResponse {
  attributionText: string
  attributionHTML: string
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
  etag: string
}
