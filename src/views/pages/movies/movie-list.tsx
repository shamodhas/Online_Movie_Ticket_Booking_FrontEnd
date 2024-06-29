import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Example of using axios for API requests

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies from backend API
        axios.get('/api/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div>
            <h2>Available Movies</h2>
            {movies.map((movie:any) => (
                <div key={movie._id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <Link to={`/customer/movies/${movie._id}`}>View Details</Link>
                    {/* Additional movie details and actions */}
                </div>
            ))}
        </div>
    );
};

export default MovieList;
