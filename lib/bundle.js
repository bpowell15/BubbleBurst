/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = __webpack_require__(1);

var _bubble2 = _interopRequireDefault(_bubble);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shooter = function () {
  function Shooter(canvas, ctx, angle) {
    _classCallCheck(this, Shooter);

    this.loadedBubbles = [];
    this.canvas = canvas;
    this.ctx = ctx;
    this.height = 50;
    this.width = 3;
    this.loadBubbles();
  }

  _createClass(Shooter, [{
    key: "degToRad",
    value: function degToRad(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: "loadBubbles",
    value: function loadBubbles() {
      if (this.loadedBubbles.length !== 2) {
        if (this.loadedBubbles.length === 0) {
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 2 + 1, this.canvas.height - 15, this.ctx, 1));
        } else {
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 4, this.canvas.height - 15, this.ctx, 1));
        }
        this.loadBubbles();
      }
    }
  }, {
    key: "drawShooter",
    value: function drawShooter(angle) {
      var radAngle = this.degToRad(angle);
      var centerx = this.canvas.width / 2;
      var centery = this.canvas.height - 15;
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#000000";
      this.ctx.beginPath();
      this.ctx.moveTo(centerx, centery);
      this.ctx.lineTo(centerx + 60 * Math.cos(radAngle), centery - 60 * Math.sin(radAngle));
      this.ctx.stroke();
    }
  }, {
    key: "drawLoadedBubbles",
    value: function drawLoadedBubbles() {
      if (this.loadedBubbles.length < 2) {
        this.loadedBubbles[0].drawBubble();
      } else {
        this.loadedBubbles[0].drawBubble();
        this.loadedBubbles[1].drawBubble();
      }
    }
  }]);

  return Shooter;
}();

exports.default = Shooter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BUBBLECOLORS = ["#2EFE2E", "#0040FF", "#FF0000", "#FFFF00", "#7401DF", "#FFFFFF"];

