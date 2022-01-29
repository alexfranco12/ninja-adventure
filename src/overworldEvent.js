import TextMessage from './textMessage.js'

export default class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }

  stand(resolve) {
    const who = this.map.characters[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time,
    })

    // set up a handlet to complete when correct person is done standing
    const completeHandler = (e) => {
      if (e.whoId === this.event.who) {
        resolve();
      }
    }

    this.map.scene.events.on("PersonStandingComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.map.characters[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true,
    })

    // set up a handler to compete when a person is done walking
    const completeHandler = (e) => {
      if (e.whoId === 'hero') {
        this.map.checkForFootstepCutscene();
      }

      if (e.whoId === this.event.who) {
        resolve();
      }
    }

    this.map.scene.events.on('PersonWalkingComplete', completeHandler)
  }

  textMessage(resolve) {
    const message = new TextMessage({
      scene: this.map.scene,
      text: this.event.text,
      onComplete: () => resolve()
    });
    message.init();
  }
}