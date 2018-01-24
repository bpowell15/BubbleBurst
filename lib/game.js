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
    this.clicks = 0;
    this.score = 0;
    this.highscore = localStorage.getItem('highscore');
    this.finishedShots = [];
    this.emptyTileCount = 0;
    this.shotBubble = null;
    this.seen = {};
    this.pop = false;
  }


  drawGame(){
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("click", this.handleClick);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.drawBoard();

    if (this.clicks === 10) {
      this.addRow();
    }

    this.ctx.font = "24px Bangers";
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(`Score: ${this.score}`,this.canvas.width - 150,this.canvas.height-5);
    this.ctx.strokeStyle = '#000000';

    // let pic = new Image();
    // pic.src = './assets/POP.png';
    // this.ctx.drawImage(pic, this.canvas.width/6, this.canvas.height/4, 320, 225);


    if (this.pop === true) {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 490, 640);
        this.ctx.fillStyle = 'rgba(255, 255, 255, .3)';
        this.ctx.fill();
        this.ctx.closePath();
        const pic = new Image();
        pic.src = './assets/POP.png';
        this.ctx.drawImage(pic, this.canvas.width/6, this.canvas.height/4, 320, 225);
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
        this.shotBubble.drawBubble();
        this.findCluster(this.shotBubble);
      }
    }


    requestAnimationFrame(this.drawGame.bind(this));



  }

  togglePop(){
    this.pop = false;
  }
  reload(){
    this.shooter.loadBubbles();
    this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
    this.shooter.loadedBubbles[0].y = this.canvas.height - 10;
    this.shooter.drawLoadedBubbles();
  }

  findNeighbors(bubble){
    let neighbors;
    const board= this.board.bubbles;
    const r = bubble.pos.r;
    const c = bubble.pos.c;
    console.log(board);
    console.log(r);
    console.log(c);
    if (bubble.rowShift === true) {
      neighbors = [board[r][c+1],
                   board[r][c-1],
                   board[r+1][c],
                   board[r+1][c+1],
                   board[r-1][c],
                   board[r-1][c+1]];
    } else {
      neighbors = [board[r][c+1],
                   board[r][c-1],
                   board[r+1][c],
                   board[r+1][c-1],
                   board[r-1][c],
                   board[r-1][c-1]];
    }
    let neighborMatch = [];
    neighbors.forEach((neighbor)=>{
      if (neighbor !== undefined &&
          neighbor.type === 1 &&
          neighbor.bubbleColor === this.shotBubble.bubbleColor){
            neighborMatch.push(neighbor);
          }
    });
    return neighborMatch;
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
      console.log(seen);
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
      this.score += cluster.length * 200;
      this.removeCluster(cluster);
      if (this.clicks >= 3) {
        this.clicks -= 1;
      }
    }
    console.log(this.score)
      this.shotBubble = null;
      this.reload();
  }


  removeCluster(cluster){
    const pop = (()=>{this.pop = false})
    this.pop = true;
    cluster.forEach((bubble)=> {
      bubble.type = 0;
    });
    const audio = new Audio('./assets/Pop-sound-effect.ogg');
    audio.play();
    setTimeout(pop, 100);
  }


  getHighScore(){
    if(this.highscore !== null){
      if (this.score > this.highscore) {
          localStorage.setItem("highscore", this.score);
      } else {
        localStorage.setItem("highscore", this.score);
      }
    }
  }

  // findCluster(bubble){
  //   let cluster = [];
  //   const neighbors = this.findNeighbors(bubble);
  //
  //   neighbors.forEach((neighbor)=>{
  //     if (neighbor.type === 1 &&
  //            neighbor.bubbleColor === bubble.bubbleColor &&
  //            !this.seen[neighbor]
  //          ){
  //            cluster.push(neighbor);
  //        }
  //        this.seen[neighbor] = true;
  //     });
  //     return cluster;
  // }





  // // takes a bubbles neighbors and if color matches og shot color pushes neighbor in to cluster and marks it as seen
  // findClusters(neighbors){
  //   let localCluster = [];
  //   neighbors.forEach((neighbor)=> {
  //     if (neighbor.type === 1 &&
  //         neighbor.bubbleColor === this.clusterColor &&
  //         !this.seen[neighbor]
  //       ){
  //         this.cluster.push(neighbor);
  //         this.toProcess.push(neighbor);
  //     }
  //     this.seen[neighbor] = true;
  //   });
  // }
  //
  // process(){
  //   this.toProcess.forEach((bubble) => {
  //     let neighbors = this.findNeighbors(bubble);
  //     this.findClusters(neighbors);
  //   });
  // }
  //
  //
  //
  //
  // removeCluster(){
  //   this.cluster.forEach((bubble)=> {
  //     bubble.type = 0;
  //   });
  //   this.cluster = [];
  //   this.toProcess = [];
  //   this.seen = {};
  // }


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
      const audio = new Audio('./assets/pew.ogg');
      audio.volume = .5;
      audio.play();
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
