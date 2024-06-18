import React from 'react';
import './Footer.css';

import { AiFillInstagram } from 'react-icons/ai';
import { BsTwitterX } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';
import { ImFacebook } from 'react-icons/im';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="secContainer container grid">
                <div className="logoDiv">
                    <div className="footerLogo">
                    <FaMapLocationDot className='icon'/>
                    <span>SMART TRAVEL</span>
                    </div>
                    <div className="socials flex">
                            <ImFacebook className='icon'/>
                            <BsTwitterX className='icon'/>
                            <AiFillInstagram className='icon'/>
                        </div>
                </div>

                        <div className="footerLinks">
                            <span className="linkTitle">
                                Information
                            </span>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Explore</a>
                            </li>
                            <li>
                                <a href="#">Travel</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>

                        </div>
                        <div className="footerLinks">
                            <span className="linkTitle">Helpful Links</span>
                            <li>
                                <a href="#">Destination</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Travel & Condition</a>
                            </li>
                            <li>
                                <a href="#">Privacy</a>
                            </li>
                        </div>

                    <div className="footerLinks">
                        <span className="linkTitle">Contact Details</span>
                        <span className="phone">+40 200 700 700</span>
                        <span className="email">smarttravel@gmail.com</span>
                    </div>
                
            </div>
        </div>
    );
};

export default Footer