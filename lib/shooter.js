import Bubble from './bubble';
import Util from './util';

class Shooter {
  constructor(canvas, ctx, angle){
    this.loadedBubbles = [];
    this.canvas = canvas;
    // this.angle = angle;
    this.ctx = ctx;
    this.height = 50;
    this.width = 3;
  }

  degToRad(angle) {
      return angle * (Math.PI / 180);
  }

  loadBubbles(){
    if (this.loadedBubbles.length !== 2) {
      if (this.loadedBubbles.length === 0) {
        this.loadedBubbles.push(new Bubble(this.canvas.width/2 + 1,this.canvas.height - 10, this.ctx));
      } else {
        this.loadedBubbles.push(new Bubble(this.canvas.width/4, this.canvas.height - 10, this.ctx));
      }
      this.loadBubbles();
    }
  }



  drawShooter(angle){
    let radAngle = this.degToRad(angle);
    let centerx = this.canvas.width/2;
    let centery = this.canvas.height - 10;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.moveTo(centerx, centery);
    this.ctx.lineTo(centerx + 1.5*20 * Math.cos(radAngle), centery - 1.5*20 * Math.sin(radAngle));
    this.ctx.stroke();
    // this.ctx.beginPath();
    // this.ctx.rect(
    //   this.canvas.width/2,
    //   this.canvas.height - 60,
    //   this.width, this.height
    // );
  }

  drawLoadedBubbles(){
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.closePath();
    this.loadBubbles();
    this.loadedBubbles[0].drawBubble();
    this.loadedBubbles[1].drawBubble();
  }
}

export default Shooter;
