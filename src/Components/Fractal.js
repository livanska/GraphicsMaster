import React from 'react';
import {Complex,moduleComplex,sinComplex,cosComplex,multiplyComplex, addComplex} from '../Helpers/Complex.js';
import "../Style/Text.scss"
import "../Style/Grids.scss"
import "../Style/Dropdown.scss"
import Dropdown from "./Dropdown";


const colorOptions = [
    { key: Array(128,0,0), text: 'Maroon' },
    { key: Array(0,73,24), text: 'Smaragd' },
    { key: Array(90,0,45), text: 'Wine' },
    { key: Array(0,0,70), text: 'Denim' },
    { key: Array(58,37,0), text: 'Chocolate' },
    { key: Array(28,28,28), text: 'Charcoal' }]

const zoomOptions = [
        { key: 1, text: '100% (standart)' },
        { key: 1.2, text: '80%' },
        { key: 1.4, text: '60%' },
        { key: 1.6, text: '40%' },
        { key: 1.8, text: '20%' }]
   /* Maroon 128, 0, 0
    Smaragd 0,73,24
    Wine 90,0,45
    Denim 0,0,70
    Chocolate 58,37,0
    Charcoal 28,28,28*/
    class Fractal extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            colorPal : "128,0,0",
            WIDTH : 880,
            HEIGHT : 545,
            MAX_ITERATION : 100,    
            REAL_SET : { start: -3, end:1},
            IMAGINARY_SET :{ start: -1, end:1 },
            colors:[], 
            zoom : 1
           }
        this.draw = this.draw.bind(this)
        this.clean = this.clean.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleColorChange= this.handleColorChange.bind(this);
        this.handleZoomChange= this.handleZoomChange.bind(this);
    }


    handleColorChange = e => 
    { 
        this.setState({colorPal: e}, () => 
        {
            if (this.props.onChange) 
            {
                this.props.onChange(this.state);
            }
        })
    }

    handleZoomChange = e => 
    {
        this.setState({zoom: Number(e)}, () => 
        {
            if (this.props.onChange) 
            {
                this.props.onChange(this.state);
            }
        })
    }

    handleClick() 
    {
        this.setColors()
        this.setZoom()
        this.draw()
    }

    func(c) 
    {
        let z = new Complex(0,0)
        let prevZ = new Complex(0,0)
        let  iterationNumber = 0, module;
        do {
            let sinZ = sinComplex(prevZ);
            let multZ = (multiplyComplex(sinZ , prevZ))
            z = (addComplex(c,multZ))
            module = moduleComplex(z);
            iterationNumber += 1
            prevZ = z
        } while (module <= 16 && iterationNumber < this.state.MAX_ITERATION)
        return [iterationNumber, Math.abs(module)<= 16,z]
    }
   
    /*getRandomColor() 
    {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }*/

    setColors()
    {
        let str = []
        let color = []
        let prevColors = this.state.colors;
        if(this.state.colorPal != undefined)
        {  
            str = this.state.colorPal.split(",")
            str.forEach(e=> color.push(Number.parseInt(e)))
            this.state.colors =[];
            
            for(let i=0;i<16;i++)
            {  
            let newcolor=[];
            for(let j=0;j<3;j++)
            {   
                newcolor.push(Number((Number(color[j]) + ((255 - Number(color[j])) * 0.1)).toFixed(0)))
            }
            this.state.colors.push(this.rgbToHex(newcolor))
            color = newcolor;
            }  
        }
        else this.state.colors = prevColors

    }
    setZoom()
    {
        let defaultSet = [-2.7,1,-1,1]
        this.state.IMAGINARY_SET.start = Number((defaultSet[2] * this.state.zoom).toPrecision(4))
        this.state.IMAGINARY_SET.end = defaultSet[3] * this.state.zoom
        this.state.REAL_SET.start = defaultSet[0]  * this.state.zoom
        this.state.REAL_SET.end = defaultSet[1] * this.state.zoom
        console.log(this.state.IMAGINARY_SET)
        console.log(this.state.REAL_SET)
    }
    componentToHex(c)
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    rgbToHex(color) 
    {
        console.log(color)
        return "#" + this.componentToHex(color[0]) + this.componentToHex(color[1]) + this.componentToHex(color[2]);
    }

    draw() 
    {
        this.clean()
        var ctx = this.refs.canvas.getContext('2d')
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
        for (let i = 0; i <this.state.WIDTH; i++) 
        {
            for (let j = 0; j < this.state.HEIGHT; j++) 
            {
               let complex = new Complex(
                    // f = i/WIDTH --- scale in 0-1
                    // realPart = f*this.state.REAL_SET.end - this.state.REAL_SET.start --- in range 0-complex plane width
                    // realPart = this.state.REAL_SET.start+realPart --- shift from plane start
                this.state.REAL_SET.start + (i / this.state.WIDTH) * (this.state.REAL_SET.end - this.state.REAL_SET.start),
                 this.state.IMAGINARY_SET.start + (j / this.state.HEIGHT) * (this.state.IMAGINARY_SET.end - this.state.IMAGINARY_SET.start))   
                    
                const [iterations, isFunc] = this.func(complex)
                ctx.fillStyle = this.state.colors[isFunc ? 0 : (iterations % this.state.colors.length - 1) ]
                ctx.fillRect(i, j, 1, 1)
            }
        }
            ctx.closePath()        
    }
    clean()
    {
        var ctx = this.refs.canvas.getContext('2d')
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, 880, 545);
    }

    render() 
    {
        return(
        <div className = "page-content">
            <div className ="content-column fractal-canvas">
                <canvas ref="canvas" height ="545" width= "880"></canvas>
            </div>
      
            <div>
                <div className = "content-column fractal-information">
                    <h1 style ={{"font-size":"48px"}} className ="header-text">Fractal Drawer</h1>
                    <label style ={{"font-size":"24px"}} className = "plain-text">Fractal:  y = z·(sin z)</label>
                    <div  className =  "choose-information">
                        <p style ={{"font-size":"24px"}} className = "plain-text">Choose color schema and scaling value:</p>
                        <div >   
                            <div  className ="content-input">
                            <Dropdown
                            defaultText={"Color schema"}
                            optionsList={colorOptions}
                            onClick={this.handleColorChange}/>
                            </div>
                            <div className ="content-input">
                            <Dropdown
                            defaultText={"Scaling value"}
                            optionsList={zoomOptions}
                            onClick={this.handleZoomChange}/>
                            </div>
                        </div>
                        <button className= "content-button button-primary " onClick = {this.handleClick}>Start</button>
                        
                    </div>
                </div>

            </div>
        </div>
        )   
    }
   
}
export default Fractal;