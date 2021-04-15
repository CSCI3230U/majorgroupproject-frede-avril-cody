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
            <div className={`menu`}>
                <ul>
                    <li><Link to="/feed">Home</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/message">Messages</Link></li>
                    <li><Link to="/connect">Connect</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>More</li>
                </ul>
                <div className=".btn">
                    <button type="button">Tweet</button>
                </div>
            </div>

        );
    };
}
export default Menu;
