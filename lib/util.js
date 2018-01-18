canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);


class Util {

  // Convert radians to degrees
  radToDeg(angle) {
      return angle * (180 / Math.PI);
  }

  // Convert degrees to radians
  degToRad(angle) {
      return angle * (Math.PI / 180);
  }

  getMousePos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
          y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
      };
  }

  onMouseMove(canvas, e) {
      // Get the mouse position
      var pos = this.getMousePos(canvas, e);

      // Get the mouse angle
      var mouseangle = radToDeg(Math.atan2((player.y+ canvas.height + 10) - pos.y, pos.x - (player.x + (canvas.width/2))));

      // Convert range to 0, 360 degrees
      if (mouseangle < 0) {
          mouseangle = 180 + (180 + mouseangle);
      }

      // Restrict angle to 8, 172 degrees
      var lbound = 8;
      var ubound = 172;
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

      // Set the player angle
      return  mouseangle;  ////// pass to shooter to set angle to draw at
  }

}
