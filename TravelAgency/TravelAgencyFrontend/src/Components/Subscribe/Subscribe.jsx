import React from 'react';
import './Subscribe.css';

import Image from '../../Assets/laddy.jpg';

const Subscribe = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div id="subscribeSection" className='subscribe section container'>
            <div className="secContainer grid">
                <img src={Image} alt="Div Image" />

                <div className="textDiv">
                    <h4>Best Way To Start Your Journey!</h4>
                    <p>We offer customized itineraries tailored to your specific preferences and interests.</p>
                    <button className='btn' onClick={() => scrollToSection('destinationSection')}>
                        Start here
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Subscribe;
