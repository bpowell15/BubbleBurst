const BUBBLECOLORS = [
  "#2EFE2E",
  "#0040FF",
  "#FF0000",
  "#ff9900",
  "#660066",
  "#ff66ff"
];

class Bubble {
  constructor(x, y, ctx, type, pos, rowshift=false){
    this.bubbleColor = this.pickBubbleColor();
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
    // var grd=this.ctx.createRadialGradient(this.x, this.y, 5 ,this.x,this.y, 13);
    // grd.addColorStop(.5,this.bubbleColor);
    // grd.addColorStop(1,"rgba(46, 254, 46, .1)");
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

      // this.ctx.beginPath();
      // this.ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
      // this.ctx.fillStyle = this.bubbleColor;
      // this.ctx.fill();
      // this.ctx.strokeStyle = "#000000";
      // this.ctx.stroke();
    //   this.ctx.closePath();
    //   this.ctx.arc(this.x - 7, this.y - 7, 3, 0, Math.PI*2, false);
    //   this.fillStyle = '#ffffff';
    //   this.ctx.fill();
    }
  }

}

export default Bubble;
