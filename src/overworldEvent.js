export default class OverworldEvent {
  constructor({ scene, event }) {
    this.scene = scene;
    this.event = event;
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }

  stand(resolve) {
    const who = this.scene.location.characters[this.event.who];
    who.startBehavior({
      scene: this.scene
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time,
    })

    // set up a handlet to complete when correct person is done standing
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandingComplete", completeHandler);
        resolve();
      }
    }

    document.addEventListener("PersonStandingComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.scene.characters[this.event.who];
    who.startBehavior({
      scene: this.scene
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true,
    })

    // set up a handler to compete when a person is done walking
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    }

    document.addEventListener("PersonWalkingComplete", completeHandler)
  }
}