/**
 * PixiJS Application definitions.
 */
import { attachDnDHandlers } from './DragAndDrop'
import * as PIXI from 'pixi.js'
import * as ToPixiDrawer from './ToPixiDrawer'

const DECK_HEIGHT_FRAC = .1;
const PIECE_ZIDX = 10;

/*
 * Tonkin forces PIXI to use the Canvas renderer instead of
 * WebGL because of antialiasing issues with the Graphics
 * DrawingObject.
 */

export const stageHeight = 512 / .8;
export const stageWidth = 512;
export const tonkinApplication = new PIXI.Application({
  antialias: true,
  forceCanvas: true,
  height: stageHeight,
  width: stageWidth
});

tonkinApplication.renderer.backgroundColor = 0xe9f8f8;
tonkinApplication.stage.width = 512;
tonkinApplication.stage.height = 512;
tonkinApplication.stage.sortableChildren = true;

/* Applies a border style to the canvas element. */
(function() {
  const canvasStyle = tonkinApplication.view.style;
  canvasStyle.border = "2px";
  canvasStyle.borderColor = "#000";
  canvasStyle.borderStyle = "solid";
})();

export const upperDeckCont = new PIXI.Container();
upperDeckCont.x = upperDeckCont.y = 0;
upperDeckCont.width = stageWidth;
upperDeckCont.height = stageHeight * DECK_HEIGHT_FRAC;

export const boardCont = new PIXI.Container();
boardCont.x = 0;
boardCont.y = stageHeight * DECK_HEIGHT_FRAC;
boardCont.width = stageWidth;
boardCont.height = stageHeight * (1 - 2*DECK_HEIGHT_FRAC);

export const lowerDeckCont = new PIXI.Container();
lowerDeckCont.x = 0;
lowerDeckCont.y = stageHeight * (1 - DECK_HEIGHT_FRAC);
lowerDeckCont.width = stageWidth;
lowerDeckCont.height = stageHeight * DECK_HEIGHT_FRAC;

tonkinApplication.stage.addChild(upperDeckCont,
    boardCont, lowerDeckCont);
export const tonkinBoard = ToPixiDrawer.bindPixiToBoard(boardCont, 512, 512);

export var upperDeckGraphics, lowerDeckGraphics;
export var upperPiecesGraphics, lowerPiecesGraphics;

function onPieceDragStart() {
  return {
    highlightedPoint: -1
  };
}

function onPieceDrag(dragData) {
  // findPointInReach expects x,y of center
  const newHighlights = tonkinBoard.findPointInReach(
      this.x + this.width/2 - boardCont.x, this.y + this.height/2 - boardCont.y);
  const oldHighlight = dragData.highlightedPoint;

  if (newHighlights.length > 0) {
    let toHighlight = newHighlights.reduce((leastDist, curPoint) => {
      if (curPoint.distance < leastDist.distance)
        return curPoint;
      return leastDist;
    });
    const newHighlight = toHighlight.id;
    if (newHighlight === oldHighlight)
      return;

    ToPixiDrawer.applyShadeAtNode(newHighlight, 0x24dd34, tonkinBoard);
    dragData.highlightedPoint = newHighlight;
  } else if (oldHighlight !== -1) {
    dragData.highlightedPoint = -1;
  }

  if (oldHighlight !== -1) {
    ToPixiDrawer.applyShadeAtNode(oldHighlight, 0xFFFFFF, tonkinBoard);
  }
}

(function() {
  const deckHeight = stageHeight * DECK_HEIGHT_FRAC;
  function initDeckGraphics(deckCont) {
    let deckGraphics = new PIXI.Graphics();
    deckGraphics.x = deckGraphics.y = 0;
    deckGraphics.width = stageWidth;
    deckGraphics.height = deckHeight;
    deckCont.addChild(deckGraphics);

    const piecesGraphics = new PIXI.Graphics();
    piecesGraphics.width = piecesGraphics.height = 36;
    piecesGraphics.x = piecesGraphics.y = 10;
    piecesGraphics.beginFill(0xFFFFFF);
    piecesGraphics.lineStyle(2, 0);
    piecesGraphics.drawCircle(18, 18, 17);
    piecesGraphics.endFill();
    piecesGraphics.zIndex = PIECE_ZIDX;
    attachDnDHandlers(piecesGraphics, onPieceDragStart, onPieceDrag);
    tonkinApplication.stage.addChild(piecesGraphics);

    return deckGraphics;
  }

  upperDeckGraphics = initDeckGraphics(upperDeckCont);
  lowerDeckGraphics = initDeckGraphics(lowerDeckCont);

  upperDeckGraphics.lineStyle(4, 0);
  upperDeckGraphics.moveTo(0, deckHeight - 2);
  upperDeckGraphics.lineTo(stageWidth, deckHeight - 2);

  lowerDeckGraphics.lineStyle(4, 0);
  lowerDeckGraphics.moveTo(0, 0);
  lowerDeckGraphics.lineTo(stageWidth, 2);
})();

document.getElementById('tonkin-pixi-root')
  .appendChild(tonkinApplication.view);
