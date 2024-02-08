import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Character } from '../types/Types';
import { FilmDetails } from '../types/Types';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/utils';

export const SINGLE_FILM_QUERY = gql`
  query GetSingleFilm($filmID: ID!) {
    film(filmID: $filmID) {
      title
      director
      openingCrawl
      releaseDate
      characterConnection {
        characters {
          name
        }
      }
    }
  }
`;

function SingleFilm() {
  const filmID = useParams().filmId;
  const { data, loading, error } = useQuery(SINGLE_FILM_QUERY, {
    variables: { filmID: filmID },
  });

  // Error handling and error state
  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>;

  const filmData: FilmDetails = data.film;

  return (
    <>
      <h1>{filmData.title}</h1>
      <p>{`Directed by: ${filmData.director}`}</p>
      <p>Released: {formatDate(filmData.releaseDate)}</p>
      <h2 className='crawl'>{filmData.openingCrawl}</h2>
      <p className='characters-header'>
        What characters will we see in this movie?
      </p>
      <ul className='characters'>
        {filmData.characterConnection.characters.map((character: Character) => {
          return <li key={character.name}>{character.name}</li>;
        })}
      </ul>
      <Link className='btn' to='/'>
        See all films
      </Link>
    </>
  );
}

export default SingleFilm;
