let home = {
  initialize: function(scene) {
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

    scene.map = layer2;

    // debugger that displays the collision areas
    utils.debugDraw(layer1, scene);
    utils.debugDraw(layer2, scene);
  },
}

export default home;