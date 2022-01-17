import overworld from './src/overworld.js'

var config = {
  type: Phaser.AUTO,
  width: 80 * 16,
  height: 50 * 16,
  scene: [overworld],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
};

const game = new Phaser.Game(config);