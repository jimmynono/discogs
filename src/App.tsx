import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllFilms from './components/AllFilms';
import SingleFilm from './components/SingleFilm';

function App() {
  // Simple React Routing to handle multiple page views
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AllFilms />} />
        <Route path='/films/:filmId' element={<SingleFilm />} />
      </Routes>
    </Router>
  );
}

export default App;
