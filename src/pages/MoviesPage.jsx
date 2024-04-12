import { useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieDetailsPage from './MovieDetailsPage';
import NotFoundPage from './NotFoundPage';

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { path } = useRouteMatch();
  const history = useHistory();

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
            Authorization: 'Bearer api_read_access_token'
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
        <Route exact path={path}>
          <MovieList movies={searchResults} />
        </Route>
        <Route path={`${path}/:movieId`} component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default MoviesPage;