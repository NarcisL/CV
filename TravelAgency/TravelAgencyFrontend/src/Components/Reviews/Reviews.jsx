import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import './Reviews.css';

import Image1 from '../../Assets/Client01.jpeg';
import Image2 from '../../Assets/Client02.jpg';
import Image3 from '../../Assets/Client03.jpg';
import Image4 from '../../Assets/Client04.jpg';
import Image5 from '../../Assets/Client05.jpg';

const Reviews = () => {
    return (
        <div id="reviewsSection" className='review section container'>
            <div className="secContainer grid">
                <div className="textDiv">
                    <span className="redText">FROM OUR CLIENTS</span>
                    <h3>Real Travel Adventures from Our Valued Clients</h3>
                    <p>
                        By sharing their real travel adventures, our valued clients demonstrate
                        the enriching and enjoyable experiences we provide. These authentic stories
                        showcase the unforgettable memories created through our dedicated service.
                    </p>
                    <div className="stars flex">
                        <AiFillStar className='icon'/>
                        <AiFillStar className='icon'/>
                        <AiFillStar className='icon'/>
                        <AiFillStar className='icon'/>
                        <AiFillStar className='icon'/>
                    </div>
                    <div className="clientsImages flex">
                        <img src={Image1} alt="Client 1" />
                        <img src={Image2} alt="Client 2" />
                        <img src={Image3} alt="Client 3" />
                        <img src={Image4} alt="Client 4" />
                    </div>
                </div>
                <div className="imgDiv">
                    <img src={Image5} alt="Div Image" />
                </div>
            </div>
        </div>
    );
}

export default Reviews;
