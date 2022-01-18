import Hero from "./hero.js";
import DirectionInput from './directionInput.js'
import home from './maps/home.js';

const world = {
  key: 'world-scene',
  active: true,
  preload: function() {
    // load sprites
    Hero.preload(this);

    this.load.image('shadow', '../assets/actors/Shadow.png')

    // load tileset PNGs
    this.load.image('elementTiles', '/assets/backgrounds/tilesets/TilesetElement.png')
    this.load.image('interiorFloorTiles', '/assets/backgrounds/tilesets/interior/TilesetInteriorFloor.png')
    this.load.image('wallTiles', '/assets/backgrounds/tilesets/interior/TilesetInterior.png')
    this.load.image('floorTiles', '/assets/backgrounds/tilesets/TilesetFloor.png');
    this.load.image('houseTiles', '/assets/backgrounds/tilesets/TilesetHouse.png');
    this.load.image('natureTiles', '/assets/backgrounds/tilesets/TilesetNature.png');
    this.load.image('waterTiles', '/assets/backgrounds/tilesets/TilesetWater.png');

    // load tiled map from JSON file
    this.load.tilemapTiledJSON('home', '/assets/maps/StartingRoom.json')
  },
  create: function() {
    home.initialize(this)

    this.directionInput = new DirectionInput()
    this.directionInput.init(this)
    
    this.characters = {
      hero: new Hero({
        scene: this,
        id: 'hero',
        x: this.map.tileToWorldX(15),
        y: this.map.tileToWorldY(8),
        texture: 'hero',
        frame: 0,
      },
    )}

    Object.values(this.characters).forEach(character => {
      character.createAnimations();
    });

    /**
     * --- CAMERA ---
     */
    let camera = this.cameras.main
    camera.setViewport(0, 0, this.map.displayWidth, this.map.displayHeight);
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
    camera.startFollow(this.characters.hero);

    // console.log the scene
    console.log(this)
  },
  update: function() {
    Object.values(this.characters).forEach(character => {
      character.update({
        arrow: this.directionInput.direction
      });
    })
  }
}

export default world;