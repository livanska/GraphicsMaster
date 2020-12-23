
export default class MatrixTransformations{
    
    
    dot;
    constructor(dot)
    {
        this.dot = dot;
    }
    move(dx,dy)
    {
        //matrix addition
        let matr = [1,0,dx,
                    0,1,dy,
                    0,0,1]
        
        this.dot[0]+= matr[2]
        this.dot[1]+=matr[5];
        return  this.dot;
    }

    transform()
    {
        //matrix multiplication
        let reflMatr = [0,1,   //[x]
                        1,0]   //[y]

        let x = this.dot[0]
        let y = this.dot[1]
        this.dot[0]= x*reflMatr[0]+ y*reflMatr[1]
        this.dot[1]= x*reflMatr[2]+ y*reflMatr[3]
        return this.dot
    }

    transformOverX()
    {
        //matrix multiplication
        let reflMatr = [1,0,   //[x]
                        0,-1]  //[y]

        this.dot[0]=this.dot[0]*reflMatr[0]+ this.dot[1]*reflMatr[1]
        this.dot[1]=this.dot[0]*reflMatr[2]+ this.dot[1]*reflMatr[3]
        return this.dot
    }

    zooming(dx,dy)
    {
        let zoomMatr = [dx,0,
                        0,dy]
        this.dot[0]=this.dot[0]*zoomMatr[0]
        this.dot[1]=this.dot[1]*zoomMatr[3]
        return this.dot
    }

}