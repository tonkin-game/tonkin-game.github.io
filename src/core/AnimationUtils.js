let activeAnimations = [];

function renderUpdate(newTime) {
  activeAnimations.forEach((anim) => {
    anim._updatePosition(newTime);
  });

  if (activeAnimations.length > 0) {
    window.requestAnimationFrame(renderUpdate);
  }
}

export class MotionAnimation {

  constructor(pathFunction, target, totalTime) {
    this.pathFunction = pathFunction;
    this.target = target;
    this.totalTime = totalTime;
  }

  start() {
    activeAnimations.push(this);
    window.requestAnimationFrame(renderUpdate);
  }

  _updatePosition(newTime) {
    if (this.startTime === undefined)
      this.startTime = newTime;
    this.target.position = this.pathFunction(newTime - this.startTime,
        this.totalTime);
    if (newTime - this.startTime >= this.totalTime) {
      const thisCopy = this;
      activeAnimations = activeAnimations.filter((anim) => anim != thisCopy);
    }
  }
}

export default {
  MotionAnimation: MotionAnimation,
  linearVelocity: function(newTime, totalTime, totalDistance) {
    return totalDistance * newTime / totalTime;
  },
  linearAccelaration: function(initVelocity = 0) {
    let acc = undefined;
    return function(newTime, totalTime, totalDistance) {
      if (acc === undefined) {
        acc = 2 * (totalDistance - initVelocity * totalTime) / (totalTime * totalTime);
      }

      return (initVelocity + 0.5 * acc * newTime) * newTime;
    }
  },
  pathFunction: function(startPosition, endPosition, radialFunction) {
    startPosition = { x: startPosition.x, y: startPosition.y };
    endPosition = { x: endPosition.x, y: endPosition.y };
    const totalDistance = Math.sqrt(Math.pow(endPosition.x - startPosition.x, 2)
        + Math.pow(endPosition.y - startPosition.y, 2));
    const sin = (endPosition.y - startPosition.y) / totalDistance;
    const cos = (endPosition.x - startPosition.x) / totalDistance;
    let reached = false;

    return function(newTime, totalTime) {
      if (reached)
        return endPosition;
      let distance = (newTime > totalTime) ? totalDistance :
                        radialFunction(newTime, totalTime, totalDistance);
      reached = totalDistance <= distance;
      distance = Math.min(totalDistance, distance);
      const nX = startPosition.x + distance * cos;
      const nY = startPosition.y + distance * sin;

      return { x: nX, y: nY };
    };
  },
  startAnimation: function(target, totalTime, pathFunction) {
    new MotionAnimation(pathFunction, target, totalTime).start();
  }
};
