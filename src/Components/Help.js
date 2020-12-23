import React from "react";
import Video from  './Video';
import Navbar  from './Navbar';
import "../Style/Text.scss"
import "../Style/Grids.scss"

class Help extends React.Component {

    render()
    {
        return(
            <div className = "help-backgroung">
                <Navbar id="navbar"/>
                <div className = "page-content">
                    <div className ="content-column " style={{"marginRight":"-30px"}}>
                        <p className ="tag-text" style={{"marginTop":"-55px"}}>Help</p>
                        <p className ="header-text" style ={{"fontSize":"48px","marginTop":"-10px","marginBottom":"0px"}} >How to use?</p>
                        <p className ="help-text"><b>Fractal Drawer</b> is an instrument used to draw y = z·(sin z) fractal acorrding to chosen color palette and scaling value. Press button "Draw" to see the result. If those options are not set it will be created in dark-red (wine) color with no scaling by default. Probably the functionality will be expanded in future. </p>
                        <p className ="help-text"><b>Color Model</b>'s main function is to convert RGB colors to CMYK and HSL system (bottom left corner). You are also able to change yellow color saturation of your photo. To start editing press "Upload" button and choose any image from your computer (it will be cropped to fit 880x540 size). If you want to see the original photo after having edited it, move your mouse over the document icon in bottom right corner of an image. You also have an ability to download your edited picture in .jpeg format by pressing the "Download" button.</p>
                        <p className ="help-text"><b>Shape Mover</b> provides you opportunity to use affine transformations in order to see a triangle moving over Y=X Axis with scaling. Set triangle vertices and scaling (if wanted) and press "Draw" button. If setted vertices hover red, builing such a triange is unreal. </p>
                        <p className ="help-text">This is my first React app, don't judge it hard please :)</p>
                    </div>
                    <div className ="content-column " style ={{"marginTop":"50px"}} >
                    <p className ="tag-text video-content" >Quick video guide</p>
                    <Video/>
                    </div >
                </div>
            </div>
        )
    }
}
export default Help