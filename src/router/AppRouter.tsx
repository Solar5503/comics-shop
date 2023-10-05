import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Characters from '../pages/Characters'
import Comics from '../pages/Comics/Comics'
import Home from '../pages/Home'
import MyComicsZone from '../pages/MyComicsZone'
import Page404 from '../pages/Page404/Page404'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comics" element={<Comics />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/my-comics-zone" element={<MyComicsZone />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default AppRouter
