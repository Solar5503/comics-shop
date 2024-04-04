import { TCharacter } from '../../../types/types'
import Card from '../../UI/Card/Card'
import CharacterCard from '../CharacterCard/CharacterCard'
import styles from './CharactersList.module.scss'

interface ICharactersListProps {
  characters: TCharacter[]
  isCharactersLoading: boolean
}
const CharactersList = ({
  characters,
  isCharactersLoading,
}: ICharactersListProps) => {
  if (characters.length === 0 && !isCharactersLoading)
    return (
      <Card>
        <p
          className={styles.charactersList__empty}
          data-testid="characters-list-empty"
        >
          No characters found !
        </p>
      </Card>
    )

  return (
    <div className={styles.charactersList}>
      <h2
        className={styles.charactersList__title}
        data-testid="characters-list-title"
      >
        Characters of the Marvel Universe
      </h2>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          data-testid="character-card"
        />
      ))}
    </div>
  )
}

export default CharactersList
