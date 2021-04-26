import { FOLLOW_USER, UNFOLLOW_USER, GET_USER, UPDATE_BIO, UPLOAD_PICTURE, RATING_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow),
            }
        case RATING_USER: 
        return state.map((post) => {
            if(post._id === action.payload.postId) {
                return {
                    ...post,
                    rating: post.rating.filter((id) =>id !== action.payload.rating)
                }
            }
            return post;
        })
        default:
            return state
    }
}