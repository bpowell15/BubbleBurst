import Bubble from './bubble';

class Shooter {
  constructor(canvas, ctx, angle){
    this.loadedBubbles = [];
    this.canvas = canvas;
    this.ctx = ctx;
    this.height = 50;
    this.width = 3;
    this.loadBubbles();
  }

  degToRad(angle) {
      return angle * (Math.PI / 180);
  }

  loadBubbles(){
    if (this.loadedBubbles.length !== 2) {
      if (this.loadedBubbles.length === 0) {
        this.loadedBubbles.push(new Bubble(this.canvas.width/2 + 1,this.canvas.height - 15, this.ctx, 1));
      } else {
        this.loadedBubbles.push(new Bubble(this.canvas.width/3, this.canvas.height - 15, this.ctx, 1));
      }
      this.loadBubbles();
    }
  }



  drawShooter(angle){
    let radAngle = this.degToRad(angle);
    let centerx = this.canvas.width/2;
    let centery = this.canvas.height - 15;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.moveTo(centerx, centery);
    this.ctx.lineTo(centerx + 60 * Math.cos(radAngle), centery - 60 * Math.sin(radAngle));
    this.ctx.stroke();
  }

  drawLoadedBubbles(){
    if (this.loadedBubbles.length < 2) {
      this.loadedBubbles[0].drawBubble();
    } else {
      this.loadedBubbles[0].drawBubble();
      this.loadedBubbles[1].drawBubble();
    }
  }
}

export default Shooter;
