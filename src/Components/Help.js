import React from "react";
import Video from  './Video';
import Navbar  from './Navbar';

class Help extends React.Component {

    render()
    {
        return(
            <div>
                <Navbar id="navbar"/>
                <div className = "page-content">
                    <div className ="content-column " >
                        <p>This app is not useful at all, recommend you not to use it.This app is not useful at all, recommend you not to use it</p>
                    </div>
                    <div className ="content-column " >
                    <Video/>
                    </div >
                </div>
            </div>
        )
    }
}
export default Help