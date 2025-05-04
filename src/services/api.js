import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MGZmMWRmOTc2MGU4OWI3ODQ1NDc5NGM2MTQzZSIsIm5iZiI6MTc0NjM4NTY3NS44OCwic3ViIjoiNjgxN2JiMGIwNzE2ZGQ0MTQ0MDhhMmNlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.733xMYEsf3koI5CXn9pA-4RpQON1DnfS9pm7QahN-AM'; 

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: ACCESS_TOKEN,
    },
});

export const getTrendingMovies = async () => {
    const response = await axiosInstance.get('/trending/movie/day');
    return response.data.results;
};

export const searchMovies = async query => {
    const response = await axiosInstance.get('/search/movie', {
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
    });
    return response.data.results;
};

export const getMovieDetails = async movieId => {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
        params: { language: 'en-US' },
    });
    return response.data;
};

export const getMovieCredits = async movieId => {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data;
};

export const getMovieReviews = async movieId => {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return response.data;
};
