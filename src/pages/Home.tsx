import Carousel from '../components/UI/Carousel/Carousel'
import { images } from '../components/UI/Carousel/images'

const Home = () => {
  return (
    <section data-testid="home-page">
      <Carousel imagesCarousel={images} />
    </section>
  )
}

export default Home
