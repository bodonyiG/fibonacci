const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const center = {
  x:canvas.width/2,
  y:canvas.height/2
}
var runAnimation = true;
let n = 0;
let scale = 10;
let turnAngle = 137.5;
// turnAngle = 150;
let dist = 5;
let size = 3;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let color = {
  h:0,
  s:100,
  l: 50
}

c.fillStyle = "rgb(255,255,255)";
c.fillRect(0,0,canvas.width,canvas.height);

class Circle{
  constructor(position, radius, color){
    this.position = {
      x:position.x,
      y:position.y
    };
    this.radius = radius;
    this.color = color;
  }

  draw(){
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.strokeStyle = this.color;
    // c.stroke();
    c.fill();
  }

}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function step(nr, limit){
  const steps = Math.floor(nr/limit);
  return nr - (steps*limit);
}

function drawFlower(){
  let a = n*turnAngle;
  let r1 = dist* Math.sqrt(n);
  let r2 = -dist* Math.sqrt(n);
  let c1 = `hsl(${ step(color.h, 360) },${color.s}%,${color.l}%)`;
  let c2 = `hsl(${ step(color.h+45, 360) },${color.s}%,${color.l}%)`;
  c2 ="black";
  const position1 = {
    x: r1*Math.cos(a) + canvas.width/2,
    y: r1*Math.sin(a) + canvas.height/2
  };
  const position2 = {
    x: r2*Math.cos(a) + canvas.width/2,
    y: r2*Math.sin(a) + canvas.height/2
  };
  const circle1 = new Circle(position1, size, c1);
  circle1.draw();
  const circle2 = new Circle(position2, size*2, c2);
  circle2.draw();
  n++;

  color.h += .75;
  dist += 0.01;
  size += 0.01;
  const halfdiameter = Math.sqrt( (canvas.width**2)+(canvas.height**2) )/2;
  // console.log(halfdiameter, r1);
  if(r1 > halfdiameter){
    console.log("finished");
    runAnimation=false;
  }

  c.fillStyle = "rgba(255,255,255,.001)";
  c.fillRect(0,0,canvas.width,canvas.height);

}

function animate(){
  if(runAnimation){
    requestAnimationFrame(animate);
  }
  drawFlower();

}


animate();


// c.fillStyle = "green";
// c.strokeStyle = "purple"
// c.lineWidth = 10;
// c.arc(50,50, 30,0, Math.PI*2, false);
// c.fill();
// c.stroke()
