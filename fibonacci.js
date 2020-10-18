const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let fibonacciSeq = [];

const center = {
  x:canvas.width/2,
  y:canvas.height/2
}

c.fillStyle = "blue";
c.fillRect(0,0,canvas.width,canvas.height);


// c.fillStyle = "green";
// c.strokeStyle = "purple"
// c.lineWidth = 10;
// c.arc(50,50, 30,0, Math.PI*2, false);
// c.fill();
// c.stroke()

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
    c.stroke();
  }

}

function fibonacci(limit){
  let iteration = 0;
  let number = 1;
  let prev = 1;
  fibonacciSeq.push(number);
  while(iteration < limit-1){
    if(iteration == 0){
      number = 2;
    }else{
      const p = number;
      number = number + prev;
      prev = p;
    }

    iteration++;
    fibonacciSeq.push(number);
  }
}

function drawRings(){
  for(i=4;i < fibonacciSeq.length; i++){

    for(j=0; j< fibonacciSeq[i]; j++){
      const angle = (Math.PI*2)/j;
      let x = Math.sin(angle)*i*5;
      let y = Math.cos(angle)*i*5;
      x+=center.x;
      y+=center.y;
      const circle = new Circle({x,y}, 5, "grey");
      circle.draw();
    }
  }
}

fibonacci(15);
drawRings();
console.log(fibonacciSeq);
