import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Characters from '../pages/Characters/Characters'
import SingleCharacter from '../pages/Characters/SingleCharacter/SingleCharacter'
import Comics from '../pages/Comics/Comics'
import SingleComic from '../pages/Comics/SingleComic/SingleComic'
import ComicsBySeries from '../pages/ComicsBySeries'
import Home from '../pages/Home'
import MyComicsZone from '../pages/MyComicsZone'
import Page404 from '../pages/Page404/Page404'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comics" element={<Comics />} />
      <Route path="/comics/:comicId" element={<SingleComic />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:characterId" element={<SingleCharacter />} />
      <Route path="/series/:seriesId/comics" element={<ComicsBySeries />} />
      <Route path="/my-comics-zone" element={<MyComicsZone />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default AppRouter
