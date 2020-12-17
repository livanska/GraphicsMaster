import React from "react";
import "../Style/Grids.scss"
import ImageLoader from "./ImageLoader"
import "../Style/Slider.scss"
import "../Style/Text.scss"
import "../Style/Grids.scss"
import "../Style/Button.scss"
import ColorConvertor from '../Helpers/ColorConvertor.js';
import Icon from '../Resources/Images/Original-icon.svg'

var original = true;

class ColorModel extends React.Component {
  state = {
    value: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      file:'',
      model:"",
      saturLevel:50,
      originalImg:'',
      hsl:
      {
        h:0,
        s:0,
        l:0
      },
      cmyk:
      {
        c:0,
        m:0,
        y:0,
        k:0
      }
  }
 
 this.handleMouseNoOriginal = this.handleMouseNoOriginal.bind(this)
  this.handleMouseOriginal = this.handleMouseOriginal.bind(this);
  this.handleDownloadClick = this.handleDownloadClick.bind(this);
  
  
}
onChangeSaturLevel = data => {
  this.setState({saturLevel:data.target.value })
   this.convert(data.target.value)
};

onChangeModel = data => {
  this.setState({model:data.target.id})
  console.log(this.state.model)
 
}

convert(satur)
{
  let CC = new ColorConvertor()
  var  imageData;
  var ctx = this.refs.canvas.getContext('2d'); 
  
  if(original)
  {
    imageData = ctx.getImageData(0, 0, 880, 545);
    this.setState({originalImg:imageData})
    original = false
  }
  else
  {
    imageData = this.state.originalImg
  }

  let startRgb=(CC.dataToRgb(imageData.data))
  let endRgb=[]

  if(this.state.model =="HSL") 
  {  
    let startHsl = CC.rgbToHsl(startRgb)
    
    let modifiedHsl = CC.changeSaturationHsl(startHsl,satur)
  
    endRgb  = CC.hslToRgb(modifiedHsl)
  }
  else
  {
    let startCmyk = CC.rgbToCmyk(startRgb)
    let modifiedCmyk = CC.changeSaturationCmyk(startCmyk,satur)
    endRgb = CC.cmykToRgb(modifiedCmyk)
 }

  var newImageData= ctx.createImageData(880,545);

  newImageData= CC.rgbToData(newImageData,endRgb)

  ctx.putImageData(newImageData, 0, 0);
}


handleMouseOriginal()
{
  this.refs.canvas.style.display = "none";
  this.refs.canvas2.style.display = "block";
}
handleMouseNoOriginal()
{
  this.refs.canvas.style.display = "block";
  this.refs.canvas2.style.display = "none";
}

drawImageScaled(img, ctx) 
{
  var canvas = ctx.canvas ;
  var hRatio = canvas.width  / img.width    ;
  var vRatio =  canvas.height / img.height  ;
  var ratio  = Math.min ( hRatio, vRatio );
  var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
  var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img, 0,0, img.width, img.height,
                     centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
}


  onChangeValueHandler = (val) => {

    var ctx = this.refs.canvas.getContext('2d')
    var ctx2 = this.refs.canvas2.getContext('2d'); 
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 880, 545);

    this.setState({ value: val.target.value })
    
    let reader = new FileReader()
    console.log(val)
    reader.onload = function(event)
    {
      var img = new Image;
 
      img.onload = function() 
      {
        var canvas = ctx.canvas ;
        var hRatio = canvas.width  / img.width    ;
        var vRatio =  canvas.height / img.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
        var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(img, 0,0, img.width, img.height,
                     centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
        
        canvas = ctx2.canvas ;
        hRatio = canvas.width  / img.width    ;
        vRatio =  canvas.height / img.height  ;
        ratio  = Math.min ( hRatio, vRatio );
        centerShift_x = ( canvas.width - img.width*ratio ) / 2;
        centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
        ctx2.clearRect(0,0,canvas.width, canvas.height);
        ctx2.drawImage(img, 0,0, img.width, img.height,
                     centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);    
      }
    img.src = event.target.result;
    
  }
    reader.readAsDataURL(val.target.files[0])
    original = true
  }

  handleDownloadClick()
  {
    this.downloadImage()
  }

  downloadImage()
  {
    const imageDataUrl= this.refs.canvas.toDataURL({pixelRatio: 2})
    var link = document.createElement('a')
    link.download= `Image_${Date.now()}.png`
    link.href = imageDataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log(this.state.value)
   
  }

  _onMouseMove(e) {
    let CC = new ColorConvertor()
    var ctx = this.refs.canvas.getContext('2d')
    let imageData = ctx.getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY,1,1); 

    let hsl = CC.elementRgbToHsl(imageData.data)
    let cmyk = CC.elementRgbToCmyk(imageData.data)
    this.setState({ hsl: {h:hsl[0],s:hsl[1],l:hsl[2]},
                    cmyk: {c:cmyk[0],m:cmyk[1],y:cmyk[2],k:cmyk[3]} });
  }
  startDrawing(e) {
    console.log(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop)
}

  render() {
  
    const { value,hsl,cmyk ,saturLevel} = this.state;
    return (
      
      <div className = "page-content">
    
        <div className ="content-column color-canvas" >
          <div className ="conteiner-row">
            <canvas ref="canvas" className ="original-canvas"   onMouseMove={this._onMouseMove.bind(this)} height ="545" width= "880"></canvas>
            <canvas  ref="canvas2"className ="original-canvas" style={{display:"none"}} height ="545" width= "880"></canvas>
            <button className ="original-button" onMouseEnter = {this.handleMouseOriginal} onMouseLeave= {this.handleMouseNoOriginal}> <img className="navbar-logo" src={Icon} /></button>
            <div className ="color-values">
              <p className= "color-value">HSL [{ hsl.h};{hsl.s};{hsl.l}] </p>
              <p className= "color-value">CMYK [{cmyk.c};{cmyk.m};{cmyk.y};{cmyk.k }]</p>
           </div>
          </div>
        </div>
        <div className = "content-column color-information">
          <div className = "color-inputs">
            <h1 style ={{"fontSize":"48px"}} className ="header-text">Color Model</h1>
            <label style ={{"fontSize":"24px"}} className = "plain-text">Color model:</label>
            <div  className =  "choose-information">
             </div > 
          <div className="tooltip">
            <div class="form-radio" >
            
                <input className="radio-button" name="model" type="radio"  id="HSL" onChange={this.onChangeModel} ></input>
                <label htmlFor="HSL">HSL</label>
        
                <input className="radio-button" name="model" type="radio" id="CMYK" onChange={this.onChangeModel} ></input>
                <label htmlFor="CMYK">CMYK</label><br></br>

              </div>
            <div className = "content-button " >
              <label style ={{"fontSize":"24px",}} className = "plain-text">Yellow color saturation: {saturLevel}</label>
              <input className="scaling" type="range" onChange={this.onChangeSaturLevel} ></input>
              <div className ="slider-values">
                <p  className ="slider-value">0</p><p>100</p></div>
            </div>
          </div>
          <div className ="button-group">
            <ImageLoader  value={value} onChangeValue={this.onChangeValueHandler} />
            <button className= "loader-margins content-button button-primary " onClick ={this.handleDownloadClick}>Download</button>
          </div>
        </div>

      </div>
    
      </div>
    );
  }
}

export default ColorModel


