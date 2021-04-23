import React, { useState } from 'react';
import { Star } from './Star'


const Rating = () => {

    const [rating, setRating] = useState(2);
    const [globalRating, setGlobalRating] = useState([]);
    const [isRating, setIsRating] = useState(false)
    const [averagePost, setAveragePost] = useState()


    let meanings = {
        1: "Fake News! 😒",
        2: "Interessant!😐",
        3: "Top info!🙂",
    };

    let sum = 0;
    let total = 0;

    const average =  async () => {
        for (let i = 0; i < globalRating.length; i++) {
            sum += globalRating[i];
            total =  sum / globalRating.length;
        }
        return setAveragePost(total);
    }
    
    const handleChange = async  (value) => {
        setRating(value);
        setGlobalRating([...globalRating, value]);
        await average(); 
        setIsRating(true);
        
    }
    
    
    console.log("test average", averagePost)
    console.log("global rating", globalRating)
    
    



    return (


        <div>
            <span style={{ position: 'center' }}><p>{meanings[rating]}</p></span>
            <div className="Star">
                <Star
                    count={3}
                    size={40}
                    value={rating}
                    activeColor={'yellow'}
                    inactiveColor={'#ddd'}
                    onChange={handleChange}
                    
                
                />
            </div>

        </div>

    );
};

export default Rating;