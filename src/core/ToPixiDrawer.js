/**
 * Provides utilities to bind the {@code TonkinBoard} to a
 * PixiJS model.
 */
import { lineToPoint, TonkinBoard } from './TonkinBoard'
import * as PIXI from 'pixi.js'

/**
 * Constructs a new tonkin board that is binded to a PixiJS
 * graphics model in a given container.
 *
 * It sets the {@code boardGraphics} property to the Graphics
 * object used to draw the board's base layout. The radius of
 * the placeholders is set by the {@code nodeRadius} parameter.
 *
 * It is important to actually pass the overrideWidth & overrideHeight
 * parameters; apparently, PixiJS doesn't allow container to
 * retain their width and height as set.
 *
 * @param pixiContainer { PIXI.Container } the container in
 *    which a Graphics object will be added to show the board
 * @param [overrideWidth = pixiContainer.width] the width of
 *    of the graphics object to create
 * @param [overrideHeight = pixiContainer.height] the height
 *    of the graphics object to create
 * @param [nodeRadius = 18] the size of the placeholders for
 *    possible positions of pieces
 * @return the constructed {@code TonkinBoard} object
 */
export function bindPixiToBoard(pixiContainer,
    overrideWidth = pixiContainer.width,
    overrideHeight = pixiContainer.height,
    nodeRadius = 18) {
  if (overrideWidth != overrideHeight) {
    throw "The PIXI.Container object provided must have equal width " +
      "and height. The Tonkin board can only be binded to a square " +
      "geometry.";
  }

  const boardLength = overrideWidth * .9;
  const pointCorrection = overrideHeight * .05;
  const tonkinBoard = TonkinBoard
      .generate(boardLength, pointCorrection, pointCorrection);
  const pointMap = tonkinBoard.pointLocations;
  const boardGraphics = new PIXI.Graphics();
  boardGraphics.width = overrideWidth;
  boardGraphics.height = overrideHeight;
  boardGraphics.x = 0;
  boardGraphics.y = 0;
  boardGraphics.lineStyle(3, 0, 1);

  lineToPoint.forEach((line) => {
    const lineSlope = (pointMap[line[1]][1] - pointMap[line[0]][1]) /
                        (pointMap[line[1]][0] - pointMap[line[0]][0]);
    let dir = Math.sign(pointMap[line[1]][0] - pointMap[line[0]][0]);
    // dir tells if points are going forward or backward in x-axis

    if (dir == 0) {
      dir = -Math.sign(pointMap[line[1]][1] - pointMap[line[1]][0]);
      // dir tells if points are going forward in y-axis (inverted)
    }

    let hypotenuse, cosine, sine;
    if(pointMap[line[1]][0] != pointMap[line[0]][0]) {
      hypotenuse = Math.sqrt(1 + lineSlope*lineSlope);
      cosine = 1 / hypotenuse;
      sine = lineSlope / hypotenuse;
    } else {// Slope is vertical (INFINITY)
      cosine = 0;
      sine = 1;
    }

    // cX, cY tell how much space to leave for the placeholder circles.
    const cX = nodeRadius * cosine * dir, cY = nodeRadius * sine * dir;
    boardGraphics.moveTo(pointMap[line[0]][0] + cX, pointMap[line[0]][1] + cY);
    for (let pOff = 1; pOff < line.length; pOff++) {
      const rX = pointMap[line[pOff]][0], rY = pointMap[line[pOff]][1];

      const c1X = rX - cX, c1Y = rY - cY;
      const c2X = rX + cX, c2Y = rY + cY;

      boardGraphics.lineTo(c1X, c1Y);
      boardGraphics.moveTo(c2X, c2Y);
    }
  });

  // Draws the placeholder circles.
  boardGraphics.beginFill(0xFFFFFF);
  if (nodeRadius !== 0) pointMap.forEach((point) => {
      boardGraphics.drawCircle(point[0], point[1], nodeRadius);
  });
  boardGraphics.endFill();

  pixiContainer.addChild(boardGraphics);
  tonkinBoard.boardGraphics = boardGraphics;
  tonkinBoard.nodeRadius = nodeRadius;
  return tonkinBoard;
}

export function applyShadeAtNode(pointId, shade, tonkinBoard) {
  const point = tonkinBoard.pointLocations[pointId];

  tonkinBoard.boardGraphics.beginFill(shade);
  tonkinBoard.boardGraphics.drawCircle(point[0], point[1],
      tonkinBoard.nodeRadius);
  tonkinBoard.boardGraphics.endFill();
}

export function applyShadeAtAllNodes(pointIds, shade, tonkinBoard) {
  pointIds.forEach((pointId) => {
    applyShadeAtNode(pointId, shade, tonkinBoard);
  });
}
