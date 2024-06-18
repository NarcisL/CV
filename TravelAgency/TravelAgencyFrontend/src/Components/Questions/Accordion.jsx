import React from 'react';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import './Questions.css';

const Accordion = ({ title, desc, active, setActive }) => {
    return (
        <div className='accordionContainer'>
            <span className={`title flex ${(active === title ? 'activeTitle' : '')+ "title" + "flex"}`}>
                {title}
                <span onClick={() => setActive(title)}>
                    {active === title ? (<BsArrowDownCircle className='icon'/>) : (<BsArrowUpCircle className='icon'/>) }
                </span>
            </span>
            <p className={`description ${active === title ? 'show' : ''}`}>
                {desc}
            </p>
        </div>
    );
}

export default Accordion;
