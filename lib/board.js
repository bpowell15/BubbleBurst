import Bubble from './bubble';
import Shooter from './shooter';

const BOARDOPTIONS = {
  bubbleWidth:30,
  bubbleHeight: 28,
  offsetTop: 30,
  rowCount: 6,
  nullRowCount: 23,
  columnCount: 16
};

class Board{
  constructor(canvas, ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.bubbles = this.createBubbles();
    this.nextRow = [];
    this.colShift = 1;
    this.loadNextRow();

  }

  loadNextRow(){
    let bubbleX;
    if (this.nextRow.length !== BOARDOPTIONS.columnCount) {
      for (let c = 0; c < BOARDOPTIONS.columnCount; c++) {
        if ( this.colShift % 2 !== 0) {
          bubbleX = (c * BOARDOPTIONS.bubbleWidth+15) + 15;
          this.nextRow.push(new Bubble(bubbleX, 15, this.ctx , 1, {r: 0,c: c}, true));
        } else {
          bubbleX = (c * 30) + 15;
          this.nextRow.push(new Bubble(bubbleX, 15, this.ctx , 1, {r: 0,c: c}, false));
        }
      }
    }
  }


  createBubbles (){
    let bubbles = [];
    for (let r = 0; r < BOARDOPTIONS.nullRowCount; r++) {
      bubbles.push([]);
      for (let c = 0; c < BOARDOPTIONS.columnCount; c++) {
        let bubbleX;
        let bubbleY;
        if ( r % 2 === 0 ) {
          bubbleX = (c * BOARDOPTIONS.bubbleWidth) + 15;
          bubbleY = (r * BOARDOPTIONS.bubbleHeight) + 15;
        } else {
          bubbleX = (c * BOARDOPTIONS.bubbleWidth+15) + 15;
          bubbleY = (r * BOARDOPTIONS.bubbleHeight) + 15;
        }

        if ( r <BOARDOPTIONS.rowCount ) {
          let bubble =  new Bubble(bubbleX, bubbleY, this.ctx, 1, {c: c, r: r});
          if (r % 2 !== 0){
            bubble.rowShift = true;
          }
          bubbles[r].push(bubble);
        } else {
          let bubble =  new Bubble(bubbleX, bubbleY, this.ctx, 0, {c: c, r: r});
          bubbles[r].push(bubble);
          if (r % 2 !== 0){
            bubble.rowShift = true;
          }
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
