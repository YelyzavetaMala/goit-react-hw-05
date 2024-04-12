import { useState, useEffect } from 'react';
import axios from 'axios';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            params: {
              api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWZjM2E4ZjMyNWZiYzM4OTBlYTE4NWFlZDY2MmY4MSIsInN1YiI6IjY2MDZhNmNjYTZkZGNiMDE3YzQ1NDYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkM_fvkRIan3HJ9puXyJ8yBOKxi3QWE2A2yPgiEuWws' 
            }
          }
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Movie Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;