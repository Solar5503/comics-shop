import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../../../test/helpers/renderWithRouter'
import { TComic } from '../../../types/types'
import CharactersSmallList from './CharactersSmallList'

describe('Test CharactersSmallList', () => {
  const mockComic: TComic = {
    id: 1,
    title: 'Spider-man',
    description: 'Test description',
    price: 9.99,
    thumbnail: 'srcImg.jpg',
    onsaleDate: '2024-01-01',
    pageCount: 100,
    format: 'Hardcover',
    characters: [
      {
        characterId: '123',
        name: 'Hulk',
      },
    ],
  }

  test('It should renders list of characters', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <CharactersSmallList comic={mockComic} />
    )
    const title = getByTestId('characters-small-list-header')
    const list = getByTestId('characters-small-list-listing')
    const listItems = getAllByTestId('characters-small-list-item')
    const link = getByTestId('characters-small-list-link')
    expect(title).toBeInTheDocument()
    expect(list).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(listItems).toHaveLength(1)
  })
  test('It should not renders  list of characters', () => {
    const { queryByTestId, queryAllByTestId } = renderWithRouter(
      <CharactersSmallList comic={{}} />
    )
    const title = queryByTestId('characters-small-list-header')
    const list = queryByTestId('characters-small-list-listing')
    const listItems = queryAllByTestId('characters-small-list-item')
    const link = queryByTestId('characters-small-list-link')
    expect(title).not.toBeInTheDocument()
    expect(list).not.toBeInTheDocument()
    expect(link).not.toBeInTheDocument()
    expect(listItems).toHaveLength(0)
  })
  test('It should renders  single character page when click on link', async () => {
    const user = userEvent.setup()
    const { getByTestId, queryByTestId } = renderWithRouter(
      <CharactersSmallList comic={mockComic} />
    )
    const link = getByTestId('characters-small-list-link')
    await user.click(link)
    expect(getByTestId('single-character-page')).toBeInTheDocument()
    expect(queryByTestId('page-404')).not.toBeInTheDocument()
  })
})
