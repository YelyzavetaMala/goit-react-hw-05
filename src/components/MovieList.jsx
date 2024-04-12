import { Link, useLocation } from "react-router-dom";


const MovieList = ({ movieList }) => {
	const location = useLocation();
	return (
		<ul> {movieList &&
			Array.isArray(movieList) &&
			movieList.map((movie, index) => {
				return (
					<li key={`${movie.id}_${index}`}>
						<Link to={`/movies/${movie.id}`} state={{ from: location }}></Link>
					</li>
				);
			})}
		</ul>
	);
};

export default MovieList;