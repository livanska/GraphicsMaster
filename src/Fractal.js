import React from 'react';
import {Complex,moduleComplex,sinComplex,cosComplex,multiplyComplex, addComplex} from './Complex.js';
import Dropdown from './Dropdown';
const options = [
    { key: Array(128,0,0), text: 'Maroon' },
    { key: Array(0,73,24), text: 'Smaragd' },
    { key: Array(90,0,45), text: 'Wine' },
    { key: Array(0,0,70), text: 'Denim' },
    { key: Array(58,37,0), text: 'Chocolate' },
    { key: Array(28,28,28), text: 'Charcoal' }]

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
            WIDTH : 1000,
            HEIGHT : 400,
            MAX_ITERATION : 100,    
            REAL_SET : { start: -3, end:4},
            IMAGINARY_SET :{ start: -1, end:1 },
           colors:[] //:new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
        }
        this.draw = this.draw.bind(this)
        this.clean = this.clean.bind(this);
       this.handleClick = this.handleClick.bind(this);
    }

    handleChange = e => 
    {
        console.log(e.target.value)
        this.setState({colorPal: e.target.value }, () => 
        {
            if (this.props.onChange) 
            {
                this.props.onChange(this.state);
            }
        })
      //console.log(this.state.colorPal)
    }

    handleClick(event) {
       // let res = this.menu.value;
       //this.state.colorPal =  event.target.value;
       //this.setState({reload: ""})
       //var ctx = this.refs.canvas.getContext('2d')
      // ctx.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
      this.setState({colorPal: event.value })
        this.setColors()
        //console.log("This is: "+this.state)
        //console.log("Colors:  "+this.state.colors);
        this.draw()
        //event.preventDefault();
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
          //  console.log("z: "+z.real+" "+z.imaginary)
           // console.log("prevZ: "+prevZ.real+" "+prevZ.imaginary)
           // console.log("module: "+module)
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
  
        //let ColorCount = 0;
        var ctx = this.refs.canvas.getContext('2d')
        //ctx.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
        //ctx.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
        //ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
        //ctx.beginPath();
       // ctx.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
       //let complex = new Complex(-0.75,0)
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
                //complex.setComplex()
     
                ctx.fillStyle = this.state.colors[isFunc ? 0 : (iterations % this.state.colors.length - 1) ]

                ctx.fillRect(i, j, 1, 1)
                //break
            }
           // break
        }
        
        ctx.closePath()    
             // a = Math.sin(a) * Math.cos(a) * (Math.pow(Math.sinh(b), 2) + Math.pow(Math.cosh(b), 2)) + a;
             // b = Math.sinh(b) * Math.cosh(b) * (Math.pow(Math.cos(a), 2) - Math.pow(Math.sin(a), 2)) + b;
        
        
    }
    clean()
    {
        var ctx = this.refs.canvas.getContext('2d')
        //ctx.clearRect(0, 0, 1000, 400);
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, 1000, 400);
    }

    render() 
    {
        return(
        <div>
            <canvas ref="canvas" height ="400" width= "600"></canvas>
            <label>
                <input
                name="colorPal"
                type="text"
                ref={myinput => (this.input = myinput)} />
                <div>
                <Dropdown options={options}  onChange={this.handleChange} />
                </div>
            </label>
            <button className="button-primary" onClick = {this.handleClick}>dvfdrvgfedrf</button>
            <button onClick = {this.clean}>clean</button>
        </div>)   
    }
   
}
export default Fractal;