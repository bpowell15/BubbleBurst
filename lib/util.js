
// canvas.addEventListener("mousedown", onMouseDown);
import Shooter from './shooter';

class Util {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.getMousePos = this.getMousePos.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.angle = 90;
  }

  // Convert radians to degrees
  radToDeg(angle) {
      return angle * (180 / Math.PI);
  }

  // Convert degrees to radians
  degToRad(angle) {
      return angle * (Math.PI / 180);
  }

  getMousePos(e) {
    debugger
      let rect = this.canvas.getBoundingClientRect();
      return {
          x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*this.canvas.width),
          y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*this.canvas.height)
      };
  }

  onMouseMove(e) {
      console.log(e);
      // Get the mouse position
      let pos = this.getMousePos(e);

      // Get the mouse angle
      let mouseangle = this.radToDeg(Math.atan2((this.canvas.height - 10) - pos.y, pos.x - ((this.canvas.width/2))));

      // Convert range to 0, 360 degrees
      if (mouseangle < 0) {
          mouseangle = 180 + (180 + mouseangle);
      }

      // Restrict angle to 8, 172 degrees
      const lbound = 8;
      const ubound = 172;
      if (mouseangle > 90 && mouseangle < 270) {
          // Left
          if (mouseangle > ubound) {
              mouseangle = ubound;
          }
      } else {
          // Right
          if (mouseangle < lbound || mouseangle >= 270) {
              mouseangle = lbound;
          }
      }
      //
      // // Set the player angle
      let shooter = new Shooter(this.canvas, this.ctx);
      //   ////// pass to shooter to set angle to draw at
      // this.angle = mouseangle;
      shooter.drawShooter(mouseangle);
  }

}

module.exports = Util;
