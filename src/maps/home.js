import Hero from '../sprites/hero.js';
import NPC from '../sprites/npc.js';
import Map from './map.js'

export default class Home extends Map {
  constructor() {
    super();
    this.id = 'Home';
  }

  initialize() {
    const map = this.scene.make.tilemap({ key: 'home' });

    const elements = map.addTilesetImage('TilesetElement', 'elementTiles', 16, 16, 0, 0);
    const floor = map.addTilesetImage('TilesetInteriorFloor', 'interiorFloorTiles', 16, 16, 0, 0);
    const walls = map.addTilesetImage('TilesetInterior', 'wallTiles', 16, 16, 0, 0);

    const layer1 = map.createLayer('Lower Layer', [elements, floor, walls]);
    const layer2 = map.createLayer('Upper Layer', [elements, floor, walls]);

    layer1.setCollisionByProperty({ collides: true })
    layer2.setCollisionByProperty({ collides: true })
    this.scene.matter.world.convertTilemapLayer(layer1);
    this.scene.matter.world.convertTilemapLayer(layer2);

    this.scene.area = layer1;

    // debugger that displays the collision areas
    // utils.debugDraw(layer1, this.scene);
    // utils.debugDraw(layer2, this.scene);

    this.characters = {
      hero: new Hero({
        scene: this.scene,
        x: 13,
        y: 7,
        texture: 'hero',
        frame: 0,
      }),
      villager: new NPC({
        scene: this.scene,
        x: 18,
        y: 11,
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
      {who: 'hero', type: 'walk', direction: 'right'},
      {who: 'hero', type: 'walk', direction: 'right'},
      {who: 'hero', type: 'walk', direction: 'right'},
      {who: 'hero', type: 'walk', direction: 'down'},
      {who: 'hero', type: 'walk', direction: 'down'},
      {who: 'villager', type: 'walk', direction: 'left'},
      {who: 'villager', type: 'walk', direction: 'left'},
      {who: 'villager', type: 'walk', direction: 'up'},
      {
        type: "textMessage", 
        text: "Hey! Before you head out into town I should explain some things to you."
      },
      {
        type: "textMessage", 
        text: "To explore the town, use the 'W', 'A', 'S', and 'D' keys on your keyboard. If you would like to chat to any of the villagers, press 'ENTER' to spark up a conversation. Good luck!"
      },
      {who: 'villager', type: 'walk', direction: 'left'},
      {who: 'villager', type: 'walk', direction: 'up'},
      {who: 'villager', type: 'walk', direction: 'up'},
      {who: 'villager', type: 'walk', direction: 'left'},
      {who: 'villager', type: 'walk', direction: 'up'},
    ];

    this.cutSceneSpaces = {
      ['15, 14']: [
        {
          events: [
            {type: "changeMap", map: "village"}
          ]
        }
      ],
    }
  }
};