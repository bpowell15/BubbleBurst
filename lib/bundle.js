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
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 2 + 1, this.canvas.height - 10, this.ctx, 1));
        } else {
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 4, this.canvas.height - 10, this.ctx, 1));
        }
        this.loadBubbles();
      }
    }
  }, {
    key: "drawShooter",
    value: function drawShooter(angle) {
      var radAngle = this.degToRad(angle);
      var centerx = this.canvas.width / 2;
      var centery = this.canvas.height - 10;
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#000000";
      this.ctx.beginPath();
      this.ctx.moveTo(centerx, centery);
      this.ctx.lineTo(centerx + 40 * Math.cos(radAngle), centery - 40 * Math.sin(radAngle));
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
    this.bubbleRadius = 10;
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
    this.pos = {};
    this.getMousePos = this.getMousePos.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clicks = 0;
    this.finishedShots = [];
    this.emptyTileCount = 0;
    this.shotBubble = null;
  }

  _createClass(Game, [{
    key: 'drawGame',
    value: function drawGame() {
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
        var collisions = this.bubbleCollision(this.shotBubble);
        if (collisions.length > 0) {
          var closestBubble = this.closestCollision(collisions);
          var possibilities = this.availableSpaces(closestBubble);
          this.closestAvailableSpace(this.shotBubble, possibilities);
        }
        this.shotBubble.drawBubble();
        if (this.finishedShots.length > 0) {
          this.removeCollidedShots(this.shotBubble);
        }
      }

      requestAnimationFrame(this.drawGame.bind(this));
    }
  }, {
    key: 'reload',
    value: function reload() {
      this.shooter.loadBubbles();
      this.shooter.loadedBubbles[0].x = this.canvas.width / 2;
      this.shooter.loadedBubbles[0].y = this.canvas.height - 10;
      this.shooter.drawLoadedBubbles();
    }
  }, {
    key: 'removeCollidedShots',
    value: function removeCollidedShots(bubble) {
      if (bubble.y === 10) {
        this.board.bubbles[this.board.bubbles.length - 1].push(bubble);
      }
      this.shotBubble = null;
      this.finishedShots = [];
    }
  }, {
    key: 'moveShotBubble',
    value: function moveShotBubble(bubble) {
      bubble.x = bubble.x + bubble.speed * Math.cos(this.degToRad(bubble.angle));
      bubble.y = bubble.y + bubble.speed * -1 * Math.sin(this.degToRad(bubble.angle));
      if (bubble.x <= 10) {
        bubble.angle = 180 - bubble.angle;
      } else if (bubble.x >= this.canvas.width - 10) {
        bubble.angle = 180 - bubble.angle;
      } else if (bubble.y <= 10) {
        bubble.y = 10;
        this.finishedShots.push(bubble);
        this.removeCollidedShots(bubble);
      }
    }
  }, {
    key: 'bubbleCollision',
    value: function bubbleCollision(bubble) {
      var collisions = [];
      this.emptyTileCount = 0;
      for (var r = 0; r < this.board.bubbles.length; r++) {
        var leave = false;
        for (var c = 0; c < this.board.bubbles[r].length; c++) {

          if (this.board.bubbles[r][c].type === 0) {
            this.emptyTileCount += 1;
            continue;
          }

          if ((this.board.bubbles[r][c].x - bubble.x >= -20 && this.board.bubbles[r][c].x - bubble.x <= 0 || this.board.bubbles[r][c].x - bubble.x <= 20 && this.board.bubbles[r][c].x - bubble.x >= 0) && (this.board.bubbles[r][c].y - bubble.y >= -20 && this.board.bubbles[r][c].y - bubble.y <= 0 || this.board.bubbles[r][c].y - bubble.y <= 20 && this.board.bubbles[r][c].y - bubble.y >= 0)) {
            collisions.push({ bubble: this.board.bubbles[r][c],
              xDistAbs: Math.abs(this.board.bubbles[r][c].x - bubble.x),
              xDist: this.board.bubbles[r][c].x - bubble.x,
              yDist: Math.abs(this.board.bubbles[r][c].y - bubble.y)
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

      // let topLeft = this.board.bubbles[r - 1][c];
      // let topRight = this.board.bubbles[r - 1][c + 1];

      var right = this.board.bubbles[r][c + 1];
      var bottomLeft = this.board.bubbles[r + 1][c];
      var left = this.board.bubbles[r][c - 1];
      var bottomRight = void 0;
      var bottomOtherRight = void 0;
      if (this.board.bubbles[r + 1][0].rowShift === false) {
        bottomOtherRight = this.board.bubbles[r + 1][c + 1];
      } else {
        if (c - 1 < 0) {
          bottomRight = this.board.bubbles[r + 1][0];
        } else {

          bottomRight = this.board.bubbles[r + 1][c - 1];
        }
      }

      var possibilities = [right, bottomRight, bottomOtherRight, bottomLeft, left];
      var realPossibilities = [];

      possibilities.forEach(function (poss) {
        if (poss === undefined) {
          null;
        } else if (poss.type === 0) {
          realPossibilities.push(poss);
        }
      });

      return realPossibilities;
    }
  }, {
    key: 'closestAvailableSpace',
    value: function closestAvailableSpace(bubble, possibilities) {
      var closestXBubble = void 0;
      var closestXDist = null;
      var closestYBubble = void 0;
      var closestYDist = null;

      possibilities.forEach(function (possSpace) {
        var xDist = Math.abs(possSpace.x - bubble.x);
        var yDist = Math.abs(possSpace.y - bubble.y);
        if (xDist < 20 && yDist < 20) {
          /// not sure if necc
          if (closestXDist === null) {
            closestXBubble = possSpace;
            closestXDist = xDist;
          } else if (closestXDist > xDist) {
            closestXBubble = possSpace;
            closestXDist = xDist;
          }
          if (closestYDist === null) {
            closestYBubble = possSpace;
            closestYDist = yDist;
          } else if (closestYDist > yDist) {
            closestYBubble = possSpace;
            closestYDist = yDist;
          }
        }
      });

      var closestBubble = void 0;
      if (closestXDist <= closestYDist) {
        closestBubble = closestXBubble;
      } else {
        closestBubble = closestYBubble;
      }

      if (closestBubble.rowShift === true) {
        bubble.rowShift = true;
      }

      bubble.x = this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].x;
      bubble.y = this.board.bubbles[closestBubble.pos.r][closestBubble.pos.c].y;
      bubble.pos.r = closestBubble.pos.r;
      bubble.pos.c = closestBubble.pos.c;
      this.board.bubbles[bubble.pos.r][bubble.pos.c] = bubble;
      this.finishedShots.push('finito');
      this.reload();
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      this.board.bubbles.forEach(function (bubbleRow) {
        bubbleRow.forEach(function (bubble) {
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
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.clicks += 1;
      if (this.shooter.loadedBubbles.length === 2) {
        this.shotBubble = this.shooter.loadedBubbles[0];
        this.shooter.loadedBubbles = this.shooter.loadedBubbles.slice(1);
      }
      this.onMouseMove(e);
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
      var mouseangle = this.radToDeg(Math.atan2(this.canvas.height - 10 - pos.y, pos.x - this.canvas.width / 2));

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
  bubbleWidth: 20,
  bubbleHeight: 20,
  offsetTop: 30,
  rowCount: 8,
  nullRowCount: 32,
  columnCount: 24
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
            bubbleX = c * BOARDOPTIONS.bubbleWidth + 10 + 10;
          } else {
            bubbleX = c * 20 + 10;
          }
          this.nextRow.push(new _bubble3.default(bubbleX, 10, this.ctx, 1));
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
            bubbleX = c * BOARDOPTIONS.bubbleWidth + 10;
            bubbleY = r * BOARDOPTIONS.bubbleHeight + 10;
          } else {
            bubbleX = c * BOARDOPTIONS.bubbleWidth + 10 + 10;
            bubbleY = r * BOARDOPTIONS.bubbleHeight + 10;
          }

          if (r < 8) {
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