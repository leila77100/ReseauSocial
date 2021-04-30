import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notFound">
            <div className="notFoundcontent">
                <NavLink exact to="/">
                    <i className="fas fa-home"></i>
                    <span> Accueil</span>
                </NavLink>
                <span>Désolée, cette page n'existe pas!</span>
                <div className="img-container"><br/>
                <img src="./img/notFound.jpg" alt="not-found" width="800" />
                </div>
            </div>
            
        </div>
    );
};

export default NotFound;