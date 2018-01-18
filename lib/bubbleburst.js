// const Game = require("./game");
// const GameView = require("./game_view");
import Game from './game';
const Util = require('./util');
import Shooter from './shooter';


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("BubbleBurstCanvas");
  const ctx = canvasEl.getContext("2d");
  const util = new Util(canvasEl, ctx);
  let game = new Game(canvasEl, ctx);
  canvasEl.addEventListener("mousemove", util.onMouseMove);
  game.start(util.angle);
});
