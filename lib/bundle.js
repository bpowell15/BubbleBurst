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
          this.loadedBubbles.push(new _bubble2.default(this.canvas.width / 2 + 75, this.canvas.height - 15, this.ctx, 1));
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

var BUBBLECOLORS = ["#2EFE2E", "#0040FF", "#FF0000", "#ff9900", "#660066", "#ff66ff"];

var Bubble = function () {
  function Bubble(x, y, ctx, type, pos) {
    var rowshift = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var color = arguments[6];

    _classCallCheck(this, Bubble);

    this.bubbleColor = color || this.pickBubbleColor();
    this.bubbleRadius = 15;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.pos = pos || { r: null, c: null };
    this.angle = 90;
    this.type = type;
    this.speed = 20;
    this.rowShift = rowshift;
  }

  _createClass(Bubble, [{
    key: "pickBubbleColor",
    value: function pickBubbleColor() {
      return BUBBLECOLORS[Math.floor(Math.random() * BUBBLECOLORS.length)];
    }
  }, {
    key: "drawBubble",
    value: function drawBubble() {
      // var grd=this.ctx.createRadialGradient(this.x, this.y, 5 ,this.x,this.y, 13);
      // grd.addColorStop(.5,this.bubbleColor);
      // grd.addColorStop(1,"rgba(46, 254, 46, .1)");
      if (this.type === 1) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.bubbleRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.bubbleColor;
        this.ctx.fill();
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.x - 5, this.y - 5, 1, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(255, 255, 255, .5)";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.x - 5, this.y - 5, 3, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(255, 255, 255, .3)";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.x - 5, this.y - 5, 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(255, 255, 255, .2)";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.x - 5, this.y - 5, 7, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(255, 255, 255, .1)";
        this.ctx.fill();

        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
        // this.ctx.fillStyle = this.bubbleColor;
        // this.ctx.fill();
        // this.ctx.strokeStyle = "#000000";
        // this.ctx.stroke();
        //   this.ctx.closePath();
        //   this.ctx.arc(this.x - 7, this.y - 7, 3, 0, Math.PI*2, false);
        //   this.fillStyle = '#ffffff';
        //   this.ctx.fill();
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
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token (345:1)\n\n\u001b[0m \u001b[90m 343 | \u001b[39m\n \u001b[90m 344 | \u001b[39m  removeCluster(cluster){\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 345 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\n \u001b[90m     | \u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 346 | \u001b[39m    \u001b[36mconst\u001b[39m pop \u001b[33m=\u001b[39m ((cluster)\u001b[33m=>\u001b[39m{\n \u001b[90m 347 | \u001b[39m      cluster\u001b[33m.\u001b[39mforEach((bubble)\u001b[33m=>\u001b[39m {\n \u001b[90m 348 | \u001b[39m        bubble\u001b[33m.\u001b[39mtype \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map