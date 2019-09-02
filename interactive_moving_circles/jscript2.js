var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

//circle
//c.arc(x,y,radius,start-angle:float,end-angle:float,drarwCounterClockwise:Bool(false));
/*c.beginPath();
c.arc(500,200,50,0,Math.PI*2,false);
c.stroke();
*/

//function for animation

var mouse={
    x:undefined,
    y:undefined
}

var colorArray=[
       '#2C3E50',
       '#E74C3C',
       '#ECF0F1',
       '#3498DB',
       '#298089'
]

var maxradius=100;
var minradius=5;

window.addEventListener('mousemove',
    function(event){
        mouse.x=event.x;
        mouse.y=event.y;
    console.log(mouse);
})


function circle(x,y,dx,dy,radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;

    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=colorArray[Math.floor(Math.random()*colorArray.length)]
        c.fill();
    }

    this.update=function(){
         if(this.x+this.radius>innerWidth || this.x-this.radius<0)
        {
        this.dx=-this.dx;
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius<0)
       {
        this.dy=-this.dy;
       }
    
      this.y=this.y+this.dy;
      this.x=this.x+this.dx;
     

    //interactivity
    if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
        if(this.radius<maxradius){
            this.radius+=1;
        }
    }
      else if(this.radius>minradius){
        this.radius-=1;
      }

      this.draw();
    } 
}


var circleArray=[];
for(var i=0;i<2500;i++){
     var x=Math.random()*innerWidth;
     var dx=3*(Math.random());
     var y=Math.random()*innerHeight;
     var dy=2* (Math.random());
     var radius=Math.random()*3+1;
    circleArray.push(new circle(x,y,dx,dy,radius));
}


function animate() {
	requestAnimationFrame(animate);
    //c.clearRect(x,y,innerWidth,innerHeight);
	c.clearRect(0,0,innerWidth,innerHeight);

    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate();