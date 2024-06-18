import React, { useState } from 'react';
import Accordion from './Accordion';
import './Questions.css';

const Questions = () => {
    const [active, setActive] = useState('How do I choose the right travel destination for me?');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/api/Questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail: email, text: question }), // Match 'mail' and 'text' with backend model fields
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit question');
            }
    
            const data = await response.json();
            console.log('Question submitted successfully:', data);
            setEmail('');
            setQuestion('');
        } catch (error) {
            console.error('Submission failed:', error.message);
        }
    };
    

    return (
        <div className='questions section container'>
            <div className="secHeading">
                <h3>FAQs</h3>
            </div>
            <div className="secContainer grid">
                <div className="accordion grid">
                    <Accordion
                        title='How do I choose the right travel destination for me?'
                        desc='Choosing your perfect travel destination involves evaluating your interests, budget, and preferences. Consider activities, climates, and attractions to make an informed decision. Research destinations aligned with your preferences and offering appealing attractions or activities.'
                        active={active}
                        setActive={setActive}
                    />
                    <Accordion
                        title='What are the best times to visit specific destinations?'
                        desc='The optimal time to visit a destination depends on various factors such as weather, crowd levels, and local events. Researching the climate and peak tourist seasons can help determine the best time for each destination. Additionally, consider personal preferences and activities of interest when planning your trip.'
                        active={active}
                        setActive={setActive}
                    />
                    <Accordion
                        title='What are some tips for finding cost-effective travel choices and special offers?'
                        desc='Exploring budget-friendly travel options and deals can be achieved through various strategies such as booking in advance, being flexible with travel dates, utilizing comparison websites, signing up for travel alerts, considering alternative accommodations, and taking advantage of loyalty programs or special promotions offered by airlines and travel agencies.'
                        active={active}
                        setActive={setActive}
                    />
                    <Accordion
                        title='What are the must-have items to pack for my adventure?'
                        desc='Key essentials to pack for your adventure include versatile clothing suitable for various weather conditions, sturdy footwear, a first aid kit, sunscreen, insect repellent, a reusable water bottle, travel-sized toiletries, a flashlight or headlamp, a multi-tool or knife, a backpack for day trips, and all necessary travel documents such as passports, visas, tickets, and travel insurance information.'
                        active={active}
                        setActive={setActive}
                    />
                </div>
                <div className="form">
                    <div className="secHeading">
                        <h4>Any specific questions on your mind?</h4>
                        <p>Kindly fill in the form below, and our team will connect with you promptly.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="formContent grid">
                        <input
                            type="email"
                            placeholder='Enter email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder='Enter your question here'
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        ></textarea>
                        <button className='btn' type="submit">Submit Inquiry</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Questions;