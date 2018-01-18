import Board from './board';
import Shooter from './shooter';

class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(canvas, ctx);
    this.shooter = new Shooter(canvas, ctx);
  }

  start(angle){
    this.board.drawBoard();
    this.shooter.drawShooter(angle);
    this.shooter.drawLoadedBubbles();
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.start();
  }
}

export default Game;
