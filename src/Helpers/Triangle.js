import MatrixTransformations from '../Helpers/MatrixTransformations.js';

export default class Triangle{
 
    A;
    B;
    C;

    constructor(dots)
    {
       
        this.A= dots[0];
        this.B= dots[1];
        this.C= dots[2];
    }
    
    move(dx,dy)
    {
        let Adot = new MatrixTransformations(this.A)
        let Bdot = new MatrixTransformations(this.B)
        let Cdot = new MatrixTransformations(this.C)

        this.A = Adot.move(dx,dy)
        this.B= Bdot.move(dx,dy)
        this.C= Cdot.move(dx,dy)
    }
    transform()
    {
        let Adot = new MatrixTransformations(this.A)
        let Bdot = new MatrixTransformations(this.B)
        let Cdot = new MatrixTransformations(this.C)
  
        this.A = Adot.transform()
        this.B= Bdot.transform()
        this.C= Cdot.transform()
    }
    transformOverX()
    {
        let Adot = new MatrixTransformations(this.A)
        let Bdot = new MatrixTransformations(this.B)
        let Cdot = new MatrixTransformations(this.C)
  
        this.A = Adot.transformOverX()
        this.B= Bdot.transformOverX()
        this.C= Cdot.transformOverX()
    }
    zooming(dx,dy)
    {
        let Adot = new MatrixTransformations(this.A)
        let Bdot = new MatrixTransformations(this.B)
        let Cdot = new MatrixTransformations(this.C)
  
        this.A = Adot.zooming(dx,dy)
        this.B= Bdot.zooming(dx,dy)
        this.C= Cdot.zooming(dx,dy)
    }
    isValid()
    {
        if(this.A == this.B)
            return false
        else if(this.A==this.C)
            return false
        else if(this.B==this.C)
            return false
        else if(this.A[0]==this.B[0]==this.C[0])
            return false
        else if(this.A[1]==this.B[1]==this.C[1])
            return false

        let AB = Math.sqrt(Math.pow((this.B[0]-this.A[0]),2) + Math.pow((this.B[1]-this.A[1]),2))
        let AC = Math.sqrt(Math.pow((this.C[0]-this.A[0]),2) + Math.pow((this.C[1]-this.A[1]),2))
        let BC = Math.sqrt(Math.pow((this.C[0]-this.B[0]),2) + Math.pow((this.C[1]-this.B[1]),2))
        
        if(AB+BC <= AC)
            return false
        else if(AC+BC <= AB)
            return false
        else if(AC+AB <= BC)
            return false
        else
            return true
    }
}