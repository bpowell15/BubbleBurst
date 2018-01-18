import Bubble from './bubble';
import Shooter from './shooter';
import Util from './util';

const BOARDOPTIONS = {
  bubbleWidth:20,
  bubbleHeight: 20,
  offsetTop: 30,
  rowCount: 8,
  columnCount: 25
};

class Board{
  constructor(canvas, ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.bubbles = this.createBubbles();
  }


  createBubbles (){
    let bubbles = [];
    for (let r = 0; r < BOARDOPTIONS.rowCount; r++) {
      bubbles.push([]);
      for (let c = 0; c < BOARDOPTIONS.columnCount; c++) {
        let bubbleX = (c * BOARDOPTIONS.bubbleWidth) + 10;
        let bubbleY = (r * BOARDOPTIONS.bubbleHeight) + 10;

        bubbles[r].push(new Bubble(bubbleX, bubbleY, this.ctx));
      }
    }
    return bubbles;
  }



  drawBubbles(){
    for ( let c=0; c < BOARDOPTIONS.columnCount; c++ ) {
      for ( let r=0; r < BOARDOPTIONS.rowCount; r++ ) {
        this.bubbles[r][c].drawBubble();
      }
    }
  }



  drawBoard(){
    this.drawBubbles(this.ctx);
    let shooter = new Shooter(this.canvas, this.ctx);
    shooter.drawShooter();
    shooter.drawLoadedBubbles();
  }
}



export default Board;
