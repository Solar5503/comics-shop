import axios from 'axios'
import {
  ICharacterResults,
  IMarvelServerResponse,
  TOrderBy,
  TOrderCharacterBy,
} from '../types/types'

const MARVEL_URL = 'https://gateway.marvel.com/v1/public/'

export default class ComicsService {
  static async getAllComics(
    limit = 20,
    offset = 0,
    orderBy: TOrderBy = '-focDate'
  ) {
    const response = await axios.get<IMarvelServerResponse>(`/comics`, {
      baseURL: MARVEL_URL,
      params: {
        apikey: import.meta.env.VITE_PUBLIC_API_KEY,
        limit,
        offset,
        orderBy,
      },
    })

    return response.data.data
  }
  static async getComicById(comicId: string) {
    const response = await axios.get<IMarvelServerResponse>(
      `/comics/${comicId}`,
      {
        baseURL: MARVEL_URL,
        params: {
          apikey: import.meta.env.VITE_PUBLIC_API_KEY,
        },
      }
    )
    return response.data.data.results
  }

  static async getAllComicsBySeriesId(seriesId: string) {
    const response = await axios.get<IMarvelServerResponse>(
      `/series/${seriesId}/comics`,
      {
        baseURL: MARVEL_URL,
        params: {
          apikey: import.meta.env.VITE_PUBLIC_API_KEY,
          limit: 100,
          orderBy: 'onsaleDate',
          noVariants: true,
        },
      }
    )
    return response.data.data.results
  }
  static async getCharacterById(characterId: string) {
    const response = await axios.get<IMarvelServerResponse>(
      `/characters/${characterId}`,
      {
        baseURL: MARVEL_URL,
        params: {
          apikey: import.meta.env.VITE_PUBLIC_API_KEY,
        },
      }
    )
    return response.data.data.results
  }

  static async getAllCharacters(
    limit = 20,
    offset = 0,
    orderBy: TOrderCharacterBy = 'name'
  ) {
    const response = await axios.get<IMarvelServerResponse<ICharacterResults>>(
      `/characters`,
      {
        baseURL: MARVEL_URL,
        params: {
          apikey: import.meta.env.VITE_PUBLIC_API_KEY,
          limit,
          offset,
          orderBy,
        },
      }
    )
    return response.data.data
  }

  static async getCharactersByName(nameStartsWith?: string) {
    const response = await axios.get<IMarvelServerResponse<ICharacterResults>>(
      `/characters`,
      {
        baseURL: MARVEL_URL,
        params: {
          apikey: import.meta.env.VITE_PUBLIC_API_KEY,
          nameStartsWith,
          limit: 100,
        },
      }
    )
    return response.data.data.results
  }
}
