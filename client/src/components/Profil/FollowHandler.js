import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../utils';

const FollowHandler = ({idToFollow, type}) => {

    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const [buttonFollow, setButtonFollow] = useState(false)
    const dispatch = useDispatch();


    const handleFollow = () => {
dispatch(followUser(userData._id, idToFollow));
setIsFollowed(true);
setButtonFollow(true)
    }

    const handleUnFollow = () => {
dispatch(unfollowUser(userData._id, idToFollow)); 
setIsFollowed(false);
setButtonFollow(false)
    }

    useEffect(() => {
if (!isEmpty(userData.following)){
    if (userData.following.includes(idToFollow)){
        setIsFollowed(true);
        setButtonFollow(true);
    } else setIsFollowed(false);
}
    }, [userData, idToFollow]);

    return (
       <>
       {isFollowed && !isEmpty(userData) && (
       <span onClick={handleUnFollow}>
           {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
           {type === "card" && <img src = "./img/icons/checked.svg" alt ="checked" />}
       </span>
       )}
       {!isFollowed  && !isEmpty(userData) && (
           <span onClick={handleFollow}>
           {type === "suggestion" && <button className="follow-btn">Suivre</button> }
           {type === "card" && <img src = "./img/icons/check.svg" alt ="check" />}
       </span>
       )}
       </>
    );
};

export default FollowHandler;