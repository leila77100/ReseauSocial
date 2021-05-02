import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './utils';

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        // allows you to reload the page when you get to the bottom of the scroll (past the 5 comments), display the next 5 
        // then restart the loading of the data posts with the count + 5
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }

    useEffect(() => {
        if (loadPost) {
            // allows you to manage the infinite scroll
            dispatch(getPosts(count));
            setLoadPost(false)
            setCount(count + 5);
        }
// We put a listening on the scroll of the window then we remove this listening with the return
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])
    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />
                    })}
            </ul>
        </div>
    );
};

export default Thread;