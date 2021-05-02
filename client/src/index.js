import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// middleware allows us to do asynchronous requests with redux
import thunk from 'redux-thunk';
//import all reducers in reducers/index
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';
import { getPosts} from './actions/post.actions'

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
)
// allows to make accessible users data and posts data in the store when loading the app
store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


