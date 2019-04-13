/**
 * Provides drag-and-drop functionality for any PixiJS
 * DrawingObject.
 *
 * You can provide drag-and-drop event handlers to the
 * attachDnDHandlers function.
 *
 * 1. {@code onDragStart} this method is called when
 *    the drag-n-drop system recognizes that the user
 *    is dragging the object. It should return a
 *    drag data object that is passed to all other
 *    handlers.
 * 2. {@code onDrag} this method is called when the
 *    user moves the object. It recieves the drag-data
 *    object.
 * 3. {@code onDragEnd} this method is called when
 *    the user stop dragging the object. It recieves the
 *    drag-data object.
 *
 * All three drag-n-drop handlers are called with "this"
 * equal to the object being dragged.
 */

/**
 * Invokes the handler only if it is a valid function object.
 *
 * @param handler { function } handler to call
 * @param thisarg { object } the "this" object to use
 * @param ...args { array } the list of arguments to pass
 */
function invokeSafe(handler, thisarg, ...args) {
  if (handler !== undefined && handler !== null)
    return handler.apply(thisarg, args);
  return undefined;
}

function onPress(event) {
  if (!this.dndState.isEnabled)
    return;

  this.dndState.isActive = true;
  this.dndState.oldPosition = event.data.getLocalPosition(this.parent);
  this.dndState.originalPosition = { x: this.x, y: this.y };
  this.alpha = 0.9;

  this.dndState.dragData = invokeSafe(this.dndState.onDragStart, this);
}

function onLift() {
  this.alpha = 1;

  this.dndState.isActive = false;
  this.dndState.oldPosition = undefined;
  this.dndState.newPosition = undefined;

  invokeSafe(this.dndState.onDragEnd, this, this.dndState.dragData);
}

function onTranslate(event) {
  if (!this.dndState.isActive)
    return;

  const dndState = this.dndState;
  dndState.newPosition = event.data.getLocalPosition(this.parent);

  const newPosition = dndState.newPosition;
  const oldPosition = dndState.oldPosition;

  this.x += newPosition.x - oldPosition.x;
  this.y += newPosition.y - oldPosition.y;

  dndState.oldPosition = dndState.newPosition;
  invokeSafe(this.dndState.onDrag, this, this.dndState.dragData);
}

export function attachDnDHandlers(drawingObject, onDragStart,
    onDrag, onDragEnd) {
  drawingObject.dndState = {
    isEnabled: true,
    onDragStart: onDragStart,
    onDrag: onDrag,
    onDragEnd: onDragEnd
  };
  drawingObject.interactive = true;

  drawingObject.on('mousedown', onPress)
    .on('touchstart', onPress)
    .on('mouseup', onLift)
    .on('touchend', onLift)
    .on('mouseupoutside', onLift)
    .on('touchendoutside', onLift)
    .on('mousemove', onTranslate)
    .on('touchmove', onTranslate);
}
