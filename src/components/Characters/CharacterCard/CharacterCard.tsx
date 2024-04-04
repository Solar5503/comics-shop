import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TCharacter } from '../../../types/types'
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton'
import styles from './CharacterCard.module.scss'

interface ICharacterCardProps {
  character: TCharacter
}
const CharacterCard = ({ character }: ICharacterCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const { id, name, thumbnail } = character

  const favoriteClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <article className={styles['character-card']} data-testid="character-card">
      <Link
        to={`/characters/${id}`}
        aria-label="Go to this character"
        className={styles['character-card__link']}
        data-testid="link-to-single-character-page"
      />
      <div className={styles['character-card__wrapper-img']}>
        <img
          src={thumbnail}
          alt={name}
          width="250px"
          height="384px"
          loading="lazy"
          className={styles['character-card__img']}
        />
        <FavoriteButton
          favoriteClickHandler={favoriteClickHandler}
          isFavorite={isFavorite}
          className={styles['character-card__favorite-button']}
        />
      </div>
      <div className={styles['character-card__name']} data-testid="name">
        <h3>{name}</h3>
      </div>
    </article>
  )
}

export default CharacterCard
