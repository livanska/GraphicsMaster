import React from "react";

function Video ()
{
  return (
    <div
    className="video"
    style={{
      width:"782px",
      height:"426px",
      position: "relative",
      //paddingBottom: "56.25%" /* 16:9 */,
      paddingTop: 0,
    }}
  >
    <iframe
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width:"782px",
        height:"426px",
      }}
      src={`https://www.youtube.com/embed/dNGd6bhCdSw`}
     // https://youtu.be/nn42RC1zT_A
      frameBorder="0"
    />
  </div>
  );
}
export default Video