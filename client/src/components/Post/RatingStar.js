import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa'; 
import {useDispatch} from "react-redux";
import {ratingPost} from "../../actions/post.actions";

const RatingStar = ({post}) => {

    const [rating, setRating] = useState(null); 
    const [hover, setHover] = useState(null);
    const [globalRating, setGlobalRating] = useState([]);
    const [isRating, setIsRating] = useState(false);
    const [averagePost, setAveragePost] = useState();
    const dispatch = useDispatch();


    function handleClick(ratingValue){
        setIsRating(true);
        setGlobalRating(ratingValue);
        average();
        dispatch(ratingPost(post._id, rating));

        return  setGlobalRating([...globalRating, ratingValue]); 
    }
    console.log('test globalrating et isRatin en dehors de la fonction', globalRating, isRating)
 
    let sum = 0;
    let total = 0;
    
    let meanings = {
        1: "Fake News! 😒",
        2: "Interessant!😐",
        3: "Top info!🙂",
    };
    
    async function average(){
        for (let i = 0; i < globalRating.length; i++) {
            sum += globalRating[i];
            total =  sum / globalRating.length;
            setAveragePost(total)
        }
        
        dispatch(ratingPost(post._id, rating))
        
        return averagePost;
    }
    
    console.log('total f2', averagePost);
    // console.log('test average hors f2', averagePost)

    return (
        
        <div>
             <span style={{ position: 'center' }}><p>{meanings[rating]}</p></span>
        <div>
            {[...Array(3)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                <label>
                    <input 
                    type ="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={()=> { setRating(ratingValue);  handleClick(ratingValue)}} 
                    />
                    <FaStar 
                    className="star" 
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                    size={40}
                    onMouseEnter= {()=> setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                   
                    />
                </label>
            );
            })}
        </div>
        </div>
    );
};

export default RatingStar;