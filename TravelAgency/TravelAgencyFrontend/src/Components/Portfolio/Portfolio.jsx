import React from 'react';
import './Portfolio.css';

import icon2 from '../../Assets/destination.png';
import image from '../../Assets/grid.jpg';
import icon1 from '../../Assets/protection.png';
import icon3 from '../../Assets/technical-support.png';

const Portfolio = () => {
    return (
        <div id="aboutUsSection" className='portfolio section container'>
            <div className="secContainer grid">
                <div className="leftContent">
                    <div className="secHeading">
                        <h3>What Makes Us Different</h3>
                        <p>We create personalized, unforgettable travel experiences with 24/7 support,
                            insider knowledge, and a commitment to sustainable travel.</p>
                    </div>

                    <div className="grid">
                        <div className="singlePortfolio flex">
                            <div className="iconDiv">
                                <img src={icon1} alt="Icon image" />
                            </div>

                            <div className="infor">
                                <h4>Security and Assistance</h4>
                                <p>We prioritize your safety with comprehensive measures and offer 24/7
                                    support to ensure a smooth,
                                    worry-free travel experience. Trust us to handle every detail,
                                    so you can focus on enjoying your journey.</p>
                            </div>
                        </div>
                        <div className="singlePortfolio flex">
                            <div className="iconDiv">
                                <img src={icon2} alt="Icon image" />
                            </div>

                            <div className="infor">
                                <h4>Variety of Destinations</h4>
                                <p>Whether you're exploring locally or venturing abroad,
                                    our extensive selection of destinations caters to a variety of interests
                                    and preferences, ensuring a memorable experience for every traveler.</p>
                            </div>
                        </div>
                        <div className="singlePortfolio flex">
                            <div className="iconDiv">
                                <img src={icon3} alt="Icon image" />
                            </div>

                            <div className="infor">
                                <h4>24/7 Customer Support</h4>
                                <p>Our dedicated team provides round-the-clock assistance, ensuring that
                                    your travel experience is smooth and stress-free. We're here to help,
                                    no matter the time or the situation.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightContent">
                    <img src={image} alt="Image" />
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
