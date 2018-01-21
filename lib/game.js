import Board from './board';
import Shooter from './shooter';
class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(canvas, ctx);
    this.shooter = new Shooter(canvas, ctx);
    this.angle = 90;
    this.pos = {};
    this.getMousePos = this.getMousePos.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clicks = 0;
    this.finishedShots = [];
  }

  drawGame(){
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("click", this.handleClick);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.drawBoard();

    if (this.clicks === 10) {
      this.addRow();
    }

    this.shooter.drawShooter(this.angle);
    this.shooter.drawLoadedBubbles();

    if (this.board.shotBubbles.length !== 0) {
      this.board.shotBubbles.forEach((bubble, index)=>{
        this.moveShotBubble(bubble, index);
        this.bubbleCollision(bubble, index);
        bubble.drawBubble();
        if (this.finishedShots.length > 0) {
          this.removeCollidedShots(bubble);
        }
      });
    }

    this.board.bubbles[31].forEach((bubble) => {
      if (bubble.type === 1) {
        alert("Game Over");
      }
    });






    requestAnimationFrame(this.drawGame.bind(this));

  }



  removeCollidedShots(bubble){
    debugger
    this.finishedShots.forEach((idx)=>{
      if (bubble.y === 10) {
        this.board.bubbles[this.board.bubbles.length - 1].push(bubble);
      }
      this.board.shotBubbles.splice(idx, 1);
    });
    this.finishedShots = [];
  }



  moveShotBubble(bubble, index){
    bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
    bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
    if (bubble.x <= 10) {
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.x >= this.canvas.width - 10){
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.y <= 10) {
      bubble.y = 10;
      this.finishedShots.push(index);
      this.removeCollidedShots(bubble);
    }
  }

  bubbleCollision(bubble, index){
    for (let r = 0; r < this.board.bubbles.length; r++) {
        let leave = false;
      for (let c = 0; c < this.board.bubbles[r].length; c++) {
        if (this.board.bubbles[r][c].type === 0 ){
          continue;
        }

        if (
          (this.board.bubbles[r][c].x - bubble.x > -20 && this.board.bubbles[r][c].x - bubble.x <= 0) &&
        (this.board.bubbles[r][c].y - bubble.y > -20 && this.board.bubbles[r][c].y - bubble.y <= 0)
      ) {
        debugger
          if (this.board.bubbles[r + 1][c].type === 0) {
            bubble.pos = {c: c , r: r+ 1};
            bubble.x = this.board.bubbles[r + 1][c].x;
            bubble.y = this.board.bubbles[r + 1][c].y;
            this.board.bubbles[r + 1][c] = bubble;
        } else {
          bubble.pos = {c: c + 1 , r: r+ 1};
          bubble.y = this.board.bubbles[r + 1][c + 1].y;
          this.board.bubbles[r + 1][c + 1] = bubble;
          this.board.bubbles[r + 1][c + 1] = bubble;
        }
        this.finishedShots.push(index);
        leave = true;
      } else if (
        (this.board.bubbles[r][c].x - bubble.x < 20 && this.board.bubbles[r][c].x - bubble.x >= 0) &&
      (this.board.bubbles[r][c].y - bubble.y < 20 && this.board.bubbles[r][c].y - bubble.y >= 0)

      ) {
        if (this.board.bubbles[r + 1][c].type === 0) {
          bubble.pos = {c: c , r: r+ 1};
          bubble.x = this.board.bubbles[r + 1][c].x;
          bubble.y = this.board.bubbles[r + 1][c].y;
          this.board.bubbles[r + 1][c] = bubble;
      } else {
        bubble.pos = {c: c + 1 , r: r+ 1};
        bubble.y = this.board.bubbles[r + 1][c - 1].y;
        this.board.bubbles[r + 1][c - 1] = bubble;
        this.board.bubbles[r + 1][c - 1] = bubble;
      }
        this.finishedShots.push(index);
        leave = true;
      }
      }
      if (leave === true) {
        break;
      }
    }
  }






  addRow(){
      this.board.bubbles.forEach((bubbleRow) => {
        bubbleRow.forEach((bubble) => {
          bubble.y = bubble.y + 20;
        });
      });
      this.board.bubbles.unshift(this.board.nextRow);
      this.clicks = 0;
      this.board.nextRow = [];
      this.board.colShift += 1;
      this.board.loadNextRow();
      this.board.bubbles.pop();
  }








  handleClick(e){
    this.clicks += 1;
    this.board.shotBubbles.push(this.shooter.loadedBubbles[0]);
    this.shooter.loadedBubbles = this.shooter.loadedBubbles.slice(1);
    this.shooter.loadBubbles();
    this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
    this.shooter.loadedBubbles[0].y = this.canvas.height - 10;
    this.onMouseMove(e);
    this.shooter.drawLoadedBubbles();
  }

  radToDeg(angle) {
      return angle * (180 / Math.PI);
  }

  // Convert degrees to radians
  degToRad(angle) {
      return angle * (Math.PI / 180);
  }

  getMousePos(e) {
      let rect = this.canvas.getBoundingClientRect();
      return {
          x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*this.canvas.width),
          y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*this.canvas.height)
      };
  }

  onMouseMove(e) {
      let pos = this.getMousePos(e);
      let mouseangle = this.radToDeg(Math.atan2((this.canvas.height - 10) - pos.y, pos.x - ((this.canvas.width/2))));

      if (mouseangle < 0) {
          mouseangle = 180 + (180 + mouseangle);
      }
      const lbound = 8;
      const ubound = 172;
      if (mouseangle > 90 && mouseangle < 270) {
          if (mouseangle > ubound) {
              mouseangle = ubound;
          }
      } else {
          if (mouseangle < lbound || mouseangle >= 270) {
              mouseangle = lbound;
          }
      }

      this.angle = mouseangle;
      this.shooter.loadedBubbles[0].angle = mouseangle;
  }
}

export default Game;
