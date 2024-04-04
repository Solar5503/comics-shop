import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import renderWithRouter from '../../../test/helpers/renderWithRouter'
import { TComic } from '../../../types/types'
import ComicCard from './ComicCard'
import styles from './ComicCard.module.scss'

describe('Test ComicCard', () => {
  const mockComic: TComic = {
    id: 1,
    title: 'Spider-man',
    description: 'Test description',
    price: 9.99,
    thumbnail: 'srcImg.jpg',
    onsaleDate: '2024-01-01',
    pageCount: 100,
    format: 'Hardcover',
    orderBy: '-focDate',
  }
  const user = userEvent.setup()

  test('It should renders comic card with correct data', () => {
    renderWithRouter(<ComicCard comic={mockComic} />)
    const comicCard = screen.getByTestId('comic-card')
    const format = screen.getByTestId('format')
    const img = screen.getByRole('img', {
      name: /Spider-man/i,
    })
    const title = screen.getByTestId('title')
    const favoriteBtn = screen.getByRole('button', { name: /Add to Favorite/i })
    const price = screen.getByText('$9.99')
    const page = screen.getByText(/Pages 100/i)
    const cartBtn = screen.getByRole('button', { name: /Add to cart/i })
    const description = screen.getByTestId('description')
    const linkToSingleComicPage = screen.getByTestId(
      'link-to-single-comic-page'
    )

    expect(comicCard).toHaveClass(styles['comic-card'])
    expect(format).toHaveClass(
      'comic-card__header comic-card__header--hardcover',
      { exact: true }
    )
    expect(img).toHaveAttribute('src', 'srcImg.jpg')
    expect(title).toHaveClass(styles['comic-card__title'])
    expect(favoriteBtn).toHaveClass(styles['comic-card__button'])
    expect(price).toHaveClass(styles['comic-card__price'])
    expect(page).toHaveClass(styles['comic-card__page'])
    expect(cartBtn).toHaveClass(styles['comic-card__button'])
    expect(description).toHaveTextContent('Test description')
    expect(linkToSingleComicPage).toBeInTheDocument()
  })

  test('It should adds and removes from favorite when favorite button is clicked', async () => {
    renderWithRouter(<ComicCard comic={mockComic} />)
    const favoriteBtn = screen.getByRole('button', { name: /Add to Favorite/i })
    await user.click(favoriteBtn)
    expect(favoriteBtn).toHaveAttribute('aria-label', 'Remove from favorite')
    await user.click(favoriteBtn)
    expect(favoriteBtn).toHaveAttribute('aria-label', 'Add to favorite')
  })

  test('It should adds and removes from cart when addToCart button is clicked', async () => {
    renderWithRouter(<ComicCard comic={mockComic} />)
    const cartBtn = screen.getByRole('button', { name: /Add to cart/i })
    await user.click(cartBtn)
    expect(cartBtn).toHaveAttribute('aria-label', 'Remove from cart')
    await user.click(cartBtn)
    expect(cartBtn).toHaveAttribute('aria-label', 'Add to cart')
  })
  test('It should redirect to single comic page when link is clicked', async () => {
    renderWithRouter(<ComicCard comic={mockComic} />)
    const linkToSingleComicPage = screen.getByTestId(
      'link-to-single-comic-page'
    )
    await user.click(linkToSingleComicPage)
    expect(screen.getByTestId('single-comic-page')).toBeInTheDocument()
  })
})
