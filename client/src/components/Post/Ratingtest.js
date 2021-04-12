import React, { useState } from 'react';
import { StarTest } from './StarTest'


const Ratingtest = () => {

    const [rating, setRating] = useState(3)


        let meanings = {
            1: "Fake News! 😒",
            2: "Interessant!😐",
            3: "Top info!🙂",
        };

   
    const handleChange = (value) => {
        setRating(value);
        console.log('test de value', value)
    }

    return (

        <div>

               <span style={{position:'center'}}><p>{meanings[rating]}</p></span>
               <div className="Star">
                <StarTest
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

export default Ratingtest;