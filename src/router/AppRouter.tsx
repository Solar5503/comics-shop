import { Route, Routes } from 'react-router-dom'
import Characters from '../pages/Characters'
import Comics from '../pages/Comics'
import MyComicsZone from '../pages/MyComicsZone'
import Page404 from '../pages/Page404/Page404'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Comics />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/my-comics-zone" element={<MyComicsZone />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default AppRouter
