import React from 'react'; 
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
    return(
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact component = {Home}/>
                <Route path="/trending" exact component = {Trending}/>
                <Route path="/profil" exact component = {Profil}/>
                <Redirect to = "/"/>
            </Switch>
        </Router>
    )
}; 

export default index;