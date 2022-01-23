import RevealingText from './RevealingText.js'

export default class Dialog { 
  constructor(config) {
    this.scene = config.scene;
    this.text = config.text;
    this.onComplete = config.onComplete;
    this.element = null;
  }

  init(container) {
    this.createElement();
    this.revealingText.init();
  }

  createElement() {
    const x = this.scene.game.config.width;
    const y = this.scene.game.config.height;
    const height = 100;

    this.element = document.createElement('div');
    this.element.classList.add('DialogBox');

    this.element.style = `
      height: ${height}px; 
    `;

    this.element.innerHTML = (`
      <p class="Dialog_p"></p>
      <button class="Dialog_button">Next</button>
    `);

    var div = this.scene.add.dom(x/2, y-(height/2), this.element);

    // typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".Dialog_p"),
      text: this.text,
    });

    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    })

    this.scene.input.keyboard.on('keydown-'+'ENTER', e => {
      this.done();
    })


    // this.tweens.add({
    //     targets: container,
    //     angle: 360,
    //     duration: 12000,
    //     loop: -1
    // });

    // this.tweens.add({
    //     targets: element,
    //     duration: 3000,
    //     _angle: 360,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Sine.easeInOut',
    //     loop: -1,
    //     yoyo: true
    // });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }
}