import { useHistory } from 'react-router-dom';

function MovieDetailsPage() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); 
  };

  return (
    <div>
      <h1>Movie Details Page</h1>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default MovieDetailsPage;