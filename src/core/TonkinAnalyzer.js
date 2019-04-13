import { lineToPoint, pointToLine, TonkinBoard } from './TonkinBoard'

const ALPHA_INIT = Number.POSITIVE_INFINITY;
const BETA_INIT = Number.POSITIVE_INFINITY;

/**
 *
 */
export default class TonkinAnalyzer {

  constructor(board) {
    this.board = board;
  }

  executeMoveOnCopy(pieceId, dest, board) {
    let copy = board.copy();

    try {
      if (!copy.placePiece(pieceId >= 10 ? 1 : 0, pieceId, dest)) {
        throw "Invalid move executed in analysis!"
                    + "@TonkinAnalyzer.executeMoveOnCopy " + pieceId + ", " + dest;
      }
    } catch (e) {
      console.error(pieceId + " and " + dest + " move not working.");
      throw e;
    }

    return copy;
  }

  /**
   * Returns a [pieceId, [possible-destinations]] array for the
   * possible moves for each piece of the turning player. However,
   * it eliminates moves for more than one "not-placed" piece as
   * moving any "not-placed" piece is identical.
   *
   * @param [board] the board in which to find all moves
   */
  findAllMoves(board = this.board) {
    if (board.isFinished)
      return [];

    let allMoves = [];

    let start = (board.turn === 0) ? 0 : 10;
    let end = start + 10;
    let wasNotPlacedMoved = false;

    for (let pieceId = start; pieceId < end; pieceId++) {
      const loc = board.findPieceLocation(pieceId);

      allMoves[pieceId - start] = [
        pieceId,
        (loc === -1 && wasNotPlacedMoved) ?
          [] : board.findAllMovablePositions(pieceId)
      ];

      if (loc === -1) {
        wasNotPlacedMoved = true;
      }
    }

    return allMoves;
  }

  _minimax_minimizer(board, realDepthLimit, adjustedDepthLimit,
      realDepth, adjustedDepth, alpha, beta) {
    let moves = this.findAllMoves(board);
    let bestMove = 0, bestMoveScore = Number.POSITIVE_INFINITY;

    for (let midx = 0; midx < moves.length; midx++) {
      const pieceId = moves[midx][0];

      for (let posidx = 0; posidx < moves[midx][1].length; posidx++) {
        const dest = moves[midx][1][posidx];
        const resultBoard = this.executeMoveOnCopy(pieceId, dest, board);
        const resultScore = this.minimaxCompute(resultBoard, realDepthLimit,
                                adjustedDepthLimit, realDepth + 1,
                                adjustedDepth, alpha, beta);

        if (resultScore < bestMoveScore) {
          bestMove = [pieceId, dest];
          bestMoveScore = resultScore;
        }
      }
    }

    if (realDepth === 0) {
      this.minimax_move = bestMove;
    }

    return bestMoveScore;
  }

  _minimax_maximizer(board, realDepthLimit, adjustedDepthLimit,
      realDepth, adjustedDepth, alpha, beta) {
    let moves = this.findAllMoves(board);
    let bestMove = 0, bestMoveScore = Number.NEGATIVE_INFINITY;

    for (let midx = 0; midx < moves.length; midx++) {
      const pieceId = moves[midx][0];
      for (let posidx = 0; posidx < moves[midx][1].length; posidx++) {
        const dest = moves[midx][1][posidx];
        const resultBoard = this.executeMoveOnCopy(pieceId, dest, board);
        const resultScore = this.minimaxCompute(resultBoard, realDepthLimit,
                                adjustedDepthLimit, realDepth + 1,
                                adjustedDepth, alpha, beta);

        if (resultScore > bestMoveScore) {
          bestMove = [pieceId, dest];
          bestMoveScore = resultScore;
        }
      }
    }

    if (realDepth === 0) {
      this.minimax_move = bestMove;
    }

    return bestMoveScore;
  }

  minimaxCompute(board=this.board, realDepthLimit=2, adjustedDepthLimit=3,
      realDepth = 0, adjustedDepth = 0, alpha = ALPHA_INIT,
      beta = BETA_INIT) {
    // adjustedDepth is obselete. It was added to allow extended searches
    // for favourables moves. No such favourable move detection exists.

    if (realDepth >= realDepthLimit || adjustedDepth >= adjustedDepthLimit
          || board.isFinished) {
      return TonkinAnalyzer.findScore(board);
    }

    if (board._turn === 0) {
      return this._minimax_maximizer(board, realDepthLimit, adjustedDepthLimit,
                realDepth, adjustedDepth, alpha, beta);
    } else {
      return this._minimax_minimizer(board, realDepthLimit, adjustedDepthLimit,
                realDepth, adjustedDepth, alpha, beta);
    }
  }

  /**
   * Analyzes the situation on the board and returns heuristic
   * telling in whose favor the game is in.
   *
   * It adds points for lines filled purely (not 'completely') by
   * the first player and subtracts points for lines filled purely
   * by the second player. The number of points added or subtracted
   * is proportinal to the fraction of the line filled.
   *
   * A heuristic of 0 means both players are faring equally.
   *
   * @param target { TonkinBoard } the board to analyze
   * @return a heuristic telling in whose favor the game is in
   */
  static findScore(target) {
    if (target.isFinished) {
      if (target.winner === 0)
        return Number.POSITIVE_INFINITY;
      else
        return Number.NEGATIVE_INFINITY;
    }

    let totalScore = 0;

    for (let lidx = 0; lidx < lineToPoint.length; lidx++) {
      const line = lineToPoint[lidx];
      const lineLength = line.length;
      let lineFilledFirstPlayer = 0, lineFilledSecondPlayer = 0;

      for (let poff = 0; poff < lineLength; poff++) {
        const filler = target.pointLocations[line[poff]].piece;

        if (filler !== undefined) {
          if (filler < 10) {
            lineFilledFirstPlayer++;
          } else {
            lineFilledSecondPlayer++;
          }

          if (lineFilledFirstPlayer > 0 && lineFilledSecondPlayer > 0) {
            lineFilledFirstPlayer = lineFilledSecondPlayer = 0;// zero score
            break;
          }
        }
      }

      // only contributed if line is filled by one player.
      totalScore += (lineFilledFirstPlayer - lineFilledSecondPlayer)
                      * 105 / lineLength;
    }

    return totalScore;
  }

}
