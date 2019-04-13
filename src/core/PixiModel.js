/**
 * PixiJS Application definitions.
 */
import AnimationUtils from './AnimationUtils'
import { attachDnDHandlers } from './DragAndDrop'
import * as PIXI from 'pixi.js'
import TonkinAnalyzer from './TonkinAnalyzer'
import * as ToPixiDrawer from './ToPixiDrawer'

const DECK_HEIGHT_FRAC = .1;
const PIECE_ZIDX = 10;

/*
 * Tonkin forces PIXI to use the Canvas renderer instead of
 * WebGL because of antialiasing issues with the Graphics
 * DrawingObject.
 */

const heightToWidthRatio = .8;
export var stageHeight = 512 / .8;
export var stageWidth = 512;
export var displayedNodeRadius = 18;

(function() {
    const winWidth = window.innerWidth, winHeight = window.innerHeight;

    if (winWidth > winHeight * heightToWidthRatio) {
      // height is limiting factor
      stageHeight = winHeight * .85;
      stageWidth = stageHeight * heightToWidthRatio;
    } else {
      // width is limiting factor
      stageWidth = winWidth * .85;
      stageHeight = stageWidth / heightToWidthRatio;
    }

    displayedNodeRadius = stageWidth * 18 / 512;
})();

export const tonkinApplication = new PIXI.Application({
  antialias: true,
//  forceCanvas: true,
  height: stageHeight,
  width: stageWidth
});

tonkinApplication.renderer.backgroundColor = 0xe9f8f8;
tonkinApplication.stage.width = stageWidth;
tonkinApplication.stage.height = stageHeight;
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
export const tonkinBoard = ToPixiDrawer.bindPixiToBoard(boardCont, stageWidth, stageWidth, displayedNodeRadius);

export var upperDeckGraphics, lowerDeckGraphics;
export var upperPiecesGraphics, lowerPiecesGraphics;

/**
 * The drag-start event handler. It sets the highlighted point
 * to none (-1).
 */
function onPieceDragStart() {
  let dragData = {
    highlightedPoint: -1,
    possiblePositions: tonkinBoard.findAllMovablePositions(
                        this.tonkinPieceData.pieceId)
  };

  ToPixiDrawer.applyShadeAtAllNodes(dragData.possiblePositions,
      0xffff94, tonkinBoard);
  return dragData;
}

/**
 * The drag event handler for tonkin pieces. It highlights
 * position at which the piece will be dropped into if the
 * user stops dragging.
 *
 * @param dragData
 * @see attachDnDHandlers
 */
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

    ToPixiDrawer.applyShadeAtNode(newHighlight, 0xffdd34, tonkinBoard);
    dragData.highlightedPoint = newHighlight;
  } else if (oldHighlight !== -1) {
    dragData.highlightedPoint = -1;
  }

  if (oldHighlight !== -1) {
    ToPixiDrawer.applyShadeAtNode(oldHighlight,
        dragData.possiblePositions.includes(oldHighlight) ?
          0xffff94 : 0xFFFFFF, tonkinBoard);
  }
}

/**
 * Clips the piece into the highlighted position; if no position
 * is highlighted then it animates the piece back to its original
 * position.
 */
function onPieceDragEnd(dragData) {
  if (dragData.highlightedPoint !== -1 && tonkinBoard._turn === 0 &&
        tonkinBoard.placePiece(this.tonkinPieceData.playerId,
          this.tonkinPieceData.pieceId, dragData.highlightedPoint)) {
    const newPointPosition =
        tonkinBoard.pointLocations[dragData.highlightedPoint];
    this.x = newPointPosition[0] + boardCont.x - tonkinBoard.nodeRadius;
    this.y = newPointPosition[1] + boardCont.y - tonkinBoard.nodeRadius;
  } else {
    if (dragData.highlightedPoint !== -1) {
      ToPixiDrawer.applyShadeAtNode(dragData.highlightedPoint, 0xFFFFFF,
          tonkinBoard);
    }

    AnimationUtils.startAnimation(this, 500, AnimationUtils.pathFunction(
      this.position, this.dndState.originalPosition,
      AnimationUtils.linearAccelaration(5)
    ));
  }

  ToPixiDrawer.applyShadeAtAllNodes(dragData.possiblePositions,
        0xFFFFFF, tonkinBoard);// Remove possible-move highlighting
}

