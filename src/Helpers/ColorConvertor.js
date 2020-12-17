export default class ColorCovertor
{
    rgbToHex(color) 
    {
        console.log(color)
        return "#" + this.componentToHex(color[0]) + this.componentToHex(color[1]) + this.componentToHex(color[2]);
    }

    componentToHex(c)
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    getRandomColor() 
    {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    rgbToHsl(arr)
    {
        let hslArr =[]
        for (var i = 0; i < arr.length; i++) 
        {
            hslArr.push( this.elementRgbToHsl(arr[i]))
        }
        return hslArr
    }

    dataToRgb(arr)
    {
        
        let rgbArray = []
        for (var i = 0; i < arr.length; i+=4) 
        {
        rgbArray.push([arr[i], arr[i+1], arr[i+2]])
        }
        return rgbArray
    }



    
   hslToRgb(arr)
   {
    var rgbArr =[]
        for (var i = 0; i < arr.length; i++) 
        {
            rgbArr.push(this.elementHslToRgb(arr[i]))
        }
        return rgbArr
    }

    changeSaturationHsl(arr,percent)
    {
     
        let change = (percent-50)/50
        let divider =1;
        
        for(let i=0;i<arr.length;i++)
        {
           
            if(arr[i][0]>= 50  && arr[i][0]<=70)
            {
               // change = arr[i][1];
            
               arr[i][1] += change*arr[i][1]

                if (arr[i][1]>100)
                    arr[i][1]=100
                if(arr[i][1]<0)
                    arr[i][1]=0
                //change =arr[i][1] -change
            }
            if((arr[i][0]>= 30  && arr[i][0]<50) || (arr[i][0]> 70  && arr[i][0]<=90))
            {
             
                divider =0.6;
                if(percent<50)
                    divider =0.2;
                arr[i][1] += change*divider*arr[i][1]
               

                
                if (arr[i][1]>100)
                    arr[i][1]=100
                if(arr[i][1]<0)
                    arr[i][1]=0
            }
            if((arr[i][0]>= 10  && arr[i][0]<30) || (arr[i][0]> 90  && arr[i][0]<=110))
            {
                divider =0.3;
                if(percent<50)
                    divider =0.3;

               arr[i][1] += change*divider*arr[i][1]

                if (arr[i][1]>100)
                    arr[i][1]=100
                if(arr[i][1]<0)
                    arr[i][1]=0
            }
            if((arr[i][0]<10) || (arr[i][0]> 110 && arr[i][0]<=150))
            {
           
                divider =0.2;
                if(percent<50)
                    divider =0.6;

               arr[i][1] += change*divider*arr[i][1]

                if (arr[i][1]>100)
                    arr[i][1]=100
                if(arr[i][1]<0)
                    arr[i][1]=0
            }

        }
        return arr
    }
    rgbToData(imageData,arr)
    {
        let arrCounter= 0
        for (var i = 0; arrCounter < arr.length; i+=4) 
        {
            
            imageData.data[i] = arr[arrCounter][0]
            imageData.data[i+1] = arr[arrCounter][1]
            imageData.data[i+2] = arr[arrCounter][2]
            imageData.data[i+3] = 255
            arrCounter++
        }
        console.log(imageData)
        return imageData
    }

    elementHslToRgb(hsl) 
    {
        var h = hsl[0];
        var s = hsl[1];
        var l = hsl[2];
        s /= 100;
        l /= 100;
        let C = (1 - Math.abs(2 * l - 1)) * s;
        var hue = h / 60;
        let X = C * (1 - Math.abs(hue % 2 - 1));
        let r = 0
        let g =0 
        let b = 0;
        if (hue >= 0 && hue < 1) {
            r = C;
            g = X;
        } else if (hue >= 1 && hue < 2) {
            r = X;
            g = C;
        } else if (hue >= 2 && hue < 3) {
            g = C;
            b = X;
        } else if(hue >= 3 && hue < 4) {
            g = X;
            b = C;
        } else if (hue >= 4 && hue < 5) {
            r = X;
            b = C;
        } else {
            r = C;
            b = X;
        }
        let m = l - C / 2;
        r += m;
        g += m;
        b += m;
        r *= 255.0;
        g *= 255.0;
        b *= 255.0;
        return [Math.round(r), Math.round(g), Math.round(b)];
    }

    elementRgbToHsl(rgb) 
    {
        var red = rgb[0] < 0 ? 0 : rgb[0] > 255 ? 255 : rgb[0];
        var green = rgb[1] < 0 ? 0 : rgb[1] > 255 ? 255 : rgb[1];
        var blue = rgb[2] < 0 ? 0 : rgb[2] > 255 ? 255 : rgb[2];

        var r = Number(red / 255),
            g = Number(green / 255),
            b = Number(blue / 255),
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h=0, s=0, l=0;
        if (max == min) {
            h = 0;
        } else if (r == max) {
            h = (g - b) / delta;
        } else if (g == max) {
            h = 2 + (b - r) / delta;
        } else if (b == max) {
            h = 4 + (r - g) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) h += 360;
            l = (min + max) / 2;
        if (max == min) 
            s = 0;
        else if (l <= 0.5) 
            s = delta / (max + min);
        else 
            s = delta / (2 - max - min);
        return [
                Math.round(h),
                Math.round(s * 100),
                Math.round(l * 100)]
    } 
    
    elementRgbToCmyk (rgb) 
    {
        var computedC = 0;
        var computedM = 0;
        var computedY = 0;
        var computedK = 0;
       
       
       let r =  parseInt(rgb[0])
       let g = parseInt(rgb[1])
       let b = parseInt(rgb[2])
        // BLACK
        if (r==0 && g==0 && b==0) {
         computedK = 1;
         return [0,0,0,1];
        }
       
        computedC = 1 - (r/255);
        computedM = 1 - (g/255);
        computedY = 1 - (b/255);
       
        var minCMY = Math.min(computedC,
                     Math.min(computedM,computedY));
        computedC = Math.round((computedC - minCMY) / (1 - minCMY) * 100) ;
        computedM = Math.round((computedM - minCMY) / (1 - minCMY) * 100) ;
        computedY = Math.round((computedY - minCMY) / (1 - minCMY) * 100 );
        computedK = Math.round(minCMY * 100);
       
        return [ computedC,computedM,computedY,computedK]
    }

    rgbToCmyk(arr)
    {
        let cmykArr =[]
        for (var i = 0; i < arr.length; i++) 
        {
            cmykArr.push( this.elementRgbToCmyk(arr[i]))
        }
        return cmykArr
    }

    elementCmykToRgb (cmyk)
    {
		
		let c = cmyk[0] / 100;
		let m = cmyk[1]/ 100;
		let y = cmyk[2] / 100;
		let k = cmyk[3]/ 100;
 
		let r = 1 - Math.min( 1, c * ( 1 - k ) + k );
		let g = 1 - Math.min( 1, m * ( 1 - k ) + k );
		let b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
		r = Math.round( r * 255 );
		g = Math.round( g * 255 );
		b = Math.round( b * 255 );
 
		return [r,g,b]
    }
    
    cmykToRgb(arr)
    {
        let rgbArr =[]
        for (var i = 0; i < arr.length; i++) 
        {
            rgbArr.push( this.elementCmykToRgb(arr[i]))
        }
        return rgbArr
    }
    changeSaturationCmyk(arr,percent)
    {
        for(let i=0;i<arr.length;i++)
        {
            arr[i][2] = (arr[i][2]*percent)/50
            if(arr[i][2]>100)
                arr[i][2]=100
            if(arr[i][2]<0)
                arr[i][2]=0
        }
        return arr
    }
}