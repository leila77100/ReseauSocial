import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from "../AppContext";
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { ratingPost } from "../../actions/post.actions";
import { ratingUser } from "../../actions/user.actions";

const RatingStar = ({ post }) => {

    const [newRating, setNewRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [globalRating, setGlobalRating] = useState([]);
    const [isRating, setIsRating] = useState(false);
    const [averagePost, setAveragePost] = useState();

    
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const posts = useSelector((state) => state.postReducer);
    
    
    
    const handleClick = async (ratingValue) => {
        setNewRating(ratingValue);
        setIsRating(true);
        setGlobalRating(ratingValue);
       
        
        return setGlobalRating([...globalRating, ratingValue]);
    }
    
    let sum = 0;
    let total = 0;
    
    let meanings = {
        1: "Fake News! 😒",
        2: "Interessant!😐",
        3: "Top info!🙂",
    };

    const test = () =>{
        
        const newTab= userData.rating
        console.log('averagePost', newTab)
    
}
    
    if (isRating === true) {
        console.log('test irating', isRating)
        dispatch(ratingUser(uid, post._id, newRating))
        console.log('gegegegegeegegegeg');
        
        for (let i = 0; i < globalRating.length; i++) {
            sum += globalRating[i];
            total = sum / globalRating.length;
            setAveragePost(total)
        }
        console.log('test globalrating et isRating', globalRating, newRating)

        setIsRating(false); 
        dispatch(ratingPost(post._id, averagePost));
        test();
    } else {
        console.log('error')
    }
    
    let ratingValue;



    useEffect(() => {

        usersData.map((user) => {
            for (let i = 0; i < user.rating.length; i++) {

                if (user.rating[i].postId === post._id) {
                    setIsRating(true)
                    ratingValue = user.rating[i].ratingP
                    console.log("trjbhflbsdbjlfgalala", ratingValue)
                } 
                else {
                    setIsRating(false)
                }
            }
        })
    }, [averagePost, usersData, userData])



    return (
        <div>

            <div>
                <span style={{ position: 'center' }}><p>{meanings[newRating]}</p></span>
                <div>
                   
                    {[...Array(3)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (

                            <label key={i}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => { handleClick(ratingValue) }}
                                />
                                <FaStar
                                    className="star"
                                    color={ratingValue <= (hover || newRating) ? "#ffc107" : "#e4e5e9"}
                                    size={40}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>


                        );
                    })}

                </div>
            </div>

        </div>
    );
};

export default RatingStar;