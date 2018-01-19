const BUBBLECOLORS = [
  "#2EFE2E",
  "#0040FF",
  "#FF0000",
  "#FFFF00",
  "#7401DF",
  "#FFFFFF"
];

class Bubble {
  constructor(x, y, ctx){
    this.bubbleColor = this.pickBubbleColor();
    this.bubbleRadius = 10;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 1000;

  }

  pickBubbleColor(){
    return BUBBLECOLORS[Math.floor(Math.random() * BUBBLECOLORS.length)];
  }

  drawBubble(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.bubbleRadius, 0, Math.PI*2);
    this.ctx.fillStyle = this.bubbleColor;
    this.ctx.fill();
    this.ctx.strokeStyle = "#000000";
    this.ctx.stroke();
    this.ctx.closePath();
  }

}

export default Bubble;
