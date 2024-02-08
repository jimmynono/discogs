import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../App.css';
import { Film, AllFilm } from '../types/Types';
import { gql } from '@apollo/client';

export const ALL_FILMS_QUERY = gql`
  {
    allFilms {
      films {
        title
        director
        releaseDate
      }
    }
  }
`;

function AllFilms() {
  const { data, loading, error } = useQuery(ALL_FILMS_QUERY);

  // Error handling and loading state
  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>;

  const { allFilms }: AllFilm = data;

  return (
    <>
      <h1>StarWars movies!</h1>
      <ul>
        {allFilms.films.map((film: Film, index: number) => {
          return (
            <Link
              className='border-btn'
              to={`/films/${index + 1}`}
              key={film.title}
            >
              {film.title}
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default AllFilms;
