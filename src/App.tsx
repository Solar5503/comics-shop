import { BrowserRouter } from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Main from './components/Layout/Main/Main'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <AppRouter />
      </Main>
    </BrowserRouter>
  )
}

export default App
