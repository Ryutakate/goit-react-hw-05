import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getTrendingMovies();
                setMovies(data);
            } catch (error) {
                console.error('Failed to fetch trending movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className={css.container}>
            <h1>Trending Today</h1>
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;
