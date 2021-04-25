import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser, isEmpty } from '../utils';
import LikeButton from './LikeButton';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from 'react-share';
import Popup from "reactjs-popup";
import RatingStar from './RatingStar';

const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <div>
            <li className="card-container" key={post._id}>
                {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                ) : (
                    <>
                        <div className="card-left">
                            <img src={
                                !isEmpty(usersData[0]) && usersData.map((user) => {
                                    if (user._id === post.posterId) return user.picture
                                    else return null
                                }).join("")
                            }
                                alt="poster-pic"
                            />
                        </div>
                        <div className="card-right">
                            <div className="card-header">
                                <div className="pseudo">
                                    <h3>
                                        {
                                            !isEmpty(usersData[0]) && usersData.map((user) => {
                                                if (user._id === post.posterId) return user.pseudo
                                                else return null
                                            })
                                        }
                                    </h3>
                                    {post.posterId !== userData._id && (
                                        <FollowHandler idToFollow={post.posterId} type={"card"} />
                                    )}
                                </div>
                                <span>{dateParser(post.createdAt)}</span>
                            </div>
                            {isUpdated === false &&
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    flexWrap: "wrap"
                                }}>
                                    <p>{post.message}</p>
                                    <span >
                                        <Popup trigger={<img src='./img/icons/share.svg' alt="share" style={{ cursor: "pointer" }} />} position={
                                            ['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick >
                                            <div>Partager via</div>
                                            <div>
                                                <EmailShareButton>
                                                    <EmailIcon size={32} round={true} />
                                                </EmailShareButton >
                                                <FacebookShareButton
                                                    url={post.video}
                                                    quote={post.title}
                                                    hashtag="#Boolean-Média">
                                                    <FacebookIcon size={32} round={true} />
                                                </FacebookShareButton >
                                                <TelegramShareButton
                                                    title={post.title}>
                                                    <TelegramIcon size={32} round={true} />
                                                </TelegramShareButton >
                                                <TwitterShareButton
                                                    url={post.video}
                                                    via={post.title}
                                                    hashtag="#Boolean-Média">
                                                    <TwitterIcon size={32} round={true} />
                                                </TwitterShareButton >
                                                <RedditShareButton
                                                    title={post.title}
                                                    url={post.video}>
                                                    <RedditIcon size={32} round={true} />
                                                </RedditShareButton >
                                            </div>
                                        </Popup>
                                    </span>
                                </div>
                            }

                            {isUpdated && (
                                <div className="update-post">
                                    <textarea
                                        defaultValue={post.message}
                                        onChange={(e) => setTextUpdate(e.target.value)}
                                    />
                                    <div className="button-container">
                                        <button className="btn" onClick={updateItem} >
                                            Valider modification
        </button>
                                    </div>
                                </div>
                            )}
                            {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
                            {post.video && (
                                <iframe
                                    width="500"
                                    height="300"
                                    src={post.video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={post._id}
                                ></iframe>
                            )}
                            {userData._id === post.posterId && (
                                <div className="button-container">
                                    <div onClick={() => setIsUpdated(!isUpdated)}>
                                        <img src='./img/icons/edit.svg' alt="edit" />
                                    </div>
                                    <DeleteCard id={post._id} />
                                </div>
                            )}
                            <div className="card-footer">
                                <div className="comment-icon">
                                    <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment" />
                                    <span>{post.comments.length}</span>
                                </div>
                                <div>
                                    <RatingStar post={post} />
                                </div>
                                <div>
                                    <LikeButton post={post} />
                                </div>
                            </div>
                            {showComments && <CardComments post={post} />}
                        </div>
                    </>
                )}
            </li>
        </div>
    );
};

export default Card;