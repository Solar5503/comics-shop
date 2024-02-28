import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import renderWithRouter from '../../../test/helpers/renderWithRouter'
import Navbar from './Navbar'

describe('Test Navbar', () => {
  const user = userEvent.setup()
  const intersectionObserverMock = () => ({
    observe: () => null,
    disconnect: () => null,
    unobserve: () => null,
  })
  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock)

  test('Error page test', () => {
    renderWithRouter(<Navbar />, '/asdf')
    expect(screen.getByTestId('page-404')).toBeInTheDocument()
    expect(screen.getByTestId('page-404')).toHaveTextContent(
      'You have landed on a non-existent page !'
    )
    expect(screen.getByTestId('page-404')).toHaveClass('error404')
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
  })
  test('Home page test', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument()
  })
  test('Comic page test', async () => {
    renderWithRouter(<Navbar />)
    const comicLink = screen.getByTestId('navbar-comics')
    await user.click(comicLink)
    expect(screen.getByTestId('comics-page')).toBeInTheDocument()
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument()
  })
  test('Characters page test', async () => {
    renderWithRouter(<Navbar />)
    const characterLink = screen.getByTestId('navbar-characters')
    await user.click(characterLink)
    expect(screen.getByTestId('characters-page')).toBeInTheDocument()
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument()
  })
  test('My comics zone page test', async () => {
    renderWithRouter(<Navbar />)
    const myComicsLink = screen.getByTestId('navbar-my-comics-zone')
    await user.click(myComicsLink)
    expect(screen.getByTestId('my-comics-zone-page')).toBeInTheDocument()
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument()
  })
})