var Bubble = function () {
  function Bubble(x, y, ctx, type, pos) {
    _classCallCheck(this, Bubble);

    this.bubbleColor = this.pickBubbleColor();
    this.bubbleRadius = 15;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.pos = pos || { r: null, c: null };
    this.angle = 0;
    this.type = type;
    this.speed = 20;
    this.rowShift = false;
  }

  _createClass(Bubble, [{
    key: "pickBubbleColor",
    value: function pickBubbleColor() {
      return BUBBLECOLORS[Math.floor(Math.random() * BUBBLECOLORS.length)];
    }
  }, {
    key: "drawBubble",
    value: function drawBubble() {
      if (this.type === 1) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.bubbleRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.bubbleColor;
        this.ctx.fill();
        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }]);

  return Bubble;
}();

exports.default = Bubble;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _shooter = __webpack_require__(0);

var _shooter2 = _interopRequireDefault(_shooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Game = require("./game");
// const GameView = require("./game_view");
document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementById("BubbleBurstCanvas");
  var ctx = canvasEl.getContext("2d");
  var game = new _game2.default(canvasEl, ctx);
  game.drawGame();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(4);

var _board2 = _interopRequireDefault(_board);

var _shooter = __webpack_require__(0);

var _shooter2 = _interopRequireDefault(_shooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(canvas, ctx) {
    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new _board2.default(canvas, ctx);
    this.shooter = new _shooter2.default(canvas, ctx);
    this.angle = 90;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.findCluster = this.findCluster.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGameOverClick = this.handleGameOverClick.bind(this);
    this.clicks = 0;
    this.lost = false;
    this.score = 0;
    this.highscore = localStorage.getItem('highscore');
    this.finishedShots = [];
    this.emptyTileCount = 0;
    this.shotBubble = null;
    this.seen = {};
    this.pop = false;
    this.play = true;
    // this.start = false;
  }

  _createClass(Game, [{
    key: 'drawGame',
    value: function drawGame() {
      this.canvas.addEventListener("mousemove", this.onMouseMove);
      this.canvas.addEventListener("click", this.handleClick);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.board.drawBoard();
      this.shooter.drawShooter(this.angle);
      this.shooter.drawLoadedBubbles();

      if (this.clicks === 10) {
        this.addRow();
      }

      this.ctx.font = "24px Bangers";
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText('Score: ' + this.score, this.canvas.width - 150, this.canvas.height - 5);

      if (this.pop === true) {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 490, 640);
        this.ctx.fillStyle = 'rgba(255, 255, 255, .3)';
        this.ctx.fill();
        this.ctx.closePath();
        var _pic = new Image();
        _pic.src = './assets/POP.png';
        this.ctx.drawImage(_pic, this.canvas.width / 6, this.canvas.height / 4, 320, 225);
      }
      if (this.shotBubble) {
        this.moveShotBubble(this.shotBubble);
        this.canvas.addEventListener("click", this.handleGameOverClick);
        this.shotBubble.drawBubble();
        var collisions = this.bubbleCollision(this.shotBubble);
        if (collisions.length > 0) {
          var closestBubble = this.closestCollision(collisions);
          var possibilities = this.availableSpaces(closestBubble);
          this.closestAvailableSpace(this.shotBubble, possibilities);
          this.shotBubble.drawBubble();
          this.findCluster(this.shotBubble);
        }
      }

      var pic = new Image();
      pic.src = './assets/gameover.png';
      this.gameOver();
      if (this.lost) {

        this.ctx.beginPath();
        this.ctx.rect(0, 0, 495, 640);
        this.ctx.fillStyle = 'rgba(0, 0, 0, .7)';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(pic, this.canvas.width / 6, this.canvas.height / 5, 315, 75);
        this.ctx.font = "24px Bangers";
        this.ctx.fillStyle = '#ff0200';
        this.ctx.fillText('Score: ' + this.score, this.canvas.width - 150, this.canvas.height - 5);
        this.ctx.font = "24px Bangers";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText("Click to Play Again", this.canvas.width / 3, this.canvas.height / 2);
        requestAnimationFrame(this.drawGame.bind(this));
      } else {
        requestAnimationFrame(this.drawGame.bind(this));
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var _this = this;

      this.board.bubbles[21].forEach(function (bubble) {
        if (bubble.type === 1) {
          _this.lost = true;
          _this.play = false;
        }
      });
    }
  }, {
    key: 'togglePop',
    value: function togglePop() {
      this.pop = false;
    }
  }, {
    key: 'reload',
    value: function reload() {
      this.shooter.loadBubbles();
      this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
      this.shooter.loadedBubbles[0].y = this.canvas.height - 15;
      this.shooter.drawLoadedBubbles();
    }
  }, {
    key: 'findNeighbors',
    value: function findNeighbors(bubble) {
      var _this2 = this;

      var neighbors = void 0;
      var board = this.board.bubbles;
      var r = bubble.pos.r;
      var c = bubble.pos.c;
      console.log(board);
      console.log(r);
      console.log(c);
      if (bubble.rowShift === true) {
        neighbors = [board[r][c + 1], board[r][c - 1], board[r + 1][c], board[r + 1][c + 1], board[r - 1][c], board[r - 1][c + 1]];
      } else {
        neighbors = [board[r][c + 1], board[r][c - 1], board[r + 1][c], board[r + 1][c - 1], board[r - 1][c], board[r - 1][c - 1]];
      }
      var neighborMatch = [];
      neighbors.forEach(function (neighbor) {
        if (neighbor !== undefined && neighbor.type === 1 && neighbor.bubbleColor === _this2.shotBubble.bubbleColor) {
          neighborMatch.push(neighbor);
        }
      });
      return neighborMatch;
    }
  }, {
    key: 'findCluster',
    value: function findCluster(bubble) {
      var queue = [bubble];
      var cluster = [];
      var seen = [];
      while (queue.length > 0) {
        var bubb = queue.shift();
        cluster.push(bubb);
        seen.push(bubb);
        var neighbors = this.findNeighbors(bubb);
        neighbors.forEach(function (neighbor) {
          if (seen.includes(neighbor) === false) {
            queue.push(neighbor);
          }
          seen.push(neighbor);
        });
      }

      if (cluster.length >= 3) {
        this.score += cluster.length * 200;
        this.removeCluster(cluster);
        if (this.clicks >= 3) {
          this.clicks -= 1;
        }
      }
      this.shotBubble = null;
      this.reload();
    }
  }, {
    key: 'removeCluster',
    value: function removeCluster(cluster) {
      var _this3 = this;

      var pop = function pop() {
        _this3.pop = false;
      };
      this.pop = true;
      cluster.forEach(function (bubble) {
        bubble.type = 0;
      });
      var audio = new Audio('./assets/Pop-sound-effect.ogg');
      audio.play();
      setTimeout(pop, 100);
    }
  }, {
    key: 'getHighScore',
    value: function getHighScore() {
      if (this.highscore !== null) {
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


  }, {
    key: 'moveShotBubble',
    value: function moveShotBubble(bubble) {
      bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
      bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
      if (bubble.x <= 15) {
        bubble.angle = 180 - bubble.angle;
      } else if (bubble.x >= this.canvas.width - 15) {
        bubble.angle = 180 - bubble.angle;
      } else if (bubble.y <= 15) {
        ////workout top boundary collisions
      }
    }
  }, {
    key: 'bubbleCollision',
    value: function bubbleCollision(bubble) {
      var collisions = [];
      this.emptyTileCount = 0;
      for (var r = 0; r < this.board.bubbles.length; r++) {
        for (var c = 0; c < this.board.bubbles[r].length; c++) {

          if (this.board.bubbles[r][c].type === 0) {
            this.emptyTileCount += 1;
            continue;
          }

          if ((this.board.bubbles[r][c].x - bubble.x >= -30 && this.board.bubbles[r][c].x - bubble.x <= 0 || this.board.bubbles[r][c].x - bubble.x <= 30 && this.board.bubbles[r][c].x - bubble.x >= 0) && (this.board.bubbles[r][c].y - bubble.y >= -30 && this.board.bubbles[r][c].y - bubble.y <= 0 || this.board.bubbles[r][c].y - bubble.y <= 30 && this.board.bubbles[r][c].y - bubble.y >= 0)) {

            collisions.push({ bubble: this.board.bubbles[r][c],
              xDistAbs: Math.abs(this.board.bubbles[r][c].x - bubble.x)
            });
          }
        }
      }
      return collisions;
    }
  }, {
    key: 'closestCollision',
    value: function closestCollision(collisions) {
      var closestBubble = void 0;
      var closestDist = null;
      collisions.forEach(function (colBubble) {
        if (closestDist === null) {
          closestBubble = colBubble;
          closestDist = colBubble.xDistAbs;
        } else if (closestDist > colBubble.xDistAbs) {
          closestBubble = colBubble;
          closestDist = colBubble.xDistAbs;
        }
      });
      return closestBubble;
    }
  }, {
    key: 'availableSpaces',
    value: function availableSpaces(closestBubble) {

      var r = closestBubble.bubble.pos.r;
      var c = closestBubble.bubble.pos.c;

      var right = this.board.bubbles[r][c + 1];
      var bottomLeft = this.board.bubbles[r + 1][c];
      var left = this.board.bubbles[r][c - 1];
      var bottomRight = void 0;
      if (this.board.bubbles[r + 1][0].rowShift === false) {
        bottomRight = this.board.bubbles[r + 1][c + 1];
      } else {
        bottomRight = this.board.bubbles[r + 1][c - 1];
      }

      var possibilities = [right, bottomRight, bottomLeft, left];
      var realPossibilities = [];

      possibilities.forEach(function (poss) {
        if (poss === undefined) {
          /// possible to remove if add barrier to bottome right x+1 === 24
          return null;
        } else if (poss.type === 0) {
          realPossibilities.push(poss);
        }
      });
      return realPossibilities;
    }
  }, {
    key: 'closestAvailableSpace',
    value: function closestAvailableSpace(bubble, possibilities) {

      if (possibilities.length === 0) {
        return null;
      }
      var closestBubble = void 0;
      var closestDist = null;

      possibilities.forEach(function (possSpace) {
        var xDist = Math.abs(possSpace.x - bubble.x);
        var yDist = Math.abs(possSpace.y - bubble.y);

        var dist = xDist + yDist;
        if (closestDist === null || closestDist > dist) {
          closestBubble = possSpace;
          closestDist = dist;
        }
      });

      if (closestBubble.rowShift === true) {
        bubble.rowShift = true;
      }

      this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].bubbleColor = bubble.bubbleColor;
      this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].type = 1;
      this.shotBubble = this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c];
      // bubble.pos = closestBubble.pos;
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      this.board.bubbles.forEach(function (bubbleRow) {
        bubbleRow.forEach(function (bubble) {
          bubble.y = bubble.y + 30;
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
  }, {
    key: 'handleGameOverClick',
    value: function handleGameOverClick(e) {

      if (this.lost) {
        console.log('adasd');
        this.board = new _board2.default(this.canvas, this.ctx);
        this.shooter = new _shooter2.default(this.canvas, this.ctx);
      }
      this.play = true;
      this.lost = false;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.play === true) {
        this.clicks += 1;
        if (this.shooter.loadedBubbles.length === 2) {
          this.shotBubble = this.shooter.loadedBubbles[0];
          var audio = new Audio('./assets/pew.ogg');
          audio.volume = .5;
          audio.play();
          this.shooter.loadedBubbles = this.shooter.loadedBubbles.slice(1);
        }
        this.onMouseMove(e);
      }
    }
  }, {
    key: 'radToDeg',
    value: function radToDeg(angle) {
      return angle * (180 / Math.PI);
    }

    // Convert degrees to radians

  }, {
    key: 'degToRad',
    value: function degToRad(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: 'getMousePos',
    value: function getMousePos(e) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width),
        y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height)
      };
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      var pos = this.getMousePos(e);
      var mouseangle = this.radToDeg(Math.atan2(this.canvas.height - 15 - pos.y, pos.x - this.canvas.width / 2));

      if (mouseangle < 0) {
        mouseangle = 180 + (180 + mouseangle);
      }
      var lbound = 8;
      var ubound = 172;
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
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble2 = __webpack_require__(1);

var _bubble3 = _interopRequireDefault(_bubble2);

var _shooter = __webpack_require__(0);

var _shooter2 = _interopRequireDefault(_shooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARDOPTIONS = {
  bubbleWidth: 30,
  bubbleHeight: 28,
  offsetTop: 30,
  rowCount: 6,
  nullRowCount: 23,
  columnCount: 16
};

var Board = function () {
  function Board(canvas, ctx) {
    _classCallCheck(this, Board);

    this.ctx = ctx;
    this.canvas = canvas;
    this.bubbles = this.createBubbles();
    this.nextRow = [];
    this.colShift = 1;
    this.loadNextRow();
  }

  _createClass(Board, [{
    key: 'loadNextRow',
    value: function loadNextRow() {
      var bubbleX = void 0;
      if (this.nextRow.length !== BOARDOPTIONS.columnCount) {
        for (var c = 0; c < BOARDOPTIONS.columnCount; c++) {
          if (this.colShift % 2 !== 0) {
            bubbleX = c * BOARDOPTIONS.bubbleWidth + 15 + 15;
          } else {
            bubbleX = c * 30 + 15;
          }
          this.nextRow.push(new _bubble3.default(bubbleX, 15, this.ctx, 1));
        }
      }
    }
  }, {
    key: 'createBubbles',
    value: function createBubbles() {
      var bubbles = [];
      for (var r = 0; r < BOARDOPTIONS.nullRowCount; r++) {
        bubbles.push([]);
        for (var c = 0; c < BOARDOPTIONS.columnCount; c++) {
          var bubbleX = void 0;
          var bubbleY = void 0;
          if (r % 2 === 0) {
            bubbleX = c * BOARDOPTIONS.bubbleWidth + 15;
            bubbleY = r * BOARDOPTIONS.bubbleHeight + 15;
          } else {
            bubbleX = c * BOARDOPTIONS.bubbleWidth + 15 + 15;
            bubbleY = r * BOARDOPTIONS.bubbleHeight + 15;
          }

          if (r < BOARDOPTIONS.rowCount) {
            var bubble = new _bubble3.default(bubbleX, bubbleY, this.ctx, 1, { c: c, r: r });
            if (r % 2 !== 0) {
              bubble.rowShift = true;
            }
            bubbles[r].push(bubble);
          } else {
            var _bubble = new _bubble3.default(bubbleX, bubbleY, this.ctx, 0, { c: c, r: r });
            bubbles[r].push(_bubble);
            if (r % 2 !== 0) {
              _bubble.rowShift = true;
            }
          }
        }
      }

      return bubbles;
    }
  }, {
    key: 'drawBoard',
    value: function drawBoard() {
      for (var r = 0; r < this.bubbles.length; r++) {
        for (var c = 0; c < this.bubbles[r].length; c++) {
          this.bubbles[r][c].drawBubble();
        }
      }
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map