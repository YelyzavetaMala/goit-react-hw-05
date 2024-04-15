import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useParams, Outlet } from "react-router-dom";
import axios from "axios";

function MovieDetailsPage() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const { movieId } = params;
    if (movieId) {
      fetchMovieDetails(movieId);
    }
  }, [params]);

  const pathGoBack = useRef(location.state ?? "/movies");

  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWZjM2E4ZjMyNWZiYzM4OTBlYTE4NWFlZDY2MmY4MSIsInN1YiI6IjY2MDZhNmNjYTZkZGNiMDE3YzQ1NDYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkM_fvkRIan3HJ9puXyJ8yBOKxi3QWE2A2yPgiEuWws",
          },
        }
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie Details Page</h1>
      <NavLink to={pathGoBack.current}>Go Back</NavLink>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
