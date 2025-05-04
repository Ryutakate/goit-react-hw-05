import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from '../../services/api';
import css from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    
    useEffect(() => {
        const fetchCast = async () => {
            try {
                const data = await getMovieCredits(movieId);
                setCast(data.cast);
            } catch (error) {
                console.error('Error fetching cast:', error);
            }
        };
        fetchCast();
    }, [movieId]);
    
    if (cast.length === 0) return <p>No cast information available.</p>;
    
    return (
        <ul className={css.list}>
            {cast.map(({ id, profile_path, name, character }) => (
                <li key={id} className={css.item}>
                    <img
                        src={
                            profile_path
                                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                                : 'https://via.placeholder.com/200x300?text=No+Image'
                        }
                        alt={name}
                        className={css.img}
                    />
                    <p><strong>{name}</strong></p>
                    <p>as {character}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieCast;
