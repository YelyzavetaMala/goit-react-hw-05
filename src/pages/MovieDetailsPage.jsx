import { useLocation } from 'react-router-dom';

function MovieDetailsPage() {
  const location = useLocation();

  const handleGoBack = () => {
    const { state } = location;
    if (state && state.from) {
      history.push(state.from);
    } else {
      history.goBack();
    }
  };

  return (
    <div>
      <h1>Movie Details Page</h1>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default MovieDetailsPage;