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
    this.findCluster = this.findCluster.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGameOverClick = this.handleGameOverClick.bind(this);
    this.handleAudioClick = this.handleAudioClick.bind(this);
    this.handleFXClick = this.handleFXClick.bind(this);
    this.clicks = 0;
    this.lost = false;
    this.score = 0;
    this.highscore = Number(localStorage.getItem('highscore'));
    this.finishedShots = [];
    this.floats = [];
    // this.emptyTileCount = 0;
    this.shotBubble = null;
    this.seen = {};
    this.pop = false;
    this.play = true;
    this.won = false;
    this.sound = true;
    this.soundFX = true;
    // this.start = false;
    // this.start = false;
  }


  drawGame(){
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("click", this.handleClick);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.drawBoard();
    this.shooter.drawShooter(this.angle);
    this.shooter.drawLoadedBubbles();
    const soundToggle = document.getElementById("toggleSound");
    const fxToggle = document.getElementById("toggleFX");
    soundToggle.addEventListener("click", this.handleAudioClick);
    fxToggle.addEventListener("click", this.handleFXClick);
    this.getHighScore();

    this.ctx.font = "24px Bangers";
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(`HighScore: ${this.highscore}`, 10,this.canvas.height-5);

    if (this.clicks === 10) {
      this.addRow();
    }

    this.ctx.font = "24px Bangers";
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(`Score: ${this.score}`,this.canvas.width - 150,this.canvas.height-5);

    if (this.pop === true) {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 495, 640);
        this.ctx.fillStyle = 'rgba(255, 255, 255, .3)';
        this.ctx.fill();
        this.ctx.closePath();
        const pic = new Image();
        pic.src = './assets/POP.png';
        this.ctx.drawImage(pic, this.canvas.width/6, this.canvas.height/4, 320, 225);
    }
    if (this.shotBubble) {
      this.moveShotBubble(this.shotBubble);
      this.canvas.addEventListener("click", this.handleGameOverClick);
      this.shotBubble.drawBubble();
      let collisions = this.bubbleCollision(this.shotBubble);
      if (collisions.length > 0) {
        let closestBubble = this.closestCollision(collisions);
        let possibilities = this.availableSpaces(closestBubble);
        this.closestAvailableSpace(this.shotBubble, possibilities);
        this.shotBubble.drawBubble();
        this.findCluster(this.shotBubble);
        this.findFloaters();
        // if (this.floats.length > 1){
        //   this.animateFloats();
        //   setTimeout(this.removeFloats, 500)
        // }
      }
    }



    const pic = new Image();
    pic.src = './assets/gameover.png';
    this.gameOver();
    if (this.lost || this.won) {

      this.ctx.beginPath();
      this.ctx.rect(0, 0, 495, 640);
      this.ctx.fillStyle = 'rgba(0, 0, 0, .7)';
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.drawImage(pic, this.canvas.width/6, this.canvas.height/5, 315, 75);

      if (this.won){
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = "120px Bangers";
        this.ctx.fillText(`You win!`,(this.canvas.width/5 - 45),this.canvas.height/2 - 35);
      }

      this.ctx.font = "24px Bangers";
      this.ctx.fillStyle = '#ff0200';
      this.ctx.fillText(`Score: ${this.score}`,this.canvas.width - 150,this.canvas.height-5);
      this.ctx.font = "24px Bangers";
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText("Click to Play Again",this.canvas.width/3, this.canvas.height/2);
      requestAnimationFrame(this.drawGame.bind(this));
    } else {
      requestAnimationFrame(this.drawGame.bind(this));
    }
  }

  gameOver(){
    this.board.bubbles[21].forEach((bubble) => {
      if (bubble.type === 1) {
        this.lost = true;
        this.play = false;
      }
    });
    let type1Bubbles = [];
    this.board.bubbles[0].forEach((bubble) => {
      if (bubble.type === 1 ) {
        type1Bubbles.push(bubble);
      }
    });

    if ( type1Bubbles.length === 0 ){
      this.won = true;
    }

  }

  togglePop(){
    this.pop = false;
  }
  reload(){
    this.shooter.loadBubbles();
    this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
    this.shooter.loadedBubbles[0].y = this.canvas.height - 15;
    this.shooter.drawLoadedBubbles();
  }

  findNeighbors(bubble){
    let neighbors;
    const board= this.board.bubbles;
    const r = bubble.pos.r;
    const c = bubble.pos.c;

    if (bubble.rowShift === true) {
      if (c - 1 < 0 && r -1 < 0){
        neighbors = [board[r+1][c],
                     board[r+1][c+1]];
      } else if ( c + 1 > 15 && r - 1 < 0 ) {
        neighbors = [board[r][c-1],
                     board[r+1][c]];
      } else if(c + 1 > 15){
        neighbors = [board[r][c-1],
                     board[r+1][c],
                     board[r-1][c]];
      }else if (r - 1 < 0) {
        neighbors = [board[r][c+1],
                     board[r][c-1],
                     board[r+1][c],
                     board[r+1][c+1]];
      } else if (c - 1 < 0) {
        neighbors = [board[r][c+1],
                     board[r+1][c],
                     board[r+1][c+1],
                     board[r-1][c],
                     board[r-1][c+1]];
      }else {
        neighbors = [board[r][c+1],
                    board[r][c-1],
                    board[r+1][c],
                    board[r+1][c+1],
                    board[r-1][c],
                    board[r-1][c+1]];
                   }
    } else {
      if ( c + 1 > 15 && r - 1 < 0 ) {
        neighbors = [
                     board[r][c-1],
                     board[r+1][c],
                     board[r+1][c-1]];
      } else if (c - 1 < 0 && r -1 < 0) {
        neighbors = [board[r][c+1],
                     board[r][c-1],
                     board[r+1][c]];
      } else if (c + 1 > 15){
        neighbors = [board[r][c-1],
                     board[r+1][c],
                     board[r+1][c-1],
                     board[r-1][c],
                     board[r-1][c-1]];
      } else if (c - 1 < 0) {
        neighbors = [board[r][c+1],
                     board[r+1][c],
                     board[r-1][c]
                   ];

      } else if (r - 1 < 0){
        neighbors = [board[r][c+1],
                     board[r][c-1],
                     board[r+1][c],
                     board[r+1][c-1]];
      }else {
      neighbors = [board[r][c+1],
                   board[r][c-1],
                   board[r+1][c],
                   board[r+1][c-1],
                   board[r-1][c],
                   board[r-1][c-1]];
                 }
    }
    let neighborMatch = [];
    neighbors.forEach((neighbor)=>{
      if (this.shotBubble === null && neighbor !== undefined && neighbor.type === 1) {

        neighborMatch.push(neighbor);
      } else if (neighbor !== undefined &&
          neighbor.type === 1 &&
          neighbor.bubbleColor === this.shotBubble.bubbleColor){
            neighborMatch.push(neighbor);
          }
    });
    return neighborMatch;
  }

  findFloaters(){
    const topRow = this.board.bubbles[0];
    let allNeighbors = [];
    let seen = [];
    for (let c = 0; c < topRow.length; c++) {
      let queue = [topRow[c]];
      while (queue.length > 0) {

          let bubb = queue.shift();
          if (bubb.type === 1) {
          seen.push(bubb);
          allNeighbors.push(bubb);
          let neighbors = this.findNeighbors(bubb);
          neighbors.forEach((neighbor)=>{
            if (seen.includes(neighbor) === false ){
              seen.push(neighbor);
              allNeighbors.push(neighbor);
              queue.push(neighbor);
            }
          });
        }
      }
    }
    let floats = [];
    for (var r = 0; r < this.board.bubbles.length; r++) {
      for (var c = 0; c < this.board.bubbles[r].length; c++) {
        if (allNeighbors.includes(this.board.bubbles[r][c]) === false){
          floats.push(this.board.bubbles[r][c]);
        }
      }
    }


    floats.forEach((bubble)=>{
      bubble.type = 0;
    });
  }

  removeFloats(){

    this.floats.forEach((bubble)=>{
      bubble.type = 0;
    });
  }
  animateFloats(){
    this.floats.shift();
    this.floats.forEach((bubble)=>{
      bubble.y += 20;
    });
  }



  findCluster(bubble){
    let queue = [bubble];
    let cluster = [];
    let seen = [];
    while (queue.length > 0) {
      let bubb = queue.shift();
      cluster.push(bubb);
      seen.push(bubb);
      let neighbors = this.findNeighbors(bubb);
      neighbors.forEach((neighbor)=>{
        if (
          seen.includes(neighbor) === false
           ) {
             queue.push(neighbor);
           }
           seen.push(neighbor);
      });
    }

    if (cluster.length >= 3){
      this.score += cluster.length * 100;
      this.removeCluster(cluster);
      if (this.clicks >= 3) {
        this.clicks -= 1;
      }
    }
      this.shotBubble = null;
      this.reload();
  }


  removeCluster(cluster){
    const pop = (()=>{this.pop = false})
    this.pop = true;
    cluster.forEach((bubble)=> {
      bubble.type = 0;
    });
    // const audio = new Audio('./assets/Pop-sound-effect.ogg');
    if (this.soundFX === true){
      const audio = new Audio('./assets/Pop-sound-effect.mp3');
      audio.play();
    }
    setTimeout(pop, 150);
  }


  getHighScore(){
    if(this.highscore !== null){
      if (this.score >= this.highscore) {
        debugger
          localStorage.setItem("highscore", this.score);
          this.highscore = +localStorage.getItem('highscore');
      }
    }
  }

  moveShotBubble(bubble){
    bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
    bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
    if (bubble.x <= 15) {
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.x >= this.canvas.width - 15){
      bubble.angle = 180 - bubble.angle;
    } else if (bubble.y <= 15) {
      bubble.y = 15;
      // need logic to snap bubble into place.
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
          ((this.board.bubbles[r][c].x - bubble.x >= -28 &&
            this.board.bubbles[r][c].x - bubble.x <= 0)  ||
          (this.board.bubbles[r][c].x - bubble.x <= 28 &&
            this.board.bubbles[r][c].x - bubble.x >= 0)) &&
          ((this.board.bubbles[r][c].y - bubble.y >= -28 &&
            this.board.bubbles[r][c].y - bubble.y <= 0) ||
          (this.board.bubbles[r][c].y - bubble.y <= 28 &&
            this.board.bubbles[r][c].y - bubble.y >= 0))
      ) {

          collisions.push(
            {bubble: this.board.bubbles[r][c],
            xDistAbs: Math.abs(this.board.bubbles[r][c].x - bubble.x),
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
        bottomRight = this.board.bubbles[r + 1][c - 1];
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



  possibilities.forEach((possSpace)=>{
    let xDist =  Math.abs(possSpace.x - bubble.x);
    let yDist =  Math.abs(possSpace.y - bubble.y);

      let dist = xDist + yDist;
      if (closestDist === null || closestDist > dist) {
        closestBubble = possSpace;
        closestDist = dist;

    }
  });

  if (closestBubble.rowShift === true){
    bubble.rowShift = true;
    }

     this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].bubbleColor = bubble.bubbleColor;
     this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].type = 1;
     this.shotBubble = this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c]
     // bubble.pos = closestBubble.pos;
  }

  addRow(){
      this.board.bubbles.forEach((bubbleRow) => {
        bubbleRow.forEach((bubble) => {
          bubble.y = bubble.y + 30;
          bubble.pos.r += 1;
        });
      });
      this.board.bubbles.unshift(this.board.nextRow);
      this.clicks = 0;
      this.board.nextRow = [];
      this.board.colShift += 1;
      this.board.loadNextRow();
      console.log(this.board.bubbles.length)
      this.board.bubbles.pop();
      console.log(this.board.bubbles.length)


  }

  win(){
    for (let c= 0; c < this.board.bubbles[0].length; c++) {
      if (this.board.bubbles[0][c].type === 1) {
        return false;
      }
    }
  }


  handleGameOverClick(e){

    if (this.lost || this.won) {
    this.board = new Board(this.canvas, this.ctx);
    this.shooter = new Shooter(this.canvas, this.ctx);
    this.score = 0;
    this.play = true;
    this.lost = false;
    this.won = false;
    }
  }

  handleClick(e){
    if (this.play === true) {
      this.clicks += 1;
      if (this.shooter.loadedBubbles.length === 2) {
        this.shotBubble = this.shooter.loadedBubbles[0];
        if (this.soundFX === true){
          const audio = new Audio('./assets/pew.mp3');
          // const audio = new Audio('./assets/pew.ogg');
          audio.volume = .5;
          audio.play();
        }
        this.shooter.loadedBubbles = this.shooter.loadedBubbles.slice(1);
      }
      this.onMouseMove(e);
    }
  }

  radToDeg(angle) {
      return angle * (180 / Math.PI);
  }

  degToRad(angle) {
      return angle * (Math.PI / 180);
  }

  getMousePos(e) {
      let rect = this.canvas.getBoundingClientRect();
      return {
          x: Math.round((e.clientX - rect.left)/
                        (rect.right - rect.left)*this.canvas.width),
          y: Math.round((e.clientY - rect.top)/
                        (rect.bottom - rect.top)*this.canvas.height)
      };
  }

  onMouseMove(e) {
      let pos = this.getMousePos(e);
      let mouseangle = this.radToDeg(Math.atan2((this.canvas.height - 15) - pos.y, pos.x - ((this.canvas.width/2))));

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


    handleAudioClick (){
      if (this.sound === true) {
        this.pauseAudio();
        this.sound = false;
      } else {
        this.playAudio();
        this.sound = true;
      }
    }

    handleFXClick(){
      const fxToggle = document.getElementById("toggleFX");
      if (this.soundFX === true) {
        this.soundFX = false;
        fxToggle.className = "fa fa-volume-off fa-2x";
      } else {
        this.soundFX = true;
        fxToggle.className = "fa fa-volume-up fa-2x";
      }
    }

    pauseAudio(){
      const soundToggle = document.getElementById("toggleSound");
      soundToggle.className = "fa fa-volume-off fa-2x";
      const audio = document.getElementById("myAudio");
      audio.pause();
    }

    playAudio(){
      const soundToggle = document.getElementById("toggleSound");
      soundToggle.className = "fa fa-volume-up fa-2x";
      const audio = document.getElementById("myAudio");
      audio.play();
    }
  }



export default Game;
