import React from "react"
import {Route,Router,  BrowserRouter,Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import Navbar  from './Navbar';
import Fractal from './Fractal';
import ColorModel from  './ColorModel';
import ShapeMover from  './ShapeMover';
import Home from './Home';
import Help from './Help';

class Routes extends React.Component{
    render()
    {
        return(
            <div  >
            <BrowserRouter>

             
                <Route exact path="/" component={Home} />

                <Route path="/fractal_drawer" component={Fractal} />

                <Route path="/color_model" component={ColorModel} />

                <Route path="/shape_mover" component={ShapeMover} />

                <Route path="/help"  component={Help} />
      
            </BrowserRouter>
            </div>
        )
    }
}
export default Routes