import Hero from '../sprites/hero.js';
import NPC from '../sprites/npc.js'

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
        texture: 'Hero',
        id: 'hero',
        frame: 0,
      }),
      villager: new NPC({
        scene: this.scene,
        x: 18 * 16,
        y: 11 * 16,
        texture: 'Villager',
        id: 'villager',
        frame: 0,
        behaviorLoop: [
          { type: 'walk', direction: 'left'},
          { type: 'walk', direction: 'left'},
          { type: 'walk', direction: 'up'},
          { type: 'walk', direction: 'up'},
          { type: 'walk', direction: 'right'},
          { type: 'walk', direction: 'right'},
          { type: 'walk', direction: 'down'},
          { type: 'walk', direction: 'down'},
        ]
      })
    }
  }
};