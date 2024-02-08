export type Film = {
  title: string;
};

export type AllFilm = {
  allFilms: {
    films: Film[];
  };
};

export type FilmDetails = {
  characterConnection: {
    characters: Character[];
  };
  director: string;
  title: string;
  openingCrawl: string;
  releaseDate: string;
};

export type Character = {
  name: string;
};
