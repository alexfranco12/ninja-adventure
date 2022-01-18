export default class DirectionInput {
  constructor() {
    this.heldDirections = [];
    this.inputKeys = {
      "ArrowUp": "up",
      "w": "up",
      "ArrowDown": "down",
      "s": "down",
      "ArrowLeft": "left",
      "a": "left",
      "ArrowRight": "right",
      "d": "right",
    }
  }

  get direction() {
    return this.heldDirections[0];
  }

  init(scene) {
    scene.input.keyboard.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT', 'W', 'S', 'A', 'D'])
    scene.input.keyboard.on('keydown', e => {
      const dir = this.inputKeys[e.key]
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    })
    scene.input.keyboard.on('keyup', e => {
      const dir = this.inputKeys[e.key]
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    })
  }
}