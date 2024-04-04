import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import renderWithRouter from '../../../test/helpers/renderWithRouter'
import { TCharacter } from '../../../types/types'
import CharacterCard from './CharacterCard'
import styles from './CharacterCard.module.scss'

describe('Test CharacterCard', () => {
  const user = userEvent.setup()
  const mockCharacter: TCharacter = {
    id: 1,
    name: 'Spider-man',
    description: 'Test description',
    thumbnail: 'srcImg.jpg',
    comics: [{ comicId: 1, name: 'Test comic' }],
    series: [{ seriesId: 1, name: 'Test series' }],
    orderBy: 'name',
  }

  test('It should renders character card with correct data', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <CharacterCard character={mockCharacter} />
    )
    const characterCard = getByTestId('character-card')
    const img = getByRole('img', {
      name: /Spider-man/i,
    })
    const name = getByTestId('name')
    const favoriteBtn = getByRole('button', { name: /Add to Favorite/i })
    const linkToSingleCharacterPage = getByTestId(
      'link-to-single-character-page'
    )

    expect(characterCard).toHaveClass(styles['character-card'])
    expect(img).toHaveAttribute('src', 'srcImg.jpg')
    expect(name).toHaveClass(styles['character-card__name'])
    expect(favoriteBtn).toHaveClass(styles['character-card__favorite-button'])
    expect(linkToSingleCharacterPage).toHaveAttribute('href', '/characters/1')
  })

  test('It should adds and removes from favorite when favorite button is clicked', async () => {
    const { getByRole } = renderWithRouter(
      <CharacterCard character={mockCharacter} />
    )
    const favoriteBtn = getByRole('button', { name: /Add to Favorite/i })
    await user.click(favoriteBtn)
    expect(favoriteBtn).toHaveAttribute('aria-label', 'Remove from favorite')
    await user.click(favoriteBtn)
    expect(favoriteBtn).toHaveAttribute('aria-label', 'Add to favorite')
  })

  test('It should redirect to single character page when link is clicked', async () => {
    const { getByTestId } = renderWithRouter(
      <CharacterCard character={mockCharacter} />
    )
    const linkToSingleCharacterPage = getByTestId(
      'link-to-single-character-page'
    )
    await userEvent.click(linkToSingleCharacterPage)
    expect(getByTestId('single-character-page')).toBeInTheDocument()
  })
})
