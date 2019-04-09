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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/PixiModel.js":
/*!*******************************!*\
  !*** ./src/core/PixiModel.js ***!
  \*******************************/
/*! exports provided: tonkinApplication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tonkinApplication\", function() { return tonkinApplication; });\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"pixi.js\");\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pixi_js__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * PixiJS Application definitions.\n */\n\n/*\n * Tonkin forces PIXI to use the Canvas renderer instead of\n * WebGL because of antialiasing issues with the Graphics\n * DrawingObject.\n */\n\nvar tonkinApplication = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Application\"]({\n  antialias: true,\n  forceCanvas: true,\n  height: 512,\n  width: 512\n});\ntonkinApplication.renderer.backgroundColor = 0xe9f8f8;\ntonkinApplication.stage.width = 512;\ntonkinApplication.stage.height = 512;\n/* Applies a border style to the canvas element. */\n\n(function () {\n  var canvasStyle = tonkinApplication.view.style;\n  canvasStyle.border = \"2px\";\n  canvasStyle.borderColor = \"#000\";\n  canvasStyle.borderStyle = \"solid\";\n})();\n\ndocument.getElementById('tonkin-pixi-root').appendChild(tonkinApplication.view);\n\n//# sourceURL=webpack:///./src/core/PixiModel.js?");

/***/ }),

/***/ "./src/core/ToPixiDrawer.js":
/*!**********************************!*\
  !*** ./src/core/ToPixiDrawer.js ***!
  \**********************************/
/*! exports provided: bindPixiToBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bindPixiToBoard\", function() { return bindPixiToBoard; });\n/* harmony import */ var _TonkinBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TonkinBoard */ \"./src/core/TonkinBoard.js\");\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pixi.js */ \"pixi.js\");\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pixi_js__WEBPACK_IMPORTED_MODULE_1__);\n/**\n * Provides utilities to bind the {@code TonkinBoard} to a\n * PixiJS model.\n */\n\n\n/**\n * Binds\n */\n\nfunction bindPixiToBoard(pixiContainer) {\n  var overrideWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pixiContainer.width;\n  var overrideHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pixiContainer.height;\n  var nodeRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 18;\n\n  if (overrideWidth != overrideHeight) {\n    throw \"The PIXI.Container object provided must have equal width \" + \"and height. The Tonkin board can only be binded to a square \" + \"geometry.\";\n  }\n\n  var boardLength = overrideWidth * .9;\n  var pointCorrection = overrideHeight * .05;\n  var tonkinBoard = _TonkinBoard__WEBPACK_IMPORTED_MODULE_0__[\"TonkinBoard\"].generate(boardLength, pointCorrection, pointCorrection);\n  var pointMap = tonkinBoard.pointLocations;\n  var boardGraphics = new pixi_js__WEBPACK_IMPORTED_MODULE_1__[\"Graphics\"]();\n  boardGraphics.width = overrideWidth;\n  boardGraphics.height = overrideHeight;\n  boardGraphics.x = 0;\n  boardGraphics.y = 0;\n  boardGraphics.lineStyle(3, 0, 1);\n  _TonkinBoard__WEBPACK_IMPORTED_MODULE_0__[\"lineToPoint\"].forEach(function (line) {\n    var lineSlope = (pointMap[line[1]][1] - pointMap[line[0]][1]) / (pointMap[line[1]][0] - pointMap[line[0]][0]);\n    var dir = Math.sign(pointMap[line[1]][0] - pointMap[line[0]][0]); // dir tells if points are going forward or backward in x-axis\n\n    if (dir == 0) {\n      dir = -Math.sign(pointMap[line[1]][1] - pointMap[line[1]][0]); // dir tells if points are going forward in y-axis (inverted)\n    }\n\n    var hypotenuse, cosine, sine;\n\n    if (pointMap[line[1]][0] != pointMap[line[0]][0]) {\n      hypotenuse = Math.sqrt(1 + lineSlope * lineSlope);\n      cosine = 1 / hypotenuse;\n      sine = lineSlope / hypotenuse;\n    } else {\n      // Slope is vertical (INFINITY)\n      cosine = 0;\n      sine = 1;\n    }\n\n    var cX = nodeRadius * cosine * dir,\n        cY = nodeRadius * sine * dir;\n    boardGraphics.moveTo(pointMap[line[0]][0] + cX, pointMap[line[0]][1] + cY);\n\n    for (var pOff = 1; pOff < line.length; pOff++) {\n      var rX = pointMap[line[pOff]][0],\n          rY = pointMap[line[pOff]][1];\n      var c1X = rX - cX,\n          c1Y = rY - cY;\n      var c2X = rX + cX,\n          c2Y = rY + cY;\n      boardGraphics.lineTo(c1X, c1Y);\n      boardGraphics.moveTo(c2X, c2Y);\n    }\n  });\n  boardGraphics.beginFill(0xFFFFFF);\n  if (nodeRadius !== 0) pointMap.forEach(function (point) {\n    boardGraphics.drawCircle(point[0], point[1], nodeRadius);\n  });\n  boardGraphics.endFill();\n  pixiContainer.addChild(boardGraphics);\n  tonkinBoard.boardGraphics = boardGraphics;\n  return tonkinBoard;\n}\n\n//# sourceURL=webpack:///./src/core/ToPixiDrawer.js?");

