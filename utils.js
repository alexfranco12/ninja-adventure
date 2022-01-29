const utils = {
  // draw collision areas
  debugDraw(layer, scene) {
    const debugGraphics = scene.add.graphics().setAlpha(0.7)
    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    })
  },
  oppositeDirection(direction) {
    if (direction === 'left') return "right";
    if (direction === 'right') return "left";
    if (direction === 'up') return "down";
    return "up"
  }
}