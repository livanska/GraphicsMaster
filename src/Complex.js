export class Complex
{
    real;
    imaginary;
    constructor(real,imaginary)
    {
        this.real = Number(real);
        this.imaginary = Number(imaginary);
    }
    setReal(real)
    {
        this.real = real
    }
    setImaginary(imaginary)
    {
        this.imaginary = imaginary
    }
    setComplex(c)
    {
        this.real = c.real
        this.imaginary = c.imaginary
        return this
    }
}
export function sinComplex(c)
{
    let real = Math.sin(c.real) * Math.cosh(c.imaginary)
    let imaginary = Math.cos(c.real) * Math.sinh(c.imaginary)
    return new Complex(real,imaginary)
}
export function multiplyComplex(c1, c2)
{
    let real = c1.real * c2.real - c1.imaginary * c2.imaginary
    let imaginary = c1.real * c2.imaginary + c2.real * c1.imaginary
    return new Complex(real,imaginary)
}
export function moduleComplex(c)
{
    return Math.sqrt(Math.pow(c.real, 2) + Math.pow(c.imaginary, 2))
}
export function addComplex(c1, c2)
{
    let real = c1.real + c2.real
    let imaginary = c1.imaginary + c2.imaginary 
    return new Complex(real,imaginary)
}
export function cosComplex(c)
{
    let real = Math.cos(c.real) * Math.cosh(c.imaginary)
    let imaginary = Math.sin(c.real) * Math.sinh(c.imaginary)
    return new Complex(real,imaginary)
}