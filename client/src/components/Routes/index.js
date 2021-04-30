import React from 'react'; 
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';
import NotFound from '../../pages/NotFound';


const index = () => {
    return(
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact component = {Home}/>
                <Route path="/trending" exact component = {Trending}/>
                <Route path="/profil" exact component = {Profil}/>
                <Route component={NotFound}/>
                <Redirect to = "/"/>
            </Switch>
        </Router>
    )
}; 

export default index;