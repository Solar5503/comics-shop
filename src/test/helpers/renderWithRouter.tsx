import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRouter from '../../router/AppRouter'

export default function renderWithRouter(
  component: JSX.Element | null,
  initialRoute: string = '/'
) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRouter />
      {component}
    </MemoryRouter>
  )
}
