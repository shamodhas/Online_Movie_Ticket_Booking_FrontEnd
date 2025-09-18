import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Example of using axios for API requests

const TheaterList = () => {
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        // Fetch theaters from backend API
        axios.get<any>('/api/theaters')
            .then(response => setTheaters(response.data))
            .catch(error => console.error('Error fetching theaters:', error));
    }, []);

    return (
        <div>
            <h2>Owned Theaters</h2>
            {theaters.map((theater:any) => (
                <div key={theater._id}>
                    <h3>{theater.name}</h3>
                    <p>{theater.location}</p>
                    <Link to={`/theater-owner/theaters/${theater._id}/edit`}>Edit Theater</Link>
                    {/* Additional theater details and actions */}
                </div>
            ))}
        </div>
    );
};

export default TheaterList;