/**
 * Registered move handler for the tonkin-board. It will invoke
 * the computer-move or listen to the network (not made yet!).
 */
function onMove(event, details) {
  if (event === 'move') {
    if (details.turn === 1) {
      let target = tonkinBoard.graphics[details.piece];
      let newLocationArr = tonkinBoard.pointLocations[details.newPosition];
      let newPosition = {
        x: newLocationArr[0] - displayedNodeRadius + boardCont.x,
        y: newLocationArr[1] - displayedNodeRadius + boardCont.y
      };
      AnimationUtils.startAnimation(target, 800, AnimationUtils.pathFunction(
       target.position, newPosition, AnimationUtils.linearAccelaration(3)
      ));
    } else if (tonkinBoard.isFinished !== true) {
      window.setTimeout(function() {
        let analyzer = new TonkinAnalyzer(tonkinBoard);
        analyzer.minimaxCompute();
        tonkinBoard.placePiece(1, analyzer.minimax_move[0], analyzer.minimax_move[1]);
      }, 200);
    }
  }

  if (tonkinBoard.isFinished) {
    document.getElementById('game-over-msg').innerHTML = "GAME OVER! Reload!";
    return;
  }
}

/**
 * Initializes both the upper and lower decks and binds the
 * displayed piece graphics to the actual tonkin-board.
 */
(function() {
  const deckHeight = stageHeight * DECK_HEIGHT_FRAC;
  let playerId = 0;
  tonkinBoard.graphics = [];
  tonkinBoard.addEventListener(onMove);

  function initDeckGraphics(deckCont, color) {
    let deckGraphics = new PIXI.Graphics();
    deckGraphics.x = deckGraphics.y = 0;
    deckGraphics.width = stageWidth;
    deckGraphics.height = deckHeight;
    deckCont.addChild(deckGraphics);

    const allPieceGraphics = new Array(10);
    deckCont.tonkinPlayerData = {
      pieceGraphics: allPieceGraphics,
      playerId: playerId
    };

    for (let i = 0; i < 10; i++) {
      const pieceGraphics = new PIXI.Graphics();
      allPieceGraphics.push(pieceGraphics);
      pieceGraphics.width = pieceGraphics.height = displayedNodeRadius * 2;
      pieceGraphics.x = deckCont.x + stageWidth * .9;
      pieceGraphics.y = deckCont.y + deckHeight / 2 - displayedNodeRadius;
      pieceGraphics.beginFill(color);
      pieceGraphics.lineStyle(2, 0);
      pieceGraphics.drawCircle(displayedNodeRadius, displayedNodeRadius, displayedNodeRadius - 1);
      pieceGraphics.endFill();
      pieceGraphics.zIndex = PIECE_ZIDX;

      pieceGraphics.tonkinPieceData = {
        playerId: playerId,
        pieceId: i + playerId * 10
      };

      tonkinBoard.graphics.push(pieceGraphics);

      attachDnDHandlers(pieceGraphics, onPieceDragStart,
          onPieceDrag, onPieceDragEnd);
      tonkinApplication.stage.addChild(pieceGraphics);
    }

    ++playerId;
    return deckGraphics;
  }

  upperDeckGraphics = initDeckGraphics(upperDeckCont, 0xFEDCBA);
  lowerDeckGraphics = initDeckGraphics(lowerDeckCont, 0xABCDEF);

  upperDeckGraphics.lineStyle(4, 0);
  upperDeckGraphics.moveTo(0, deckHeight - 2);
  upperDeckGraphics.lineTo(stageWidth, deckHeight - 2);

  lowerDeckGraphics.lineStyle(4, 0);
  lowerDeckGraphics.moveTo(0, 0);
  lowerDeckGraphics.lineTo(stageWidth, 2);
})();

document.getElementById('tonkin-pixi-root')
  .appendChild(tonkinApplication.view);
