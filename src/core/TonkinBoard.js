/**
 * Defines the static layout of the tonkin board and wraps
 * the runtime state of the game.
 *
 * The {@link lineToPoint} and {@link pointToLine} objects
 * define the relation b/w possible positions of pieces and
 * the lines along which they lie.
 *
 * The {@link pSeed} object holds the exact locations of the
 * positions for a 2x2 tonkin board. It is used by the
 * {@code TonkinBoard.generate} method to get the coordinates
 * for any board of arbitrary size.
 *
 * The {@link TonkinBoard} class holds the runtime state of
 * the game.
 */

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

/**
 * Contains an array of lines (which are arrays of point-ids)
 * in the order defined in the specification.
 *
 * To get all the lines passing through a point, use the reverse
 * map {@link pointToLine}
 */
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

/**
 * @return whether point and otherPoint lie on the same line and
 *    are neighbouring points.
 */
function isNeighbouringPair(point, otherPoint) {
  for (let pLineIdx = 0; pLineIdx < pointToLine[point].length; pLineIdx++) {
    const testLine = lineToPoint[pointToLine[point][pLineIdx]];
    const pointOff = testLine.indexOf(point);

    if (pointOff > 0 && testLine[pointOff - 1] == otherPoint)
      return true;
    if (pointOff < testLine.length - 1 && testLine[pointOff + 1] == otherPoint)
      return true;
  }

  return false;
}

/**
 * Finds all the neighbouring positions for the given
 * point.
 *
 * @return all neighbouring positions of point
 */
function findAllNeighbouringPositions(point) {
  let lineSet = pointToLine[point];
  let requiredPositions = [];

  for (let lidx = 0; lidx < lineSet.length; lidx++) {
    const line = lineToPoint[lineSet[lidx]];
    const pointOff = line.indexOf(point);

    if (pointOff > 0)
      requiredPositions.push(line[pointOff - 1]);
    if (pointOff < line.length - 1)
      requiredPositions.push(line[pointOff + 1]);
  }

  return requiredPositions;
}

export class TonkinBoard {

  /**
   * Constructs a tonkin board.
   *
   * @param pointLocations=pSeed - location map of the points
   * @param [source] - TonkinBoard to (deep) copy
   */
  constructor(pointLocations = pSeed, source) {
    if (source !== undefined &&
          source instanceof TonkinBoard) {// copy from source instead
      this.pointLocations = new Array(source.pointLocations.length);
      this.nodeRadius = source.nodeRadius;
      this._pieceRecord = [...source._pieceRecord];
      this._turn = source._turn;

      for (let plidx = 0; plidx < source.pointLocations.length; plidx++) {
        const sourceRecord = source.pointLocations[plidx];
        this.pointLocations[plidx] = {};
        this.pointLocations[plidx].piece = sourceRecord.piece;
      }

      this.isFinished = source.isFinished;
      this.winner = source.winner;
      return;
    }

    /**
     * A map of the coordinates of each point by its id.
     */
    this.pointLocations = pointLocations;

    /**
     * Displayed size of position placeholders.
     */
    this.nodeRadius = 0;

    /*
     * Array that contain the point-id at which
     * the piece is placed right now. If the piece has not been
     * placed yet, the point-id is zero.
     */
    this._pieceRecord = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    ];

    /*
     * Holds which player has the turn right now. 0 for the first
     * player and 1 for the second player.
     */
    this._turn = 0;

    /**
     * This is set to true when the {@code TonkinBoard} will reject
     * all further inputs. That happens when one player wins or if
     * an external circumstance arises (like resignation). Set it to
     * true to forcibly end the game.
     */
    this.isFinished = false;

    /**
     * This is set when the game ends by {@code TonkinBoard}. However,
     * if an external component sets {@code isFinished} to true, then it
     * may not be initialized.
     */
    this.winner = undefined;

