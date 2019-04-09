/**
 * PixiJS Application definitions.
 */
import * as PIXI from 'pixi.js'

/*
 * Tonkin forces PIXI to use the Canvas renderer instead of
 * WebGL because of antialiasing issues with the Graphics
 * DrawingObject.
 */

export const tonkinApplication = new PIXI.Application({
  antialias: true,
  forceCanvas: true,
  height: 512,
  width: 512
});

tonkinApplication.renderer.backgroundColor = 0xe9f8f8;
tonkinApplication.stage.width = 512;
tonkinApplication.stage.height = 512;

/* Applies a border style to the canvas element. */
(function() {
  const canvasStyle = tonkinApplication.view.style;
  canvasStyle.border = "2px";
  canvasStyle.borderColor = "#000";
  canvasStyle.borderStyle = "solid";
})();

document.getElementById('tonkin-pixi-root')
  .appendChild(tonkinApplication.view);
