import React, {Component} from 'react';

class Tweet extends Component{
     render(){
          return(
               <>
                    <div>
                         <div className="ProfilePic"></div>
                         <div className="Tweet">
                              <div className="text"></div>
                              <div className="extras">
                                   <div className="icon"></div>
                                   <div className="icon"></div>
                                   <div className="icon"></div>
                                   <div className="icon"></div>
                                   <div className="icon"></div>
                              </div>
                              <div className="Submit"></div>
                         </div>

                    </div>
               </>
          );
     };
}

export default Tweet;
