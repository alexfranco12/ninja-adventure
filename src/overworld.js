import Hero from "./sprites/hero.js";
import DirectionInput from './directionInput.js'
import maps from "./maps/maps.js";
import npc from "./sprites/npc.js";

export default class Overworld extends Phaser.Scene {
  constructor() {
    super({
      key: 'overworld',
      active: true,
    })
  }

  preload () {
    // load sprites
    Hero.preload(this);
    npc.preload(this);

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
    this.load.tilemapTiledJSON('village', '/assets/maps/Village.json')
  }

  create() {
    this.startMap('home');

    // TODO: is there any way to refactor and get rid of this function?
    this.directionInput = new DirectionInput()
    this.directionInput.init(this)

    this.key = this.input.keyboard.addKey('ENTER')
    this.key.on(`down`, () => {
      // TODO: check to see if there is someone to talk to.
      this.map.checkForActionCutscene();
    })

    Object.values(this.map.characters).forEach(character => {
      character.initializeEntity();
      character.mount(this.map);
    })

    this.map.startCutScene(this.map.openingCutScene)

    /**
     * --- CAMERA ---
     */
    // TODO: fix the camera view.
    let camera = this.cameras.main
    // camera.setViewport(0, 0, this.area.displayWidth, this.area.displayHeight);
    // camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
    camera.startFollow(this.map.characters.hero.sprite);
    camera.setZoom(1)
  }

  update() {
    Object.values(this.map.characters).forEach(character => {
      character.update({
        arrow: this.directionInput.direction
      });
    })
  }

  startMap(mapConfig) {
    this.map = new maps[mapConfig]();
    this.map.scene = this
    this.map.initialize()
  }
};