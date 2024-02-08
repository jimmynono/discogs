# Discogs Take Home

## The App

A simple GraphQL app to display some information for Star Wars movie. I used the Apollo client to handle queries and caching. User selects a movie to learn more.

to run `npm install` and then `npm run dev` to start the app on `localhost:5173`

I used ReactRouter to move to movie details and make the GraphQL queries dynamic based on the route.

I did add a unit test for AllFilms, but just couldn't get the tests for SingleFilms to work right, a trade-off due to time contraints for sure. Also, React-Router just added to the complexity.
`npm run test` will run the test watcher.

I brought in TypeScript to type the data coming in from the API.

100% score on lighthouse run for accesibilty.
