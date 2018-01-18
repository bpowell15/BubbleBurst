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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(4);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementById("BubbleBurstCanvas");
  var ctx = canvasEl.getContext("2d");
  var board = new _board2.default(canvasEl, ctx);
  board.drawBoard();
}); // const Game = require("./game");
// const GameView = require("./game_view");

/***/ }),
/* 1 */,
/* 2 */
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
      this.ctx.closePath();
    }
  }]);

  return Bubble;
}();

exports.default = Bubble;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = __webpack_require__(2);

var _bubble2 = _interopRequireDefault(_bubble);

var _shooter = __webpack_require__(5);

var _shooter2 = _interopRequireDefault(_shooter);

var _util = __webpack_require__(6);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARDOPTIONS = {
  bubbleWidth: 20,
  bubbleHeight: 20,
  offsetTop: 30,
  rowCount: 8,
  columnCount: 25
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
          var bubbleX = c * BOARDOPTIONS.bubbleWidth + 10;
          var bubbleY = r * BOARDOPTIONS.bubbleHeight + 10;

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
      var shooter = new _shooter2.default(this.canvas, this.ctx);
      shooter.drawShooter();
      shooter.drawLoadedBubbles();
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = __webpack_require__(2);

var _bubble2 = _interopRequireDefault(_bubble);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shooter = function () {
  function Shooter(canvas, ctx) {
    _classCallCheck(this, Shooter);

    this.loadedBubbles = [];
    this.canvas = canvas;
    this.ctx = ctx;
    this.height = 50;
    this.width = 3;
  }

  _createClass(Shooter, [{
    key: "loadBubbles",
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
    key: "drawShooter",
    value: function drawShooter() {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#0000ff";
      this.ctx.beginPath();
      this.ctx.moveTo(centerx, centery);
      this.ctx.lineTo(centerx + 1.5 * level.tilewidth * Math.cos(degToRad(player.angle)), centery - 1.5 * level.tileheight * Math.sin(degToRad(player.angle)));
      this.ctx.stroke();
      // this.ctx.beginPath();
      // this.ctx.rect(
      //   this.canvas.width/2,
      //   this.canvas.height - 60,
      //   this.width, this.height
      // );
    }
  }, {
    key: "drawLoadedBubbles",
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, [{
        key: "radToDeg",


        // Convert radians to degrees
        value: function radToDeg(angle) {
            return angle * (180 / Math.PI);
        }

        // Convert degrees to radians

    }, {
        key: "degToRad",
        value: function degToRad(angle) {
            return angle * (Math.PI / 180);
        }
    }, {
        key: "getMousePos",
        value: function getMousePos(canvas, e) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
                y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
            };
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(canvas, e) {
            // Get the mouse position
            var pos = this.getMousePos(canvas, e);

            // Get the mouse angle
            var mouseangle = radToDeg(Math.atan2(player.y + canvas.height + 10 - pos.y, pos.x - (player.x + canvas.width / 2)));

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

            // Set the player angle
            return mouseangle; ////// pass to shooter to set angle to draw at
        }
    }]);

    return Util;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map