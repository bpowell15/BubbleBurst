import Bubble from './bubble';
import Shooter from './shooter';

const BOARDOPTIONS = {
  bubbleWidth:20,
  bubbleHeight: 20,
  offsetTop: 30,
  rowCount: 8,
  nullRowCount: 32,
  columnCount: 24
};

class Board{
  constructor(canvas, ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.bubbles = this.createBubbles();
    this.nextRow = [];
    this.colShift = 1;
    this.loadNextRow();
    this.shotBubbles = [];
  }

  loadNextRow(){
    let bubbleX;
    if (this.nextRow.length !== BOARDOPTIONS.columnCount) {
      for (let c = 0; c < BOARDOPTIONS.columnCount; c++) {
        if ( this.colShift % 2 !== 0) {
          bubbleX = (c * BOARDOPTIONS.bubbleWidth+10) + 10;
        } else {
          bubbleX = (c * 20) + 10;
        }
        this.nextRow.push(new Bubble(bubbleX, 10, this.ctx , 1));
      }
    }
  }


  createBubbles (){
    let bubbles = [[]];
    for (let r = 0; r < BOARDOPTIONS.nullRowCount; r++) {
      bubbles.push([]);
      for (let c = 0; c < BOARDOPTIONS.columnCount; c++) {
        let bubbleX;
        let bubbleY;
        if ( r % 2 === 0 ) {
          bubbleX = (c * BOARDOPTIONS.bubbleWidth) + 10;
          bubbleY = (r * BOARDOPTIONS.bubbleHeight) + 10;
        } else {
          bubbleX = (c * BOARDOPTIONS.bubbleWidth+10) + 10;
          bubbleY = (r * BOARDOPTIONS.bubbleHeight) + 10;
        }

        if ( r < 8 ) {
          bubbles[r].push(new Bubble(bubbleX, bubbleY, this.ctx, 1, {c: c, r: r}));
        } else {
          bubbles[r].push(new Bubble(bubbleX, bubbleY, this.ctx, 0, {c: c, r: r}));
        }

      }
    }


    return bubbles;
  }

  drawBoard(){
    for ( let r=0; r < this.bubbles.length; r++ ) {
    for ( let c=0; c < this.bubbles[r].length; c++ ) {
        this.bubbles[r][c].drawBubble();
      }
    }
  }
}

export default Board;
