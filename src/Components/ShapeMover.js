import React from "react";
import Navbar  from './Navbar';
import MatrixTransformations from '../Helpers/MatrixTransformations.js';

var HEIGTH = 540
var WIDTH = 880

class ShapeMover extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = {
        value: '',
     
        Ax:'',
        Ay:'',
          
        Bx:'',
        By:'',
            
        Cx:'',
        Cy:''
           
      
          }
         
          this.drawGrid=this.drawGrid.bind(this)
          this.draw=this.draw.bind(this)
         
          this.AxInputValue = this.AxInputValue.bind(this)
          this.AyInputValue = this.AyInputValue.bind(this)
         
          this.BxInputValue = this.BxInputValue.bind(this)
          this.ByInputValue = this.ByInputValue.bind(this)
         
          this.CxInputValue = this.CxInputValue.bind(this)
          this.CyInputValue = this.CyInputValue.bind(this)
      }
 
    drawGrid () 
    {
        //Grey grid drawing
        let ctx =  this.refs.canvas.getContext('2d')
        let s = 10
        let pL = s-10
        let pT = s-10
        let pR = s-10
        let pB = s-10
        ctx.strokeStyle = 'lightgrey'
        ctx.beginPath()
        for (var x = pL; x <= WIDTH - pR; x += s) {
            ctx.moveTo(x, pT)
            ctx.lineTo(x, HEIGTH - pB)
        }
        for (var y = pT; y <= HEIGTH+5 - pB; y += s) {
            ctx.moveTo(pL, y)
            ctx.lineTo(WIDTH - pR, y)
        }
        ctx.stroke()
        ctx.closePath()
     
        //Coordinate system drawing
        ctx.beginPath();
        ctx.strokeStyle = '#373F41'
        let oldCoordStart =[0,0]
        let MTstart = new MatrixTransformations(oldCoordStart)
        let newCoordStart = MTstart.move(WIDTH/2,HEIGTH/2)

        ctx.moveTo(0, newCoordStart[1])   
        ctx.lineTo(WIDTH ,newCoordStart[1])
        ctx.stroke()
        ctx.moveTo(newCoordStart[0],0)
        ctx.lineTo(newCoordStart[0] ,HEIGTH)
        ctx.stroke()

        let counter = -(WIDTH/2)/10
        for (var i = 0; i <= WIDTH ; i += 10) 
        {
            ctx.moveTo(i, newCoordStart[1]-2)
            ctx.lineTo(i, newCoordStart[1]+2)
            if(i%40==0)
            {   if(counter==0)
                {
                    ctx.font = "7px ";
                    ctx.fillText(counter, i,  newCoordStart[1]+10);
                    counter+=4
                    
                }
                else{
                ctx.font = "7px";
                ctx.fillText(counter, i-4,   newCoordStart[1]+10);
                counter+=4
                
                }
                ctx.stroke()
            }
        }
        counter = ((HEIGTH/2)-10)/10
        for (var i = 5; i <= HEIGTH ; i += 10) 
        {
            ctx.moveTo(newCoordStart[0]-2, i-5)
            ctx.lineTo(newCoordStart[0]+2, i-5)
            if(i%40==5)
            {   if(counter==0)
                {
                    ctx.font = "7px ";
                    ctx.fillText(counter, newCoordStart[0]-15,  i+10);
                    counter-=4
                    
                }
                else{
                ctx.font = "7px";
                ctx.fillText(counter, newCoordStart[0]-17,   i+10);
                counter-=4
                
                }
                ctx.stroke()
            }
        }
        ctx.closePath() 

        // Y=X Axis drawing
        ctx.beginPath()
        ctx.strokeStyle = '#373F41'
        ctx.moveTo((WIDTH-HEIGTH)/2, HEIGTH)
        ctx.lineTo((WIDTH+HEIGTH)/2,0)
        ctx.stroke()
        ctx.beginPath()

    }
    componentDidMount() {
        this.drawGrid()
    }
    
    draw()
    {
        var ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath()
        ctx.clearRect(0, 0, WIDTH, HEIGTH);
        ctx.closePath()
        this.drawGrid()


        //starting triangle drawing
        let Adot = new MatrixTransformations([this.state.Ax, this.state.Ay])
        let Bdot = new MatrixTransformations([this.state.Bx, this.state.By])
        let Cdot = new MatrixTransformations([this.state.Cx, this.state.Cy])

        Adot.move(WIDTH/2,HEIGTH/2)
        Bdot.move(WIDTH/2,HEIGTH/2)
        Cdot.move(WIDTH/2,HEIGTH/2)

        Adot.transformOverX()
        Bdot.transformOverX()
        Cdot.transformOverX()

        Adot.move(0,HEIGTH)
        Bdot.move(0,HEIGTH)
        Cdot.move(0,HEIGTH)

       ctx.beginPath();
        ctx.strokeStyle = '#373F41'
        ctx.moveTo(Adot.dot[0], Adot.dot[1]); 

        ctx.lineTo(Cdot.dot[0],Cdot.dot[1]); //A->C
        ctx.stroke()

        ctx.lineTo(Bdot.dot[0], Bdot.dot[1]); //C->B
        ctx.stroke()

        ctx.lineTo(Adot.dot[0],Adot.dot[1]) //B->A
        ctx.stroke()
        ctx.closePath();


    //Y=X triangle drawing 
     Adot = new MatrixTransformations([this.state.Ax, this.state.Ay])
     Bdot = new MatrixTransformations([this.state.Bx, this.state.By])
     Cdot = new MatrixTransformations([this.state.Cx, this.state.Cy])

     Adot.transform()
     Bdot.transform()
     Cdot.transform()

     Adot.move(WIDTH/2,HEIGTH/2)
     Bdot.move(WIDTH/2,HEIGTH/2)
     Cdot.move(WIDTH/2,HEIGTH/2)

     Adot.transformOverX()
     Bdot.transformOverX()
     Cdot.transformOverX()

    Adot.move(0,HEIGTH)
    Bdot.move(0,HEIGTH)
    Cdot.move(0,HEIGTH)



       ctx.beginPath();
        ctx.strokeStyle = '#3C64B1'
        ctx.moveTo(Adot.dot[0], Adot.dot[1]); 

        ctx.lineTo(Cdot.dot[0],  Cdot.dot[1]); //A->C
        ctx.stroke()

        ctx.lineTo(Bdot.dot[0], Bdot.dot[1]); //C->B
        ctx.stroke()

        ctx.lineTo(Adot.dot[0],  Adot.dot[1]) //B->A
        ctx.stroke()
        ctx.closePath();
    }

    AxInputValue(evt) 
    {
        this.setState({Ax:   evt.target.value*10});
    }
    AyInputValue(evt) 
    {
        this.setState({Ay:  evt.target.value*10});
    }
    BxInputValue(evt) 
    {
        this.setState({Bx: evt.target.value*10});
    }
    ByInputValue(evt) 
    {
        this.setState({By: evt.target.value*10});
    }
    CxInputValue(evt) 
    {
        this.setState({Cx: evt.target.value*10});
    }
    CyInputValue(evt) 
    {
        this.setState({Cy: evt.target.value*10});
    }
    render()
    {
        return(
            <div>
                 <Navbar id="navbar"/>
            <div className ="content-column fractal-canvas" >
           
                <canvas ref="canvas" height ="545" width= "880"></canvas>
            </div>
            <input  onChange={this.AxInputValue}/>
            <input  onChange={this.AyInputValue}/>
            <br></br>
            <input  onChange={this.BxInputValue}/>
            <input  onChange={this.ByInputValue}/>
            <br></br>
            <input  onChange={this.CxInputValue}/>
            <input  onChange={this.CyInputValue}/>

            <button onClick={this.draw}>DRAW</button>
            </div> )
    }
}
export default ShapeMover



