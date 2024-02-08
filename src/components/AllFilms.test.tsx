import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AllFilms, { ALL_FILMS_QUERY } from './AllFilms';
import SingleFilm from './SingleFilm';
import { JSX } from 'react/jsx-runtime';

const mocks = [
  {
    request: {
      query: ALL_FILMS_QUERY,
    },
    result: {
      data: {
        allFilms: {
          films: [
            {
              title: 'Film 1',
              director: 'Director 1',
              releaseDate: '2022-01-01',
            },
            {
              title: 'Film 2',
              director: 'Director 2',
              releaseDate: '2022-02-01',
            },
          ],
        },
      },
    },
  },
];

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: MemoryRouter });
};

describe('AllFilms component', () => {
  it('renders loading state initially', async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Routes>
          <Route path='/' element={<AllFilms />} />
          <Route path='/films/:filmId' element={<SingleFilm />} />
        </Routes>
      </MockedProvider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('StarWars movies!')).toBeInTheDocument();
    });
  });

  it('renders films when data is available', async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Routes>
          <Route path='/' element={<AllFilms />} />
          <Route path='/films/:filmId' element={<SingleFilm />} />
        </Routes>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Film 1')).toBeInTheDocument();
      expect(screen.getByText('Film 2')).toBeInTheDocument();
    });
  });

  it('renders error message when there is an error', async () => {
    const errorMock = [
      {
        request: {
          query: ALL_FILMS_QUERY,
        },
        error: new Error('An error occurred'),
      },
    ];

    renderWithRouter(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Routes>
          <Route path='/' element={<AllFilms />} />
          <Route path='/films/:filmId' element={<SingleFilm />} />
        </Routes>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });
  });
});
