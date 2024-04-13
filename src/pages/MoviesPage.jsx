import { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieDetailsPage from './MovieDetailsPage';
import NotFoundPage from './NotFoundPage';

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchQuery}`,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWZjM2E4ZjMyNWZiYzM4OTBlYTE4NWFlZDY2MmY4MSIsInN1YiI6IjY2MDZhNmNjYTZkZGNiMDE3YzQ1NDYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkM_fvkRIan3HJ9puXyJ8yBOKxi3QWE2A2yPgiEuWws'
          }
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={handleGoBack}>Go Back</button>

      <Switch>
        <Route exact path={location.pathname}>
          <MovieList movies={searchResults} />
        </Route>
        <Route path={`${location.pathname}/:movieId`} component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default MoviesPage;