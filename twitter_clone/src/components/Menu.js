import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

class Menu extends Component{
    constructor() {
        super();

        this.state = {

        }
        // this.setActiveTab = this.setActiveTab.bind(this)
    }
    // changeCurrentPageComponent(e){
    //     e.preventDefault();


    // }
    render(){
        return(
            <>
                <ul>
                    <li><Link to="/feed"  >Home</Link></li>
                    <li><Link to="/">Profile</Link></li>
                    <li><Link to="/News">Messages</Link></li>
                    <li>Connect</li>
                    <li><Link to="/FollowRecommendations">Profile</Link></li>
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
