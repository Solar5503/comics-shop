import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Layout/Footer/Footer'
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
      <Footer />
    </BrowserRouter>
  )
}

export default App
