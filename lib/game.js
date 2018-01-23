import Board from './board';
import Shooter from './shooter';
class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(canvas, ctx);
    this.shooter = new Shooter(canvas, ctx);
    this.angle = 90;
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
        this.shotBubble.drawBubble();
        let collisions = this.bubbleCollision(this.shotBubble);
        if (collisions.length > 0) {
          let closestBubble = this.closestCollision(collisions);
          let possibilities = this.availableSpaces(closestBubble);
          this.closestAvailableSpace(this.shotBubble, possibilities);
        }
      }

    requestAnimationFrame(this.drawGame.bind(this));

  }






  reload(){
    this.shooter.loadBubbles();
    this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
    this.shooter.loadedBubbles[0].y = this.canvas.height - 10;
    this.shooter.drawLoadedBubbles();
  }


  moveShotBubble(bubble){
    bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
    bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
    if (bubble.x <= 10) {
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.x >= this.canvas.width - 10){
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.y <= 10) {
      ////workout top boundary collisions
    }
  }

  bubbleCollision(bubble){
    let collisions = [];
    this.emptyTileCount = 0;
    for (let r = 0; r < this.board.bubbles.length; r++) {
      for (let c = 0; c < this.board.bubbles[r].length; c++) {

        if (this.board.bubbles[r][c].type === 0 ){
          this.emptyTileCount += 1;
          continue;
        }

        if (
          ((this.board.bubbles[r][c].x - bubble.x >= -20 &&
            this.board.bubbles[r][c].x - bubble.x <= 0)  ||
          (this.board.bubbles[r][c].x - bubble.x <= 20 &&
            this.board.bubbles[r][c].x - bubble.x >= 0)) &&
          ((this.board.bubbles[r][c].y - bubble.y >= -20 &&
            this.board.bubbles[r][c].y - bubble.y <= 0) ||
          (this.board.bubbles[r][c].y - bubble.y <= 20 &&
            this.board.bubbles[r][c].y - bubble.y >= 0))
      ) {

          collisions.push(
            {bubble: this.board.bubbles[r][c],
            xDistAbs: Math.abs(this.board.bubbles[r][c].x - bubble.x),
            // xDist:  this.board.bubbles[r][c].x - bubble.x,
            // yDist: Math.abs(this.board.bubbles[r][c].y - bubble.y)
           });
      }
    }
  }
  return collisions;
}


  closestCollision(collisions){
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
    return closestBubble;
  }

  availableSpaces(closestBubble){

    let r = closestBubble.bubble.pos.r;
    let c = closestBubble.bubble.pos.c;

    let right = this.board.bubbles[r][c + 1];
    let bottomLeft = this.board.bubbles[r + 1 ][c];
    let left = this.board.bubbles[r][c - 1];
    let bottomRight;
    if (this.board.bubbles[r+1][0].rowShift === false) {
      bottomRight = this.board.bubbles[r + 1][c + 1];
    } else {
      // if (c - 1 < 0) {
        // bottomRight = this.board.bubbles[r + 1][0];
      // } else {
        bottomRight = this.board.bubbles[r + 1][c - 1];
      // }
    }

    let possibilities = [ right, bottomRight, bottomLeft, left ];
    let realPossibilities = [];

    possibilities.forEach((poss)=>{
      if (poss === undefined) {  /// possible to remove if add barrier to bottome right x+1 === 24
        return null;
      } else if (poss.type === 0){
        realPossibilities.push(poss);
      }
    });

    return realPossibilities;
  }





closestAvailableSpace(bubble, possibilities){

  if (possibilities.length === 0) {
    return null;
  }
  let closestBubble;
  let closestDist = null;
  // let closestXDist = null;
  // let closestYBubble;
  // let  closestYDist = null;


  possibilities.forEach((possSpace)=>{
    let xDist =  Math.abs(possSpace.x - bubble.x);
    let yDist =  Math.abs(possSpace.y - bubble.y);
    // if ( xDist < 20 && yDist < 20 ) { /// not sure if necc
      let dist = xDist + yDist;
      if (closestDist === null || closestDist > dist) {
        closestBubble = possSpace;
        closestDist = dist;
      // }
      // if (closestXDist === null ) {
      //   closestXBubble = possSpace;
      //   closestXDist = xDist;
      // } else if (closestXDist > xDist) {
      //   closestXBubble = possSpace;
      //   closestXDist = xDist;
      // }
      // if (closestYDist === null  ) {
      //   closestYBubble = possSpace;
      //   closestYDist = yDist;
      // } else if (closestYDist > yDist) {
      //   closestYBubble = possSpace;
      //   closestYDist = yDist;
      // }
    }
  });


  // let closestBubble;
  // if (closestXDist <= closestYDist) {
  //   closestBubble = closestXBubble;
  // } else {
  //   closestBubble = closestYBubble;
  // }
  if (closestBubble.rowShift === true){
    bubble.rowShift = true;
  }

  // bubble.x = this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].x;
  // bubble.y = this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].y;
  // bubble.pos.r = closestBubble.pos.r;
  // bubble.pos.c = closestBubble.pos.c;
  // this.board.bubbles[bubble.pos.r][bubble.pos.c] = bubble;
   this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].bubbleColor = bubble.bubbleColor;
   this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].type = 1;

  this.shotBubble = null;
  // this.finishedShots.push('finito');
  this.reload();
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
