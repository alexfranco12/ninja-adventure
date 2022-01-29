import OverworldEvent from "../overworldEvent.js";

export default class character {
  constructor(config) {
    this.scene = config.scene;
    this.x = config.x - 8;
    this.y = config.y + 8;
    this.texture = config.texture;
    this.frame = config.frame;

    this.isPlayerControlled = config.isPlayerControlled || false;
    this.direction = config.direction || 'down'
    this.movingProgressRemaining = 0;

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];

    this.directionUpdate = {
        "up" : ["y", -1],
      "down" : ["y",  1],
      "left" : ["x", -1],
     "right" : ["x",  1],
    }

    this.isStanding = false;
  }

  async doBehaviorEvent(map) {
    if (map.isCutScenePlaying || this.behaviorLoop.length === 0 || this.isStanding) return;

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.sprite.id;

    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map)
  }

  mount(map) {
    // if behavior => kick off after short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10)
  }

  startBehavior(state, behavior) {
    // set character direction
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      
      // todo: stop if space is not free 
      if (!this.scene.map.isCutScenePlaying && this.isTooCloseToHero) {
        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior);
        }, 10);
        return
      }

      // ready to walk
      this.movingProgressRemaining = 16;
      this.updateCharacter()
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        this.scene.events.emit("PersonStandingComplete", {
          whoId: this.sprite.id
        })
        this.isStanding = false;
      }, behavior.time)
    }
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (!this.scene.map.isCutScenePlaying && this.isPlayerControlled && state.arrow) {
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

    // finished walking
    if (this.movingProgressRemaining === 0) {
      this.scene.events.emit("PersonWalkingComplete", { whoId: this.sprite.id })
    }
  }

  updateCharacter() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.play(`${this.sprite.id}-walk-${this.direction}`, true)
      return
    }
    this.sprite.stop();
    this.sprite.play(`${this.sprite.id}-idle-${this.direction}`)
  }
}