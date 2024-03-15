import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import renderWithRouter from '../../../test/helpers/renderWithRouter'
import { TComic } from '../../../types/types'
import ComicsList from './ComicsList'
describe('Test ComicsList', () => {
  const mockComics: TComic[] = [
    {
      id: 1,
      title: 'Spider-man',
      description: 'Test description',
      price: 9.99,
      thumbnail: 'srcImg.jpg',
      onsaleDate: '2024-01-01',
      pageCount: 100,
      format: 'Hardcover',
    },
  ]
  test('It should renders list of comics', () => {
    renderWithRouter(<ComicsList comics={mockComics} isComicsLoading={false} />)
    const title = screen.getByTestId('comics-list-title')
    const comicCard = screen.getByTestId('comic-card')
    const emptyList = screen.queryByTestId('comics-list-empty')
    expect(title).toBeInTheDocument()
    expect(comicCard).toBeInTheDocument()
    expect(emptyList).not.toBeInTheDocument()
  })
  test('It should renders empty list of comics', () => {
    renderWithRouter(<ComicsList comics={[]} isComicsLoading={false} />)
    const comicCard = screen.queryByTestId('comic-card')
    const emptyList = screen.getByTestId('comics-list-empty')
    expect(emptyList).toBeInTheDocument()
    expect(comicCard).not.toBeInTheDocument()
  })
})
