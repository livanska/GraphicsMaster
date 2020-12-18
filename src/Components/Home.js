import React from "react";
import {Route,Router,Link,  BrowserRouter,Switch } from 'react-router-dom';
import Logo from '../Resources/Images/Logo.svg'
import TopText from '../Resources/Images/Home-top-text.svg'
import BottomText from '../Resources/Images/Home-bottom-text.svg'
import Triangle from '../Resources/Images/Triangle-icon.svg'
import Palette from '../Resources/Images/Palette-icon.svg'
import Brain from '../Resources/Images/Brain-icon.svg'
import "../Style/Grids.scss"
class Home extends React.Component {


    render()
    {
        return(
            <div>
                
                <div className= "home-background"> 
                <img className="home-top-text" src={TopText} />
                <p style ={{"fontSize":"100px"}} className ="home-header">Graphics Master</p>
                <p className ="home-quote">“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.” </p>
                <p className ="home-quote quote-autor">- Antoine de Saint-Exupéry</p>
                <img className="home-logo" src={Logo} />
               <img className="home-bottom-text" src={BottomText} />
                </div>
                <div className ="home-columns">
                    <div className ="home-column">
                    <img className="home-column-icon" src={Brain} />
                    <p style ={{"fontSize":"24px"}} className ="home-column-header">Fractal Drawer</p>
                    <p  style ={{"fontSize":"18px"}}className ="home-column-info"> Fractals are created by repeating a simple process over and over in an ongoing feedback loop. Driven by recursion, fractals are images of dynamic systems – the pictures of Chaos.</p>
                    <Link style ={{"fontSize":"20px"}} className ="home-column-link" to={{ pathname: '/fractal_drawer' }}>Start</Link>
                    </div>

                    <div className ="home-column">
                    <img className="home-column-icon" src={Palette} />
                    <p  style ={{"fontSize":"24px"}} className ="home-column-header">Color Model</p>
                    <p style ={{"fontSize":"18px"}} className ="home-column-info">Color model is a system that uses three primary colors to create a larger range of colors. They are used for different purposes, and each has a  different range of colors they can produce.</p>
                    <Link style ={{"fontSize":"20px"}} className ="home-column-link" to={{ pathname: '/color_model' }}>Start</Link>
                    </div>

                    <div className ="home-column">
                    <img className="home-column-icon" src={Triangle} />
                    <p style ={{"fontSize":"24px"}} className ="home-column-header">Shape Mover</p>
                    <p style ={{"fontSize":"18px"}} className ="home-column-info">Affine transformation is a linear mapping method that preserves points, straight lines, and planes. Sets of parallel lines remain parallel after an affine transformation.</p>
                    <Link style ={{"fontSize":"20px"}} className ="home-column-link" to={{ pathname: '/shape_mover' }}>Start</Link>
                    </div>
                </div>
                <div className ="home-help-conteiner">
                    <p style ={{"fontSize":"24px"}} className ="home-column-header">Have some questions?</p>
                    <Link to="/help">
                        <button className ="button-primary">View Help</button>
                    </Link>
                </div>
            </div>
        )
    }
}
export default Home