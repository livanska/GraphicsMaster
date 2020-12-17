import React from "react";
import "../Style/Grids.scss"
import "../Style/Button.scss"


class ImageLoader extends React.Component {
    render() {
        const { value , onChangeValue } = this.props;
        return (
        <div style ={{marginTop:"20px"}}>
            <input type="file" name="file" id="file" className="inputfile" value={value} onChange={onChangeValue} />
            <label for="file">Upload</label>
       
        </div>
        );
    }
}
export default ImageLoader;