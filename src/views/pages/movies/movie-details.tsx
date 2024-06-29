import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Example of using axios for API requests

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        // Fetch movie details from backend API based on ID
        axios.get(`/api/movies/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Error fetching movie details:', error));
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Director: {movie.director}</p>
            {/* Additional movie details */}
            <Link to={`/customer/movies/${id}/book`}>Book Tickets</Link>
            {/* Additional actions based on movie details */}
        </div>
    );
};

export default MovieDetails;
