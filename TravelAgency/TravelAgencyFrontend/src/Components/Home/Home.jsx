import React from 'react';
import { AiOutlineSwapRight } from 'react-icons/ai';
import Video from '../../Assets/video.mp4';
import './Home.css';

import image1 from '../../Assets/image20.jpg';
import image2 from '../../Assets/image21.jpg';
import image3 from '../../Assets/image22.jpg';
import image4 from '../../Assets/image23.jpg';

const Home = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="Home">
            <div className="videoBg">
                <video src={Video} autoPlay loop muted></video>
            </div>
            <div className="sectionText">
                <h1>Explore Your Dream Adventures with Us!</h1>
                <p>
                    Discover the world's most thrilling adventures,
                    life is too short to stay in one place.
                    Embrace the journey and make every moment count.
                </p>
                <button className="btn flex" onClick={() => scrollToSection('destinationSection')}>
                    GET STARTED <AiOutlineSwapRight className="icon" />
                </button>
            </div>
            <div className="topAttractions">
                <div className="content">
                    <h3>Top Attractions</h3>
                </div>
                <div className="images flex">
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                    <img src={image3} alt="" />
                    <img src={image4} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Home;
