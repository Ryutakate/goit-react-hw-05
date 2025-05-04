import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (!query) return;
        
        const fetchMovies = async () => {
            try {
                const results = await searchMovies(query);
                setMovies(results);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        };
        
        fetchMovies();
    }, [query]);
    
    const handleSubmit = e => {
        e.preventDefault();
        const value = e.target.elements.search.value.trim();
        if (value === '') return;
        setSearchParams({ query: value });
        e.target.reset();
    };
    
    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit} className={css.form}>
                <input type="text" name="search" placeholder="Search movies..." className={css.input} />
                <button type="submit" className={css.button}>Search</button>
            </form>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
