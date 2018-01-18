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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// canvas.addEventListener("mousedown", onMouseDown);


var _shooter = __webpack_require__(4);

var _shooter2 = _interopRequireDefault(_shooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util(canvas, ctx) {
        _classCallCheck(this, Util);

        this.canvas = canvas;
        this.ctx = ctx;
        this.getMousePos = this.getMousePos.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.angle = 90;
    }

    // Convert radians to degrees


    _createClass(Util, [{
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
            debugger;
            var rect = this.canvas.getBoundingClientRect();
            return {
                x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width),
                y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height)
            };
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            console.log(e);
            // Get the mouse position
            var pos = this.getMousePos(e);

            // Get the mouse angle
            var mouseangle = this.radToDeg(Math.atan2(this.canvas.height - 10 - pos.y, pos.x - this.canvas.width / 2));

            // Convert range to 0, 360 degrees
            if (mouseangle < 0) {
                mouseangle = 180 + (180 + mouseangle);
            }

            // Restrict angle to 8, 172 degrees
            var lbound = 8;
            var ubound = 172;
            if (mouseangle > 90 && mouseangle < 270) {
                // Left
                if (mouseangle > ubound) {
                    mouseangle = ubound;
                }
            } else {
                // Right
                if (mouseangle < lbound || mouseangle >= 270) {
                    mouseangle = lbound;
                }
            }
            //
            // // Set the player angle
            var shooter = new _shooter2.default(this.canvas, this.ctx);
            //   ////// pass to shooter to set angle to draw at
            // this.angle = mouseangle;
            shooter.drawShooter(mouseangle);
        }
    }]);

    return Util;
}();

module.exports = Util;

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
  function Bubble(x, y, ctx) {
    _classCallCheck(this, Bubble);

    this.bubbleColor = this.pickBubbleColor();
    this.bubbleRadius = 10;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  _createClass(Bubble, [{
    key: "pickBubbleColor",
    value: function pickBubbleColor() {
      return BUBBLECOLORS[Math.floor(Math.random() * BUBBLECOLORS.length)];
    }
  }, {
    key: "drawBubble",
    value: function drawBubble() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.bubbleRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.bubbleColor;
      this.ctx.fill();
      this.ctx.strokeStyle = "#000000";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }]);

  return Bubble;
}();

exports.default = Bubble;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(5);

var _game2 = _interopRequireDefault(_game);

var _shooter = __webpack_require__(4);

var _shooter2 = _interopRequireDefault(_shooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Util = __webpack_require__(0); // const Game = require("./game");
// const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementById("BubbleBurstCanvas");
  var ctx = canvasEl.getContext("2d");
  var util = new Util(canvasEl, ctx);
  var game = new _game2.default(canvasEl, ctx);
  canvasEl.addEventListener("mousemove", util.onMouseMove);
  game.start(util.angle);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = __webpack_require__(1);

var _bubble2 = _interopRequireDefault(_bubble);

var _shooter = __webpack_require__(4);

var _shooter2 = _interopRequireDefault(_shooter);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARDOPTIONS = {
  bubbleWidth: 20,
  bubbleHeight: 20,
  offsetTop: 30,
  rowCount: 8,
  columnCount: 24
};

var Board = function () {
  function Board(canvas, ctx) {
    _classCallCheck(this, Board);

    this.ctx = ctx;
    this.canvas = canvas;
    this.bubbles = this.createBubbles();
  }

  _createClass(Board, [{
    key: 'createBubbles',
    value: function createBubbles() {
      var bubbles = [];
      for (var r = 0; r < BOARDOPTIONS.rowCount; r++) {
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

          bubbles[r].push(new _bubble2.default(bubbleX, bubbleY, this.ctx));
        }
      }
      return bubbles;
    }
  }, {
    key: 'drawBubbles',
    value: function drawBubbles() {
      for (var c = 0; c < BOARDOPTIONS.columnCount; c++) {
        for (var r = 0; r < BOARDOPTIONS.rowCount; r++) {
          this.bubbles[r][c].drawBubble();
        }
      }
    }
  }, {
    key: 'drawBoard',
    value: function drawBoard() {
      this.drawBubbles(this.ctx);
      // let shooter = new Shooter(this.canvas, this.ctx);
      // // shooter.drawShooter();
      // shooter.drawLoadedBubbles();
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = __webpack_require__(1);

var _bubble2 = _interopRequireDefault(_bubble);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shooter = function () {
  function Shooter(canvas, ctx, angle) {
    _classCallCheck(this, Shooter);

    this.loadedBubbles = [];
    this.canvas = canvas;
    // this.angle = angle;
    this.ctx = ctx;
    this.height = 50;
    this.width = 3;
  }

  _createClass(Shooter, [{
    key: 'degToRad',
    value: function degToRad(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: 'loadBubbles',
    value: function loadBubbles() {
      if (this.loadedBubbles.length !== 2) {
        if (this.loadedBubbles.length === 0) {
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 2 + 1, this.canvas.height - 10, this.ctx));
        } else {
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 4, this.canvas.height - 10, this.ctx));
        }
        this.loadBubbles();
      }
    }
  }, {
    key: 'drawShooter',
    value: function drawShooter(angle) {
      var radAngle = this.degToRad(angle);
      var centerx = this.canvas.width / 2;
      var centery = this.canvas.height - 10;
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#000000";
      this.ctx.beginPath();
      this.ctx.moveTo(centerx, centery);
      this.ctx.lineTo(centerx + 1.5 * 20 * Math.cos(radAngle), centery - 1.5 * 20 * Math.sin(radAngle));
      this.ctx.stroke();
      // this.ctx.beginPath();
      // this.ctx.rect(
      //   this.canvas.width/2,
      //   this.canvas.height - 60,
      //   this.width, this.height
      // );
    }
  }, {
    key: 'drawLoadedBubbles',
    value: function drawLoadedBubbles() {
      this.ctx.fillStyle = "#000000";
      this.ctx.fill();
      this.ctx.closePath();
      this.loadBubbles();
      this.loadedBubbles[0].drawBubble();
      this.loadedBubbles[1].drawBubble();
    }
  }]);

  return Shooter;
}();

exports.default = Shooter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(3);

var _board2 = _interopRequireDefault(_board);

var _shooter = __webpack_require__(4);

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
  }

  _createClass(Game, [{
    key: 'start',
    value: function start(angle) {
      this.board.drawBoard();
      this.shooter.drawShooter(angle);
      this.shooter.drawLoadedBubbles();
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.start();
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map