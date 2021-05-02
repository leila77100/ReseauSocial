import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getTrends } from '../actions/post.actions';
import { isEmpty } from './utils';
import { NavLink } from "react-router-dom";

const Trends = () => {

    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            // allows you to transform the data which is in the form of an object into an array to perform a sorting
            const postsArr = Object.keys(posts).map((i) => posts[i]);
            // a is the smallest and b is the biggest
            let sortedArray = postsArr.sort((a, b) => {
                // return the posts most liked at least liked
                return b.likers.length - a.likers.length;
            })
            sortedArray.length = 4;
            dispatch(getTrends(sortedArray))

        }

    }, [posts, dispatch])

    return (
        <div>
            <div className="trending-container">
                <h4>Trending</h4>
                <NavLink exact to="/trending">
                    <ul>
                        {trendList.length &&
                            trendList.map((post) => {
                                return (
                                    <li key={post._id}>
                                        <div>
                                            {post.picture && <img src={post.picture} alt="post-pic" />}
                                            {post.video && (
                                                <iframe
                                                    src={post.video}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title={post._id}
                                                ></iframe>
                                            )}
                                            {isEmpty(post.picture) && isEmpty(post.video) && (
                                                <img src= {usersData[0] && usersData.map((user)=> {
                                                    if(user._id === post.posterId){
                                                      return user.picture;   
                                                    } else return null; 
                                                }).join("")
                                            } alt = "profil-pic"/>
                                            )}
                                        </div>
                                        <div className="trend-content">
                                            <p>{post.message}</p>
                                            <span>Lire</span>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                </NavLink>
            </div>
        </div>
    );
};

export default Trends;