/***/ }),

/***/ "./src/core/TonkinBoard.js":
/*!*********************************!*\
  !*** ./src/core/TonkinBoard.js ***!
  \*********************************/
/*! exports provided: MCE, MMP, MCP, EQMP, IQMP, QCP, ICO, TDB, TDT, TDD, lineToPoint, pointToLine, TonkinBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MCE\", function() { return MCE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MMP\", function() { return MMP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MCP\", function() { return MCP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EQMP\", function() { return EQMP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IQMP\", function() { return IQMP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QCP\", function() { return QCP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ICO\", function() { return ICO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TDB\", function() { return TDB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TDT\", function() { return TDT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TDD\", function() { return TDD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lineToPoint\", function() { return lineToPoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointToLine\", function() { return pointToLine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TonkinBoard\", function() { return TonkinBoard; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n * Each type of point is given a specific identifier.\n */\nvar MCE = 0;\nvar MMP = [1, 2, 3, 4]; // l, t, r, b\n\nvar MCP = [5, 6, 7, 8]; // tl, tr, bl, br\n\nvar EQMP = [9, 10, 11, 12, 13, 14, 15, 16]; // tl, tr, bl, br x 2 (clockwise)\n\nvar IQMP = [17, 18, 19, 20]; // l, t, r, b\n\nvar QCP = [21, 22, 23, 24]; // tl, tr, bl, br\n\nvar ICO = QCP; // same\n\nvar TDB = [25, 26, 27, 28]; // tl, tr, bl, br\n\nvar TDT = [29, 30, 31, 32, 33, 34, 35, 36]; // tl, tr, bl, br\n\nvar TDD = [37, 38, 39, 40, 41, 42, 43, 44]; // tl, tr, bl, br\n\n/**\n * Stores the coordinates of each possible tonkin position in\n * an array by the position id. Each coordinate is an (array)\n * ordered-pair of x & y value.\n *\n * This array forms a 2x2 tonkin board, with the origin at the\n * MCE point. It can be used as a seed/reference to get the\n * coordinates of a tonkin board with arbitrary length.\n */\n\nvar pSeed = [[0, 0], // main center point\n[-1, 0], [0, 1], [1, 0], [0, -1], // main midpoints\n[-1, 1], [1, 1], [-1, -1], [1, -1], // main corner points\n[-1, .5], [-.5, 1], [.5, 1], [1, .5], // eqmp (tl & tr)\n[-.5, -1], [-1, -.5], [1, -.5], [.5, -1], // eqmp (bl & br)\n[-.5, 0], [0, .5], [.5, 0], [0, -.5], // internal quadrant midpoints\n[-.5, .5], [.5, .5], [-.5, -.5], [.5, -.5], // quadrant center points\n[-.75, .75], [.75, .75], [-.75, -.75], [.75, -.75], // tilted diag. bipoints\n[-2 / 3, 1 / 3], [-1 / 3, 2 / 3], [1 / 3, 2 / 3], [2 / 3, 1 / 3], // tdt pairs (lt & lr)\n[-1 / 3, -2 / 3], [-2 / 3, -1 / 3], [2 / 3, -1 / 3], [1 / 3, -2 / 3], // tdt pairs (bl & br)\n[-.5, .25], [-.25, .5], [.25, .5], [.5, .25], // tdd pairs (lt & lr)\n[-.25, -.5], [-.5, -.25], [.5, -.25], [.25, -.5] // tdd pairs (bl & br)\n];\nvar lineToPoint = [\n/* All lines passing through the main center point!!! */\n[EQMP[0 * 2 + 1], TDT[0 * 2 + 1], TDD[0 * 2 + 1], MCE, TDD[3 * 2 + 1], TDT[3 * 2 + 1], EQMP[3 * 2 + 1]], // tilted diag.\n[MCP[0], TDB[0], ICO[0], MCE, ICO[3], TDB[3], MCP[3]], // main diagonal\n[EQMP[0 * 0 + 0], TDT[0 * 2 + 0], TDD[0 * 2 + 0], MCE, TDD[3 * 2 + 0], TDT[3 * 2 + 0], EQMP[3 * 2 + 0]], // titled diag.\n[MMP[0], IQMP[0], MCE, IQMP[2], MMP[2]], // horizontal line\n[EQMP[2 * 2 + 1], TDT[2 * 2 + 1], TDD[2 * 2 + 1], MCE, TDD[1 * 2 + 1], TDT[1 * 2 + 1], EQMP[1 * 2 + 1]], // tilted diag.\n[MCP[2], TDB[2], ICO[2], MCE, ICO[1], TDB[1], MCP[1]], // main diagonal\n[EQMP[2 * 2 + 0], TDT[2 * 2 + 0], TDD[2 * 2 + 0], MCE, TDD[1 * 2 + 0], TDT[1 * 2 + 0], EQMP[1 * 2 + 0]], // tilted diag.\n[MMP[3], IQMP[3], MCE, IQMP[1], MMP[1]], // vertical line\n\n/* All edges of the inner square (l,t,r,b) */\n[ICO[2], TDD[2 * 2 + 1], IQMP[0], TDD[0 * 2 + 0], ICO[0]], [ICO[0], TDD[0 * 2 + 1], IQMP[1], TDD[1 * 2 + 0], ICO[1]], [ICO[1], TDD[1 * 2 + 1], IQMP[2], TDD[3 * 2 + 0], ICO[3]], [ICO[3], TDD[3 * 2 + 1], IQMP[3], TDD[2 * 2 + 0], ICO[2]],\n/* All edges of the quadrant-diagonal square (tr,tr,bl,br) */\n[MMP[0], TDT[0 * 2 + 0], ICO[0], TDT[0 * 2 + 1], MMP[1]], [MMP[1], TDT[1 * 2 + 0], ICO[1], TDT[1 * 2 + 1], MMP[2]], [MMP[3], TDT[2 * 2 + 0], ICO[2], TDT[2 * 2 + 1], MMP[0]], [MMP[2], TDT[3 * 2 + 0], ICO[3], TDT[3 * 2 + 1], MMP[3]],\n/* All semi-diagonals (tl,tr,bl,br)*/\n[EQMP[0 * 2 + 0], TDB[0], EQMP[0 * 2 + 1]], [EQMP[1 * 2 + 0], TDB[1], EQMP[1 * 2 + 1]], [EQMP[3 * 2 + 0], TDB[3], EQMP[3 * 2 + 1]], [EQMP[2 * 2 + 0], TDB[2], EQMP[2 * 2 + 1]],\n/* All edges of the outer/main square (l,t,r,b) */\n[MCP[2], EQMP[2 * 2 + 1], MMP[0], EQMP[0 * 2 + 0], MCP[0]], [MCP[0], EQMP[0 * 2 + 1], MMP[1], EQMP[1 * 2 + 0], MCP[1]], [MCP[1], EQMP[1 * 2 + 1], MMP[2], EQMP[3 * 2 + 0], MCP[3]], [MCP[3], EQMP[3 * 2 + 1], MMP[3], EQMP[2 * 2 + 0], MCP[2]]];\n/**\n * Stores all the lines that a point lies on in the tonkin\n * board. It is the reverse map for {@link lineToPoint}.\n *\n * It is initialized lazily at runtime.\n */\n\nvar pointToLine = new Array(pSeed.length);\n\n(function () {\n  /* Initializes pointToLine as a reverse map for lineToPoint */\n  for (var pointIdx = 0; pointIdx < pointToLine.length; pointIdx++) {\n    pointToLine[pointIdx] = [];\n  }\n\n  for (var lineIdx = 0; lineIdx < lineToPoint.length; lineIdx++) {\n    var line = lineToPoint[lineIdx];\n\n    for (var pOff = 0; pOff < line.length; pOff++) {\n      pointToLine[line[pOff]].push(lineIdx);\n    }\n  }\n})();\n\nvar TonkinBoard =\n/*#__PURE__*/\nfunction () {\n  function TonkinBoard() {\n    var pointLocations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pSeed;\n\n    _classCallCheck(this, TonkinBoard);\n\n    this.pointLocations = pointLocations;\n  }\n  /**\n   * Generates a {@code TonkinBoard} with all points initialized\n   * in a coordinate system of a HTML canvas (y-axis below).\n   *\n   * The board size will be {@code boardLength} and the origin at\n   * the top-left main corner point.\n   *\n   * @param boardLength - length of the board\n   */\n\n\n  _createClass(TonkinBoard, null, [{\n    key: \"generate\",\n    value: function generate(boardLength) {\n      var shiftX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var shiftY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n      var pointCount = pSeed.length;\n      var pointLocations = new Array(pointCount);\n      var scaleFactor = boardLength / 2; // pSeed -> pointLocations\n\n      for (var pId = 0; pId < pointCount; pId++) {\n        var point = pSeed[pId];\n        var pX = point[0],\n            pY = point[1];\n        var nX = (pX + 1) * scaleFactor + shiftX;\n        var nY = (1 - pY) * scaleFactor + shiftY;\n        pointLocations[pId] = [nX, nY];\n      }\n\n      return new TonkinBoard(pointLocations);\n    }\n  }]);\n\n  return TonkinBoard;\n}();\n\n//# sourceURL=webpack:///./src/core/TonkinBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_PixiModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/PixiModel */ \"./src/core/PixiModel.js\");\n/* harmony import */ var _core_ToPixiDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/ToPixiDrawer */ \"./src/core/ToPixiDrawer.js\");\n\n\n_core_ToPixiDrawer__WEBPACK_IMPORTED_MODULE_1__[\"bindPixiToBoard\"](_core_PixiModel__WEBPACK_IMPORTED_MODULE_0__[\"tonkinApplication\"].stage, 512, 512);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "pixi.js":
/*!***********************!*\
  !*** external "PIXI" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = PIXI;\n\n//# sourceURL=webpack:///external_%22PIXI%22?");

/***/ })

/******/ });