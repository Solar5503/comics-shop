import '@testing-library/jest-dom'
import renderWithRouter from '../../../test/helpers/renderWithRouter'
import { TCharacter } from '../../../types/types'
import CharactersList from './CharactersList'

describe('Test CharactersList', () => {
  const mockCharacter: TCharacter = {
    id: 1,
    name: 'Spider-man',
    description: 'Test description',
    thumbnail: 'srcImg.jpg',
    comics: [{ comicId: 1, name: 'Test comic' }],
    series: [{ seriesId: 1, name: 'Test series' }],
    orderBy: 'name',
  }
  test('It should renders list of characters', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <CharactersList
        characters={[mockCharacter]}
        isCharactersLoading={false}
      />
    )
    const title = getByTestId('characters-list-title')
    const characterCard = getByTestId('character-card')
    const emptyList = queryByTestId('characters-list-empty')
    expect(title).toBeInTheDocument()
    expect(characterCard).toBeInTheDocument()
    expect(emptyList).not.toBeInTheDocument()
  })
  test('It should renders empty list of characters', () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <CharactersList characters={[]} isCharactersLoading={false} />
    )
    const emptyList = getByTestId('characters-list-empty')
    expect(queryByTestId('character-card')).not.toBeInTheDocument()
    expect(emptyList).toBeInTheDocument()
  })
})
