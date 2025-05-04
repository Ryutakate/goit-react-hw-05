import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => { 
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getMovieReviews(movieId);
                setReviews(data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [movieId]);
    
    if (reviews.length === 0) return <p>No reviews available.</p>;
    
    return (
        <ul className={css.list}>
            {reviews.map(({ id, author, content }) => (
                <li key={id} className={css.item}>
                    <h4>Author: {author}</h4>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieReviews;
