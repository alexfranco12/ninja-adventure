import Hero from '../sprites/hero.js';
import NPC from '../sprites/npc.js';
import Map from './map.js'

export default class Home extends Map {
  constructor() {
    super();
    this.id = 'Village';
  }

  initialize() {
    const map = this.scene.make.tilemap({ key: 'village' });

    // create tilesets w/ .PNGs we loaded
    const elements = map.addTilesetImage('TilesetElement', 'elementTiles', 16, 16, 0, 0);
    const floor = map.addTilesetImage('TilesetFloor', 'floorTiles', 16, 16, 0, 0);
    const house = map.addTilesetImage('TilesetHouse', 'houseTiles', 16, 16, 0, 0);
    const nature = map.addTilesetImage('TilesetNature', 'natureTiles', 16, 16, 0, 0);
    const water = map.addTilesetImage('TilesetWater', 'waterTiles', 16, 16, 0, 0);

    // create variables for each layer created in TILED
    const layer1 = map.createLayer('Lower Layer 1', [floor, water]);
    const layer2 = map.createLayer('Lower Layer 2', [nature, house, elements]);
    const layer3 = map.createLayer('Upper Layer 1', [elements, house]);
    const layer4 = map.createLayer('Upper Layer 2', [elements, house]);
    const layer5 = map.createLayer('Upper Layer 3', [elements, house]);

    // TODO: set the depth of each layer.

    layer1.setCollisionByProperty({ collides: true })
    layer2.setCollisionByProperty({ collides: true })
    layer3.setCollisionByProperty({ collides: true })
    layer4.setCollisionByProperty({ collides: true })
    layer5.setCollisionByProperty({ collides: true })
    this.scene.matter.world.convertTilemapLayer(layer1);
    this.scene.matter.world.convertTilemapLayer(layer2);
    this.scene.matter.world.convertTilemapLayer(layer3);
    this.scene.matter.world.convertTilemapLayer(layer4);
    this.scene.matter.world.convertTilemapLayer(layer5);

    this.scene.area = layer1;

    // debugger that displays the collision areas
    // utils.debugDraw(layer1, this.scene);
    // utils.debugDraw(layer2, this.scene);
    // utils.debugDraw(layer3, this.scene);
    // utils.debugDraw(layer4, this.scene);
    // utils.debugDraw(layer5, this.scene);

    /**
     * --- CHARACTERS ---
     */
    this.characters = {
      hero: new Hero({
        scene: this.scene,
        x: 21,
        y: 23,
        texture: 'hero',
        frame: 0,
      }),
      villager: new NPC({
        scene: this.scene,
        x: 21,
        y: 27,
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
      {who: 'villager', type: 'stand', direction: 'up'},
      {
        type: "textMessage", 
        text: "Glad to see you out and about!"
      },
    ];

    // TODO: set bounds to the map so the player cannot walk off the map area.
  }
}