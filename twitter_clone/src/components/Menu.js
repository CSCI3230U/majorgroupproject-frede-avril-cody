import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component{
    render(){
        return(
            <>
                <ul>
                    <li><Link to="/feed">Home</Link></li>
                    <li><Link to="/">Profile</Link></li>
                    <li><Link to="/messages">Messages</Link></li>
                    <li>Connect</li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>More</li> 
                </ul>
                <div className=".btn">
                    <button type="button">Tweet</button>
                </div>
            </>
        );
    };
}
export default Menu;
