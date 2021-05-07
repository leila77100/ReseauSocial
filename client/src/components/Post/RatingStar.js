import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from "../AppContext";
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { ratingPost } from "../../actions/post.actions";
import { ratingUser } from "../../actions/user.actions";
import { isEmpty } from '../utils';

const RatingStar = ({ post }) => {

    const [newRating, setNewRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [globalRating, setGlobalRating] = useState([]);
    const [isRating, setIsRating] = useState(false);
    const [averagePost, setAveragePost] = useState();


    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    // const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    // const posts = useSelector((state) => state.postReducer);



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



    if (isRating === true && !isEmpty(userData.rating)) {
        setIsRating(false);
        dispatch(ratingUser(uid, post._id, newRating))
        dispatch(ratingPost(post._id, newRating));

        for (let i = 0; i < globalRating.length; i++) {
            sum += globalRating[i];
            total = sum / globalRating.length;
            setAveragePost(total)
        }


    } else console.log('error dans ma condition')


    let ratingValue;



    useEffect(() => {
    //    const test = () => userData.rating.map((user)=> {
    //       if (user.postId){
    //           ratingValue= user.ratingP
    //       }
           
    //     })
    //    test()
    }, [averagePost,  userData])



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
                    }
                    )}

                </div>
            </div>

        </div>
    );
};

export default RatingStar;