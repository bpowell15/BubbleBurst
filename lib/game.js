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
    this.shoot = false;
    this.getMousePos = this.getMousePos.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clicks = 0;
    this.finishedShots = [];
    // this.drawGame = this.drawGame.bind(this);
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
        this.bubbleCollision(bubble);
        bubble.drawBubble();
      });
      if (this.finishedShots.length > 0) {
      this.removeCollidedShots();
    }
    }
    requestAnimationFrame(this.drawGame.bind(this));
    // this.start();
  }

  bubbleCollision(bubble){
  }

  removeCollidedShots(){
    debugger
    this.finishedShots.forEach((idx)=>{
      if (this.board.shotBubbles[idx].y === 10) {
        this.board.bubbles[0].push(this.board.shotBubbles[idx]);
      }
      this.board.shotBubbles.splice(idx, 1);
    });
    this.finishedShots = [];
  }

  moveShotBubble(bubble, index){
    bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
    bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
    if (bubble.x <= 15) {
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.x >= this.canvas.width - 10){
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.y <= 0) {
      bubble.y = 10;
      this.finishedShots.push(index);
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
  }

  handleClick(e){
    this.clicks += 1;
    this.shoot = true;
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
