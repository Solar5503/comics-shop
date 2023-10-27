import axios from 'axios'
import { MarvelServerResponse, TOrderBy } from '../types/types'

const MARVEL_URL = 'https://gateway.marvel.com/v1/public/'

export default class ComicsService {
  static async getAllComics(
    limit = 20,
    offset = 0,
    orderBy: TOrderBy = '-focDate'
  ) {
    const response = await axios.get<MarvelServerResponse>(`/comics`, {
      baseURL: MARVEL_URL,
      params: {
        apikey: import.meta.env.VITE_PUBLIC_API_KEY,
        limit,
        offset,
        orderBy,
      },
    })

    return response.data.data.results
  }
}
