import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  return <div>Movie Details Page - Movie ID: {movieId}</div>;
};

export default MovieDetailsPage;