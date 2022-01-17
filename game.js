import overworld from './src/overworld.js'

let game;
const gameOptions = {
  width: 60 * 16,
  height: 40 * 16,
  aspectRatio: 16/9,
}

var config = {
  type: Phaser.AUTO,
  width: gameOptions.width,
  height: gameOptions.height,
  background: '#000',
  scene: [ overworld ],
  scale: {
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    zoom: 1,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 }
    }
  },
  // Install the scene plugins
  plugins: {
    scene: [
      {
        /** 
         *  Note! If you are including the library via the CDN script tag, the plugin line should be: 
         *  plugin: PhaserMatterCollisionPlugin.default
         */
        plugin: PhaserMatterCollisionPlugin.default, // plugin class
        key: "matterCollision",
        mapping: "matterCollision"
      }
    ]
  },
};

window.onload = () => {
  game = new Phaser.Game(config);
  window.focus();
  resizeGame();
  window.addEventListener('resize', resizeGame)
}

// resize the game screen
function resizeGame(){
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if(windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  } else{
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}