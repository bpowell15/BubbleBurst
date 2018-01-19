// const Game = require("./game");
// const GameView = require("./game_view");
import Game from './game';
import Shooter from './shooter';


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("BubbleBurstCanvas");
  const ctx = canvasEl.getContext("2d");
  let game = new Game(canvasEl, ctx);
  game.drawGame();
});
