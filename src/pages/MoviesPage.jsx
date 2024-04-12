
import { useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      if (query.trim() === '') return;
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWZjM2E4ZjMyNWZiYzM4OTBlYTE4NWFlZDY2MmY4MSIsInN1YiI6IjY2MDZhNmNjYTZkZGNiMDE3YzQ1NDYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkM_fvkRIan3HJ9puXyJ8yBOKxi3QWE2A2yPgiEuWws', 
          query: query
        }
      });
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
     <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <MovieList movieList={movies} />
    </div>
  );
}

export default MoviesPage;
       