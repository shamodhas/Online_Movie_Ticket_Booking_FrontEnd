import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Example of using axios for API requests

const MovieManagement = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies managed by theater owner from backend API
        axios.get('/api/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div>
            <h2>Manage Movies</h2>
            {movies.map(movie => (
                <div key={movie._id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <Link to={`/theater-owner/movies/${movie._id}/edit`}>Edit Movie</Link>
                    {/* Additional movie management actions */}
                </div>
            ))}
        </div>
    );
};

export default MovieManagement;