    /**
     * The list of event-listeners registered with this board. Note that
     * this isn't copied ever.
     */
    this._eventListeners = [];
  }

  /**
   * @readonly
   * @return the player who has the current turn
   */
  get turn() {
    return this._turn;
  }

  /**
   * Returns the points that are "in-reach" from the point
   * given. A point is in reach in the circles at centers
   * (fromX, fromY) and (pointX, pointY) overlap with radii
   * reachRadius & this.nodeRadius.
   *
   * The returned array contains object with an id property
   * and a distance property. The id is the point-id and the
   * distance is the separation b/w the from-point and the
   * point.
   *
   * @param fromX
   * @param fromY
   * @param reachRadius
   */
  findPointInReach(fromX, fromY, reachRadius=this.nodeRadius) {
    const inReachPoints = [];

    for (let pointId = 0; pointId < this.pointLocations.length; pointId++) {
      const point = this.pointLocations[pointId];
      const pointX = point[0], pointY = point[1];
      const deltaX = fromX - pointX, deltaY = pointY - fromY;
      const centerDistance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

      if (centerDistance - reachRadius < this.nodeRadius) {
        inReachPoints.push({ id: pointId, distance: centerDistance });
      }
    }

    return inReachPoints;
  }

  /**
   * @param position - point-id of the position
   * @return player holding the position given; -1 if neither
   *    player a position.
   */
  findPlayerOwningPosition(position) {
    const pieceId = this.pointLocations[position].piece;
    if (pieceId === undefined)
      return -1;
    return (pieceId >= 10) ? 1: 0;
  }

  /**
   * Searches for any line that is completely filled by any one
   * player. Returns the player's id if any is found.
   *
   * @return player-id who completed one full line; -1, if not
   *    done yet!
   */
  isAnyLineSaturated() {
    for (let lineIdx = 0; lineIdx < lineToPoint.length; lineIdx++) {
      let line = lineToPoint[lineIdx];
      let playerId = this.findPlayerOwningPosition(line[0]);
      if (playerId === -1)
        continue;
      let isAnyNotSame = false;// not same as first piece

      for (let pointOff = 1; pointOff < line.length; pointOff++) {
        const pointId = line[pointOff];

        if (this.findPlayerOwningPosition(pointId) !== playerId) {
          isAnyNotSame = true;
          break;
        }
      }

      if (!isAnyNotSame) {
        if (this._eventListeners !== undefined)
          console.log("Saturated: " + lineIdx);
        return playerId;
      }
    }

    return -1;
  }

  /**
   * @return an array of all point-ids that are not occupied by
   *    any piece currently.
   */
  findAllEmptyPositions() {
    let emptyPositions = [];
    for (let pid = 0; pid < this.pointLocations.length; pid++) {
      if (this.pointLocations[pid].piece === undefined)
        emptyPositions.push(pid);
    }

    return emptyPositions;
  }

  /**
   * @return all the possible positions a piece
   */
  findAllMovablePositions(piece) {
    const point = this._pieceRecord[piece];
    if (point === -1) {
      // not placed yet!
      return this.findAllEmptyPositions();
    }

    return findAllNeighbouringPositions(point).filter((pointId) => {
      return this.findPlayerOwningPosition(pointId) === -1;
    }, this);
  }

  /**
   * @param piece - the piece-id
   * @return the location of the given piece
   */
  findPieceLocation(piece) {
    return this._pieceRecord[piece];
  }

  /**
   * Places the piece (playerId, pieceId) at the new
   * position if allowed by the rules of the game.
   *
   * @param playerId - 0 for first player, 1 for second
   * @param pieceId - id of the piece
   * @param newPosition - new point-id to place the piece at
   * @return whether the piece was placed at the new position
   *    or not.
   */
  placePiece(playerId, pieceId, newPosition) {
    if (playerId != this._turn || this.isFinished) {
      if (!this.isFinished)
        console.log("Wrong turn");
      else
        console.log("FINISHED DUDE!! " + this.winner);
      return false;// not this player's turn or game ended already
    }
    if (this.pointLocations[newPosition].piece !== undefined) {
      return false;// already occupied
    }

    let oldPosition = this._pieceRecord[pieceId];
    if (oldPosition === -1 || isNeighbouringPair(oldPosition, newPosition)) {
      this._pieceRecord[pieceId] = newPosition;
      if (oldPosition !== -1)
        this.pointLocations[oldPosition].piece = undefined;
      this.pointLocations[newPosition].piece = pieceId;

      const oldTurn = this._turn;
      this._turn = (this._turn === 0) ? 1 : 0;

      const isAnyLineSaturated = this.isAnyLineSaturated();
      if (isAnyLineSaturated !== -1) {
        this.isFinished = true;
        this.winner = isAnyLineSaturated;
      }

      this._dispatchEvent("move", { turn : oldTurn });
      return true;
    }

    return false;
  }

  /**
   * Returns a copy of this {@code TonkinBoard}. It is equivalent
   * calling {@code new TonkinBoard(undefined, tonkinBoardObject)}.
   *
   * @return a copy of this TonkinBoard
   */
  copy() {
    return new TonkinBoard(undefined, this);
  }

  _dispatchEvent(event, details) {
    if (this._eventListeners === undefined)
      return;

    this._eventListeners.forEach((listener) => {
      listener(event, details);
    });
  }

  addEventListener(listener) {
    if (this._eventListeners === undefined) {
      this._eventListeners = [];
    }

    this._eventListeners.push(listener);
  }

  removeEventListener(listener) {
    this._eventListeners.splice(this._eventListeners.indexOf(listener), 1);
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
