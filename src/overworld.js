
class Overworld extends Phaser.Scene {
  constructor() {
    super({
      key: 'overworld',
      active: true,
    })
  }

  preload() {
    // load tilesets
    this.load.image('floorTiles', './src/assets/Backgrounds/Tilesets/TilesetFloor.png')

    // load tiled map from JSON file
    this.load.tilemapTiledJSON('village', './src/assets/Maps/village.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'village' })
    const floor = map.addTilesetImage('TilesetFloor', 'floorTiles', 16, 16)

    for (let i = 0; i < map.layers.length; i++) {
      const layer = map.createLayer(i, [floor])
      layer.setDepth(i);
      layer.setCollisionByProperty({ collides: true })

      // REVIEW: what is the purpose of this line?
      this.matter.world.convertTilemapLayer(layer);

      // debugger that displays the collision areas
      utils.debugDraw(layer, this);
    }
  }

  update() {

  }
}

export default Overworld;