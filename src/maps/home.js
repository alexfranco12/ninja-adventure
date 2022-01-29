import Hero from '../sprites/hero.js';
import NPC from '../sprites/npc.js'
import OverworldEvent from '../overworldEvent.js';

export default class Home {
  constructor() {
    this.id = 'Home';
    this.isCutScenePlaying = false;
  }

  initialize(scene) {
    this.scene = scene;
    const map = scene.make.tilemap({ key: 'home' });

    const elements = map.addTilesetImage('TilesetElement', 'elementTiles', 16, 16, 0, 0);
    const floor = map.addTilesetImage('TilesetInteriorFloor', 'interiorFloorTiles', 16, 16, 0, 0);
    const walls = map.addTilesetImage('TilesetInterior', 'wallTiles', 16, 16, 0, 0);

    const layer1 = map.createLayer('Lower Layer', [elements, floor, walls]);
    const layer2 = map.createLayer('Upper Layer', [elements, floor, walls]);

    layer1.setCollisionByProperty({ collides: true })
    layer2.setCollisionByProperty({ collides: true })
    scene.matter.world.convertTilemapLayer(layer1);
    scene.matter.world.convertTilemapLayer(layer2);

    scene.area = layer1;

    // debugger that displays the collision areas
    // utils.debugDraw(layer1, scene);
    // utils.debugDraw(layer2, scene);

    this.characters = {
      hero: new Hero({
        scene: this.scene,
        x: 13 * 16,
        y: 7 * 16,
        texture: 'hero',
        frame: 0,
      }),
      villager: new NPC({
        scene: this.scene,
        x: 18 * 16,
        y: 11 * 16,
        texture: 'villager',
        frame: 0,
        behaviorLoop: [
          { type: 'stand', direction: 'up', time: 2000},
          { type: 'stand', direction: 'left', time: 800},
          { type: 'stand', direction: 'right', time: 1200},
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Kick rocks..", faceHero: "villager" },
            ]
          }
        ]
      })
    };

    /**
     * --- CUTSCENES ---
     */
    this.openingCutScene = [
      // {who: 'hero', type: 'walk', direction: 'right'},
      // {who: 'hero', type: 'walk', direction: 'right'},
      // {who: 'hero', type: 'walk', direction: 'right'},
      // {who: 'hero', type: 'walk', direction: 'down'},
      // {who: 'hero', type: 'walk', direction: 'down'},
      // {who: 'villager', type: 'walk', direction: 'left'},
      // {who: 'villager', type: 'walk', direction: 'left'},
      // {who: 'villager', type: 'walk', direction: 'up'},
      // {
      //   type: "textMessage", 
      //   text: "Hey! Before you head out into town I should explain some things to you."
      // },
      // {
      //   type: "textMessage", 
      //   text: "To explore the town, use the 'W', 'A', 'S', and 'D' keys on your keyboard. If you would like to chat to any of the villagers, press 'ENTER' to spark up a conversation. Good luck!"
      // },
      // {who: 'villager', type: 'walk', direction: 'left'},
      // {who: 'villager', type: 'walk', direction: 'up'},
      // {who: 'villager', type: 'walk', direction: 'up'},
      // {who: 'villager', type: 'walk', direction: 'left'},
      // {who: 'villager', type: 'walk', direction: 'up'},
    ];

    this.cutSceneSpaces = {
      ['15, 14']: [
        {
          events: [
            {who: 'villager', type: "walk", direction: 'right'},
            {who: 'villager', type: "walk", direction: 'right'},
            {who: 'villager', type: "stand", direction: 'down', time: 200},
            {who: 'hero', type: "walk", direction: 'up'},
            {
              type: "textMessage", 
              text: "Good luck out there!",
            },
            {who: 'villager', type: "walk", direction: 'left'},
            {who: 'villager', type: "walk", direction: 'left'},
          ]
        }
      ],
    }
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
};