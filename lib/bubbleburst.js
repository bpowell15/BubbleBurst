// const Game = require("./game");
// const GameView = require("./game_view");
import Board from './board';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("BubbleBurstCanvas");
  const ctx = canvasEl.getContext("2d");
  let board= new Board(canvasEl, ctx);
  board.drawBoard();
});
