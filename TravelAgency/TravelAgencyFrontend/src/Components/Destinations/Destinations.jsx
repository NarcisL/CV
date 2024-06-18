import React, { useEffect, useState } from 'react';
import './Destinations.css';
import { BiSearchAlt } from 'react-icons/bi';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { TiLocation } from 'react-icons/ti';
import image01 from '../../Assets/image01.jpeg';
import image02 from '../../Assets/image02.jpg';
import image03 from '../../Assets/image03.jpg';
import image04 from '../../Assets/image04.jpg';
import image05 from '../../Assets/image05.jpg';
import image06 from '../../Assets/image06.jpg';
import image07 from '../../Assets/image07.jpg';
import image08 from '../../Assets/image08.jpg';

const hardcodedDestinations = [
    { id: 1000, name: 'any', location: 'any', rating: 0, cost: 0 },
    {
        id: 1,
        img: image01,
        name: 'Morocco',
        location: 'North Africa',
        rating: 5.0,
        cost: 1200,
    },
    {
        id: 2,
        img: image02,
        name: 'Romania',
        location: 'Southeastern Europe',
        rating: 4.1,
        cost: 250,
    },
    {
        id: 3,
        img: image03,
        name: 'Seychelles Island',
        location: 'Indian Ocean',
        rating: 4.3,
        cost: 1000,
    },
    {
        id: 4,
        img: image04,
        name: 'Turkey',
        location: 'Peninsula',
        rating: 4.8,
        cost: 650,
    },
    {
        id: 5,
        img: image05,
        name: 'Maldives',
        location: 'Indian Ocean',
        rating: 4.6,
        cost: 700,
    },
    {
        id: 6,
        img: image06,
        name: 'France',
        location: 'Western Europe',
        rating: 4.9,
        cost: 400,
    },
    {
        id: 7,
        img: image07,
        name: 'Italy',
        location: 'Southern Europe',
        rating: 4.8,
        cost: 300,
    },
    {
        id: 8,
        img: image08,
        name: 'Egypt',
        location: 'Northeastern Africa',
        rating: 4.4,
        cost: 1000,
    }
];

function Destinations({ handleSubmit, isSignedIn, email }) {
    const [destinations, setDestinations] = useState([]);
    const [budget, setBudget] = useState('');
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('1000');

    useEffect(() => {
        setDestinations(hardcodedDestinations);
        setFilteredDestinations(hardcodedDestinations);
    }, []);

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleSearch = () => {
        const budgetNumber = parseInt(budget, 10);
        let filteredData;

        if (selectedLocation === '1000' && !budget) {
            filteredData = destinations.filter(destination => destination.name !== 'any');
        } else if (selectedLocation === '1000' && budget) {
            filteredData = destinations.filter(destination => destination.cost <= budgetNumber && destination.name !== 'any');
        } else if (selectedLocation !== '1000' && !budget) {
            filteredData = destinations.filter(destination => destination.id.toString() === selectedLocation.toString());
        } else {
            filteredData = destinations.filter(destination => destination.id.toString() === selectedLocation.toString() && destination.cost <= budgetNumber);
        }

        setFilteredDestinations(filteredData);
    };

    const handleShowAll = () => {
        const allDestinations = destinations.filter(destination => destination.name !== 'any');
        setFilteredDestinations(allDestinations);
    };

    const handleShowRecommended = () => {
        const recommendedDestinations = destinations.filter(destination => destination.rating >= 4.9);
        setFilteredDestinations(recommendedDestinations);
    };

    const handleShowBeachDestinations = () => {
        const beachDestinations = destinations.filter(destination => destination.name === 'Seychelles Island' || destination.name === 'Maldives');
        setFilteredDestinations(beachDestinations);
    };

    const handleShowParkNatureMountainDestinations = () => {
        const parkNatureMountainDestinations = destinations.filter(destination => 
            destination.name === 'Romania' ||
            destination.name === 'France' ||
            destination.name === 'Italy'
        );
        setFilteredDestinations(parkNatureMountainDestinations);
    };

    const handleBookNow = (destination) => {
        if (!isSignedIn) {
            handleSubmit();
        } else {
            const reservationData = {
                mail: email, // Use the user's email from the signed-in state
                country: destination.name // Get the destination country
            };

            fetch('http://localhost:3000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Reservation created:', data);
                alert('Reservation created successfully!');
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                alert('Error creating reservation. Please try again.');
            });
        }
    };

    return (
        <div id="destinationSection" className="destination section container">
            <div className="secContainer">
                <div className="secTitle">
                    <span className="redText">EXPLORE NOW</span>
                    <h3>Discover Your Ideal Getaway</h3>
                    <p>Please provide the following information to uncover the ideal spot for your upcoming tour.</p>
                </div>

                <div className="searchField grid">
                    <div className="inputField flex">
                        <CiLocationOn className="icon" />
                        {destinations.length > 0 && (
                            <select onChange={handleLocationChange}>
                                {destinations.map(destination => (
                                    <option key={destination.id} value={destination.id}>
                                        {destination.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="inputField flex">
                        <BsCreditCard2BackFill className="icon" />
                        <input type="number" placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
                    </div>
                    <button className="btn flex" onClick={handleSearch}>
                        <BiSearchAlt className="icon" />
                        Search
                    </button>
                </div>

                <div className="secMenu">
                    <ul className="flex">
                        <li className="active" onClick={handleShowAll}>All</li>
                        <li onClick={handleShowRecommended}>Recommended</li>
                        <li onClick={handleShowBeachDestinations}>Beach</li>
                        <li onClick={handleShowParkNatureMountainDestinations}>Park</li>
                        <li onClick={handleShowParkNatureMountainDestinations}>Nature</li>
                        <li onClick={handleShowParkNatureMountainDestinations}>Mountain</li>
                    </ul>
                </div>

                <div className="destinationContainer grid">
                    {filteredDestinations.map((destination, index) => (
                        <div className="singleDestination" key={index}>
                            <div className="imgDiv">
                                <img src={destination.img} alt={destination.name} />
                                <div className="descInfo flex">
                                    <span className="name">{destination.name}</span>
                                    <p className="flex">
                                        <TiLocation className="icon" />
                                        {destination.location}
                                    </p>
                                    {isSignedIn && (
                                        <button className="bookButton" onClick={() => handleBookNow(destination)}>Book Now</button>
                                    )}
                                </div>
                                <span className="rating">{destination.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Destinations;