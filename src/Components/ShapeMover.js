import React from "react";
import Navbar  from './Navbar';
import MatrixTransformations from '../Helpers/MatrixTransformations.js';
import Triangle from '../Helpers/Triangle.js';
import "../Style/Dropdown.scss"
import Dropdown from "./Dropdown"
import "../Style/Button.scss"
import "../Style/Text.scss"
import "../Style/Grids.scss"

var HEIGTH = 540
var WIDTH = 880
const zoomOptions = [
    { key: 1, text: '1x (standart)' },
    { key: 2, text: '2x' },
    { key: 3, text: '3x' },
    { key: 4, text: '4x' }]

class ShapeMover extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = {
        value: '',
        zoom : 1,
        Ax:'',
        Ay:'',
          
        Bx:'',
        By:'',
            
        Cx:'',
        Cy:'',
         error:false  
      
          }
         
          this.drawGrid=this.drawGrid.bind(this)
          this.draw=this.draw.bind(this)
         
          this.AxInputValue = this.AxInputValue.bind(this)
          this.AyInputValue = this.AyInputValue.bind(this)
         
          this.BxInputValue = this.BxInputValue.bind(this)
          this.ByInputValue = this.ByInputValue.bind(this)
         
          this.CxInputValue = this.CxInputValue.bind(this)
          this.CyInputValue = this.CyInputValue.bind(this)
          this.handleZoomChange= this.handleZoomChange.bind(this);
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
                    ctx.fillText(counter, i+2,  newCoordStart[1]+10);
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

    componentDidMount() 
    {
        this.drawGrid()
    }
    
    draw()
    {
        var ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath()
        ctx.clearRect(0, 0, WIDTH, HEIGTH);
        ctx.closePath()
        this.drawGrid()

        let triangle  = new Triangle([[this.state.Ax, this.state.Ay],
                                      [this.state.Bx, this.state.By],
                                      [this.state.Cx, this.state.Cy]])
        triangle.zooming(10,10);

        if(!triangle.isValid())
        {
            this.setState({error : true})
            ctx.beginPath()
            ctx.clearRect(0, 0, WIDTH, HEIGTH);
            ctx.closePath()
            this.drawGrid() 
            console.log(this.state.error)
        }
        else
        {
            triangle.move(WIDTH/2,HEIGTH/2)
            triangle.transformOverX()
            triangle.move(0,HEIGTH)

            ctx.beginPath();
            ctx.strokeStyle = '#373F41'
            ctx.moveTo(triangle.A[0], triangle.A[1]); 

            ctx.lineTo(triangle.C[0],triangle.C[1]); //A->C
            ctx.stroke()

            ctx.lineTo(triangle.B[0],triangle.B[1]); //C->B
            ctx.stroke()

            ctx.lineTo(triangle.A[0],triangle.A[1]) //B->A
            ctx.stroke()
            ctx.closePath();

            //Y=X triangle drawing 
            let transfTriangle  = new Triangle([[this.state.Ax, this.state.Ay],
                                                [this.state.Bx, this.state.By],
                                                [this.state.Cx, this.state.Cy]])

            transfTriangle.zooming(10,10);
            transfTriangle.transform();

            transfTriangle.zooming(this.state.zoom,this.state.zoom);
    
            transfTriangle.move(WIDTH/2,HEIGTH/2)
            transfTriangle.transformOverX()
            transfTriangle.move(0,HEIGTH)

            ctx.beginPath();
            ctx.strokeStyle = '#3C64B1'
            ctx.moveTo(transfTriangle.A[0], transfTriangle.A[1]); 

            ctx.lineTo(transfTriangle.C[0],transfTriangle.C[1]); //A->C
            ctx.stroke()

            ctx.lineTo(transfTriangle.B[0],transfTriangle.B[1]); //C->B
            ctx.stroke()

            ctx.lineTo(transfTriangle.A[0],transfTriangle.A[1]) //B->A
            ctx.stroke()
            ctx.closePath();
            this.setState({error : false})
        }
    }

    AxInputValue(evt) 
    {
        
        this.setState({Ax:   evt.target.value});
    }
    AyInputValue(evt) 
    {
       
        this.setState({Ay:  evt.target.value});
    }
    BxInputValue(evt) 
    {
        
        this.setState({Bx: evt.target.value});
    }
    ByInputValue(evt) 
    {
       
        this.setState({By: evt.target.value});
    }
    CxInputValue(evt) 
    {
        
        this.setState({Cx: evt.target.value});
    }
    CyInputValue(evt) 
    {
       
        this.setState({Cy: evt.target.value});
    }
    handleZoomChange(e)
    {
       
        this.setState({zoom: Number(e)})        
    }
    render()
    {
       var{ error } = this.state
        return(
            <div>
                 <Navbar id="navbar"/>
                <div className = "page-content">
                    <div className ="content-column fractal-canvas" >
                        <canvas ref="canvas" height ="545" width= "880"></canvas>
                    </div>
                    <div className = "content-column shape-information">
                        <h1 style ={{"fontSize":"48px"}} className ="header-text">Shape Mover</h1>
                        <label style ={{"fontSize":"24px"}} className = "plain-text">Triangle moving on the trajectory y = x, with  scaling according to the coefficient.</label>
                       
                        <p style ={{"fontSize":"24px","marginBottom":"0px","marginTop":"5px"}} className = {error? "error-text": "plain-text"}>{error? " You can't build triange with such vertices!" : "Triangle vertices:"} </p>
                        <label style ={{"fontSize":"24px"}} className = "plain-text">A:</label>
                        <input className= {error? "coodinate-input-erorr":"coodinate-input"} placeholder="x" onChange={this.AxInputValue}/>
                        <input className= {error? "coodinate-input-erorr":"coodinate-input"} placeholder="y" onChange={this.AyInputValue}/>
                       
                        <label style ={{"fontSize":"24px","marginLeft":"30px"}} className = "plain-text">B:</label>
                        <input className= {error? "coodinate-input-erorr":"coodinate-input"} placeholder="x" onChange={this.BxInputValue}/>
                        <input className= {error? "coodinate-input-erorr":"coodinate-input"}placeholder="y" onChange={this.ByInputValue}/>
                        
                        <label style ={{"fontSize":"24px","marginLeft":"30px"}} className = "plain-text">C:</label>
                        <input className= {error? "coodinate-input-erorr":"coodinate-input"} placeholder="x" onChange={this.CxInputValue}/>
                        <input className= {error? "coodinate-input-erorr":"coodinate-input"} placeholder="y" onChange={this.CyInputValue}/>
                        <div  className ="content-input">
                        <p style ={{"fontSize":"24px","marginBottom":"0px","marginTop":"5px"}} className = "plain-text">Choose scaling value:</p>
                            <Dropdown
                            defaultText={"Scaling value"}
                            optionsList={zoomOptions}
                            onClick={this.handleZoomChange}/>
                        </div>
                        <button className = "content-button button-primary" onClick={this.draw}>Draw</button>
                    </div>
                </div> 
            </div>
            )
    }
}

export default ShapeMover



