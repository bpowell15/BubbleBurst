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
    this.emptyTileCount = 0;
    this.shotBubble = null;
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

    if (this.shotBubble) {
        this.moveShotBubble(this.shotBubble);
        this.bubbleCollision(this.shotBubble);
        this.shotBubble.drawBubble();
        if (this.finishedShots.length > 0) {
          this.removeCollidedShots(this.shotBubble);
        }

      }


    // this.board.bubbles[31].forEach((bubble) => {
    //   if (bubble.type === 1) {
    //     alert("Game Over");
    //   }
    // });






    requestAnimationFrame(this.drawGame.bind(this));

  }


  reload(){
    this.shooter.loadBubbles();
    this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
    this.shooter.loadedBubbles[0].y = this.canvas.height - 10;
    this.shooter.drawLoadedBubbles();
  }



  removeCollidedShots(bubble){
      if (bubble.y === 10) {
        this.board.bubbles[this.board.bubbles.length - 1].push(bubble);
      }
      this.shotBubble = null;
      this.finishedShots = [];
  }



  moveShotBubble(bubble){
    bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
    bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
    if (bubble.x <= 10) {
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.x >= this.canvas.width - 10){
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.y <= 10) {
      bubble.y = 10;
      this.finishedShots.push(bubble);
      this.removeCollidedShots(bubble);
    }
  }

  bubbleCollision(bubble){
    let collisions = [];
    this.emptyTileCount = 0;
    for (let r = 0; r < this.board.bubbles.length; r++) {
        let leave = false;
      for (let c = 0; c < this.board.bubbles[r].length; c++) {

        if (this.board.bubbles[r][c].type === 0 ){
          this.emptyTileCount += 1;
          continue;
        }

        if (
          ((this.board.bubbles[r][c].x - bubble.x > -10 &&
            this.board.bubbles[r][c].x - bubble.x < 0)  ||
          (this.board.bubbles[r][c].x - bubble.x < 10 &&
            this.board.bubbles[r][c].x - bubble.x > 0)) &&
          ((this.board.bubbles[r][c].y - bubble.y > -10 &&
            this.board.bubbles[r][c].y - bubble.y < 0) ||
          (this.board.bubbles[r][c].y - bubble.y < 10 &&
            this.board.bubbles[r][c].y - bubble.y > 0))
      ) {
          collisions.push(
            {bubble: this.board.bubbles[r][c],
            xDistAbs: Math.abs(this.board.bubbles[r][c].x - bubble.x),
            xDist:  this.board.bubbles[r][c].x - bubble.x,
            yDist: Math.abs(this.board.bubbles[r][c].y - bubble.y)
           });
      }
    }
  }
  let closestBubble;
  let closestDist = null;
  collisions.forEach((colBubble)=>{
    if (closestDist === null ) {
      closestBubble = colBubble;
      closestDist = colBubble.xDistAbs;
    } else if (closestDist > colBubble.xDistAbs) {
      closestBubble = colBubble;
      closestDist = colBubble.xDistAbs;
    }
  });

  if (closestBubble){
    console.log(closestBubble.xDist);
    if (closestBubble.xDist < 0 ){
      bubble.pos.r = closestBubble.bubble.pos.r + 1;
      bubble.pos.c= closestBubble.bubble.pos.c ;
      if (this.board.bubbles[bubble.pos.r][bubble.pos.c].type === 1){
        bubble.pos.c += 1;
      }
      if (this.board.bubbles[bubble.pos.r][bubble.pos.c].type === 1) {
        bubble.pos.r -= 1;
      }
      if (this.board.bubbles[bubble.pos.r][bubble.pos.c].type === 1) {
        bubble.pos.r += 2;
      }
    } else {
      if (closestBubble.bubble.pos.c - 1 < 0) {
        bubble.pos.r = closestBubble.bubble.pos.r + 1;
        bubble.pos.c= 0;
      } else {
        if (closestBubble.bubble.pos.c + 1 > 23){
          bubble.pos.r = closestBubble.bubble.pos.r + 1;
          bubble.pos.c= 23;
        } else {
          bubble.pos.r = closestBubble.bubble.pos.r + 1;
          bubble.pos.c= closestBubble.bubble.pos.c;
        }
      }
    }



    bubble.x = this.board.bubbles[bubble.pos.r][bubble.pos.c].x;
    bubble.y = this.board.bubbles[bubble.pos.r][bubble.pos.c].y;

    this.board.bubbles[bubble.pos.r][bubble.pos.c] = bubble;
    this.finishedShots.push('finito');
    this.reload();
  }

}






  addRow(){
      this.board.bubbles.forEach((bubbleRow) => {
        bubbleRow.forEach((bubble) => {
          bubble.y = bubble.y + 20;
          bubble.pos.r += 1;
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
    if (this.shooter.loadedBubbles.length === 2) {
      this.shotBubble = this.shooter.loadedBubbles[0];
      this.shooter.loadedBubbles = this.shooter.loadedBubbles.slice(1);
    }
    this.onMouseMove(e);
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
