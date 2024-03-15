import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TComic } from '../../../types/types'
import CreatorsList from './CreatorsList'

describe('Test CreatorsList', () => {
  const mockComic: TComic = {
    id: 1,
    title: 'Spider-man',
    description: 'Test description',
    price: 9.99,
    thumbnail: 'srcImg.jpg',
    onsaleDate: '2024-01-01',
    pageCount: 100,
    format: 'Hardcover',
    creators: [
      {
        creatorId: '123',
        name: 'Chris Bacon',
        role: 'writer',
      },
    ],
  }

  test('It should renders list of creators', () => {
    render(<CreatorsList comic={mockComic} />)
    const title = screen.getByTestId('creators-list-header')
    const list = screen.getByTestId('creators-list-listing')
    const listItems = screen.getAllByTestId('creators-list-item')
    expect(title).toBeInTheDocument()
    expect(list).toBeInTheDocument()
    expect(listItems).toHaveLength(1)
  })
  test('It should not renders  list of creators', () => {
    render(<CreatorsList comic={{}} />)
    const title = screen.queryByTestId('creators-list-header')
    const list = screen.queryByTestId('creators-list-listing')
    const listItems = screen.queryAllByTestId('creators-list-item')
    expect(title).not.toBeInTheDocument()
    expect(list).not.toBeInTheDocument()
    expect(listItems).toHaveLength(0)
  })
})
