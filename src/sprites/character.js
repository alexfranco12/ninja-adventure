import OverworldEvent from "../overworldEvent.js";

export default class character {
  constructor(config) {
    this.scene = config.scene;
    this.x = config.x - 8;
    this.y = config.y + 8;
    this.texture = config.texture;
    this.frame = config.frame;
    this.id = config.id

    this.isPlayerControlled = config.isPlayerControlled || false;
    this.direction = config.direction || 'down'
    this.movingProgressRemaining = 0;

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.directionUpdate = {
        "up" : ["y", -1],
      "down" : ["y",  1],
      "left" : ["x", -1],
     "right" : ["x",  1],
    }
  }

  async doBehaviorEvent(scene) {
    // if (this.behaviorLoop.length === 0) return;

    // let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    // eventConfig.who = this.id;

    // const eventHandler = new OverworldEvent({ scene, event: eventConfig });
    // await eventHandler.init();

    // this.behaviorLoopIndex += 1;
    // if (this.behaviorLoopIndex === this.behaviorLoop.length) {
    //   this.behaviorLoopIndex = 0;
    // }

    // this.doBehaviorEvent(scene)
  }

  startBehavior(state, behavior) {
    // set character direction
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      // todo: stop if space is not free


      // ready to walk
      this.movingProgressRemaining = 16;
      this.updateCharacter()
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandingComplete", {
          whoId: this.id
        })
        this.isStanding = false;
      }, behavior.time)
    }
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (!this.scene.location.isCutScenePlaying && this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: 'walk',
          direction: state.arrow,
        })
      }
      this.updateCharacter();
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this.sprite[property] += change;
    this.movingProgressRemaining -= 1;

    this.shadow.x = this.sprite.x;
    this.shadow.y = this.sprite.y + 7;
  }

  updateCharacter() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.play(`${this.id}-walk-${this.direction}`, true)
      return
    }
    this.sprite.stop();
    this.sprite.play(`${this.id}-idle-${this.direction}`)
  }
}