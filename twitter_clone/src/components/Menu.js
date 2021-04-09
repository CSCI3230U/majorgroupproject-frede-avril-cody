import React, {Component} from 'react';

class Menu extends Component{
    render(){
        return(
            <>
                <ul>
                    <li>Home</li>
                    <li>Explore</li>
                    <li>Messages</li>
                    <li>Connect</li>
                    <li>Profile</li>
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
