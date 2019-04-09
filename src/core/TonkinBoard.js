/*
 * Each type of point is given a specific identifier.
 */

export const MCE = 0;
export const MMP = [1, 2, 3, 4];// l, t, r, b
export const MCP = [5, 6, 7, 8];// tl, tr, bl, br
export const EQMP = [9, 10, 11, 12, 13, 14, 15, 16];// tl, tr, bl, br x 2 (clockwise)
export const IQMP = [17, 18, 19, 20];// l, t, r, b
export const QCP = [21, 22, 23, 24];// tl, tr, bl, br
export const ICO = QCP;// same
export const TDB = [25, 26, 27, 28];// tl, tr, bl, br
export const TDT = [29, 30, 31, 32, 33, 34, 35, 36];// tl, tr, bl, br
export const TDD = [37, 38, 39, 40, 41, 42, 43, 44];// tl, tr, bl, br

/**
 * Stores the coordinates of each possible tonkin position in
 * an array by the position id. Each coordinate is an (array)
 * ordered-pair of x & y value.
 *
 * This array forms a 2x2 tonkin board, with the origin at the
 * MCE point. It can be used as a seed/reference to get the
 * coordinates of a tonkin board with arbitrary length.
 */
const pSeed = [
  [0, 0], // main center point
  [-1, 0], [0, 1], [1, 0], [0, -1], // main midpoints
  [-1, 1], [1, 1], [-1, -1], [1, -1], // main corner points
  [-1, .5], [-.5, 1], [.5, 1], [1, .5], // eqmp (tl & tr)
  [-.5, -1], [-1, -.5], [1, -.5], [.5, -1], // eqmp (bl & br)
  [-.5, 0], [0, .5], [.5, 0], [0, -.5], // internal quadrant midpoints
  [-.5, .5], [.5, .5], [-.5, -.5], [.5, -.5], // quadrant center points
  [-.75, .75], [.75, .75], [-.75, -.75], [.75, -.75], // tilted diag. bipoints
  [-2/3, 1/3], [-1/3, 2/3], [1/3, 2/3], [2/3, 1/3], // tdt pairs (lt & lr)
  [-1/3, -2/3], [-2/3, -1/3], [2/3, -1/3], [1/3, -2/3], // tdt pairs (bl & br)
  [-.5, .25], [-.25, .5], [.25, .5], [.5, .25], // tdd pairs (lt & lr)
  [-.25, -.5], [-.5, -.25], [.5, -.25], [.25, -.5] // tdd pairs (bl & br)
];

export const lineToPoint = [
  /* All lines passing through the main center point!!! */
  [EQMP[0*2+1], TDT[0*2+1], TDD[0*2+1], MCE,
      TDD[3*2+1], TDT[3*2+1], EQMP[3*2+1]], // tilted diag.
  [MCP[0], TDB[0], ICO[0], MCE, ICO[3], TDB[3], MCP[3]], // main diagonal
  [EQMP[0*0+0], TDT[0*2+0], TDD[0*2+0], MCE,
      TDD[3*2+0], TDT[3*2+0], EQMP[3*2+0]], // titled diag.
  [MMP[0], IQMP[0], MCE, IQMP[2], MMP[2]], // horizontal line
  [EQMP[2*2+1], TDT[2*2+1], TDD[2*2+1], MCE,
      TDD[1*2+1], TDT[1*2+1], EQMP[1*2+1]], // tilted diag.
  [MCP[2], TDB[2], ICO[2], MCE, ICO[1], TDB[1], MCP[1]], // main diagonal
  [EQMP[2*2+0], TDT[2*2+0], TDD[2*2+0], MCE,
      TDD[1*2+0], TDT[1*2+0], EQMP[1*2+0]], // tilted diag.
  [MMP[3], IQMP[3], MCE, IQMP[1], MMP[1]], // vertical line

  /* All edges of the inner square (l,t,r,b) */
  [ICO[2], TDD[2*2+1], IQMP[0], TDD[0*2+0], ICO[0]],
  [ICO[0], TDD[0*2+1], IQMP[1], TDD[1*2+0], ICO[1]],
  [ICO[1], TDD[1*2+1], IQMP[2], TDD[3*2+0], ICO[3]],
  [ICO[3], TDD[3*2+1], IQMP[3], TDD[2*2+0], ICO[2]],

  /* All edges of the quadrant-diagonal square (tr,tr,bl,br) */
  [MMP[0], TDT[0*2+0], ICO[0], TDT[0*2+1], MMP[1]],
  [MMP[1], TDT[1*2+0], ICO[1], TDT[1*2+1], MMP[2]],
  [MMP[3], TDT[2*2+0], ICO[2], TDT[2*2+1], MMP[0]],
  [MMP[2], TDT[3*2+0], ICO[3], TDT[3*2+1], MMP[3]],

  /* All semi-diagonals (tl,tr,bl,br)*/
  [EQMP[0*2+0], TDB[0], EQMP[0*2+1]],
  [EQMP[1*2+0], TDB[1], EQMP[1*2+1]],
  [EQMP[3*2+0], TDB[3], EQMP[3*2+1]],
  [EQMP[2*2+0], TDB[2], EQMP[2*2+1]],

  /* All edges of the outer/main square (l,t,r,b) */
  [MCP[2], EQMP[2*2+1], MMP[0], EQMP[0*2+0], MCP[0]],
  [MCP[0], EQMP[0*2+1], MMP[1], EQMP[1*2+0], MCP[1]],
  [MCP[1], EQMP[1*2+1], MMP[2], EQMP[3*2+0], MCP[3]],
  [MCP[3], EQMP[3*2+1], MMP[3], EQMP[2*2+0], MCP[2]]
];

/**
 * Stores all the lines that a point lies on in the tonkin
 * board. It is the reverse map for {@link lineToPoint}.
 *
 * It is initialized lazily at runtime.
 */
export const pointToLine = new Array(pSeed.length);

(function() {/* Initializes pointToLine as a reverse map for lineToPoint */
  for (let pointIdx = 0; pointIdx < pointToLine.length; pointIdx++) {
    pointToLine[pointIdx] = [];
  }

  for (let lineIdx = 0; lineIdx < lineToPoint.length; lineIdx++) {
    const line = lineToPoint[lineIdx];
    for (let pOff = 0; pOff < line.length; pOff++)
      pointToLine[line[pOff]].push(lineIdx);
  }
})();

export class TonkinBoard {

  constructor(pointLocations = pSeed) {
    this.pointLocations = pointLocations;
  }

  /**
   * Generates a {@code TonkinBoard} with all points initialized
   * in a coordinate system of a HTML canvas (y-axis below).
   *
   * The board size will be {@code boardLength} and the origin at
   * the top-left main corner point.
   *
   * @param boardLength - length of the board
   */
  static generate(boardLength, shiftX=0, shiftY=0) {
    const pointCount = pSeed.length;
    const pointLocations = new Array(pointCount);

    const scaleFactor = boardLength / 2;// pSeed -> pointLocations

    for (let pId = 0; pId < pointCount; pId++) {
      const point = pSeed[pId];
      const pX = point[0], pY = point[1];

      const nX = (pX + 1) * scaleFactor + shiftX;
      const nY = (1 - pY) * scaleFactor + shiftY;

      pointLocations[pId] = [nX, nY];
    }

    return new TonkinBoard(pointLocations);
  }

}
