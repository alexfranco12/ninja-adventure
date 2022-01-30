import OverworldEvent from '../overworldEvent.js';

export default class Map {
  constructor() {
    this.isCutScenePlaying = false;
    this.scene = null;
  }

  // FIXME: capture the position of the hero whenever they stop walking. 
  checkForFootstepCutscene() {
    const hero = this.characters['hero'];
    const pos = this.scene.area.worldToTileXY(hero.sprite.x, hero.sprite.y)
    const match = this.cutSceneSpaces[`${pos.x}, ${pos.y}`];

    if (!this.isCutScenePlaying && match) {
      this.startCutScene(match[0].events)
    }
  }

  async startCutScene(events) {
    this.isCutScenePlaying = true;

    // start a loop of async events
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }
    this.isCutScenePlaying = false;

    // reset NPC to do their idle behavior
    Object.values(this.characters).forEach(c => c.doBehaviorEvent(this))
  }

  nextPosition(initialX, initialY, direction) {
    let x = this.scene.area.worldToTileX(initialX);
    let y = this.scene.area.worldToTileY(initialY);
    const size = 1;
    if (direction === 'left') {
      x -= size;
    } else if (direction === 'right') {
      x += size;
    } else if (direction === 'up') {
      y -= size;
    } else if (direction === 'down') {
      y += size;
    }

    return {x, y};
  }

  checkForActionCutscene() {
    const hero = this.characters['hero'];
    const nextCoords = this.nextPosition(hero.sprite.x, hero.sprite.y, hero.direction);
    const match = Object.values(this.characters).find(object => {
      let characterX = this.scene.area.worldToTileX(object.sprite.x);
      let characterY = this.scene.area.worldToTileY(object.sprite.y);
      return `${characterX}, ${characterY}` === `${nextCoords.x}, ${nextCoords.y}`
    })
    
    // TODO: start talking cutscene 
    if (!this.isCutScenePlaying && match && match.talking.length) {
      this.startCutScene(match.talking[0].events)
    }
  }
}