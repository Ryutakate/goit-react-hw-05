import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getMovieDetails } from '../../services/api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const backLink = useRef(location.state?.from || '/movies');

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                console.error('Error loading movie details:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    const { poster_path, title, overview, genres, vote_average } = movie;

    return (
        <div className={css.container}>
            <Link to={backLink.current} className={css.goBack}>← Go back</Link>
            <div className={css.details}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    className={css.poster}
                />
                <div>
                    <h2>{title}</h2>
                    <p>User Score: {Math.round(vote_average * 10)}%</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <p>{genres.map(g => g.name).join(', ')}</p>
                </div>
            </div>

            <div className={css.additional}>
                <h3>Additional information</h3>
                <ul>
                    <li>
                        <Link to="cast" state={{ from: backLink.current }}>Cast</Link>
                    </li>
                    <li>
                        <Link to="reviews" state={{ from: backLink.current }}>Reviews</Link>
                    </li>
                </ul>
            </div>

            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
