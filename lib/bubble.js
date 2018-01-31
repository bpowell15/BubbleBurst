const BUBBLECOLORS = [
  "#2EFE2E",
  "#0040FF",
  "#FF0000",
  "#ff9900",
  "#660066",
  "#ff66ff"
];

class Bubble {
  constructor(x, y, ctx, type, pos, rowshift=false, color){
    this.bubbleColor = color || this.pickBubbleColor();
    this.bubbleRadius = 15;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.pos= pos || {r: null, c: null};
    this.angle = 90;
    this.type = type;
    this.speed = 20;
    this.rowShift = rowshift;
  }

  pickBubbleColor(){
    return BUBBLECOLORS[Math.floor(Math.random() * BUBBLECOLORS.length)];
  }

  drawBubble(){
    if (this.type === 1) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.bubbleRadius, 0, Math.PI*2);
      this.ctx.fillStyle = this.bubbleColor;
      this.ctx.fill();
      this.ctx.strokeStyle = "#000000";
      this.ctx.lineWidth=1;
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(this.x - 5, this.y - 5, 1, 0, 2*Math.PI);
      this.ctx.fillStyle = "rgba(255, 255, 255, .5)";
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.x - 5, this.y - 5, 3, 0, 2*Math.PI);
      this.ctx.fillStyle = "rgba(255, 255, 255, .3)";
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.x - 5, this.y - 5, 5, 0, 2*Math.PI);
      this.ctx.fillStyle = "rgba(255, 255, 255, .2)";
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.x - 5, this.y - 5, 7, 0, 2*Math.PI);
      this.ctx.fillStyle = "rgba(255, 255, 255, .1)";
      this.ctx.fill();

    }
  }

}

export default Bubble;
