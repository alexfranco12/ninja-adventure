import RevealingText from './RevealingText.js'

export default class TextMessage { 
  constructor(config) {
    this.scene = config.scene;
    this.text = config.text;
    this.onComplete = config.onComplete;
  }

  init() {
    this.keyObj = this.scene.input.keyboard.addKey("ENTER")
    this.element = null;
    this.div = null;

    this.createElement();

    // TODO: messages should toggle visible & invisible.
    this.div.setElement(this.element);

    this.revealingText.init();
  }

  createElement() {
    const x = this.scene.game.config.width;
    const y = this.scene.game.config.height;
    const height = this.scene.game.config.height / 4;

    // TODO: fix the message placement so that the messages appear near the bottom and centered.
    this.div = this.scene.add.dom(0, 0).setOrigin(0);

    this.element = document.createElement('div');
    this.element.classList.add('DialogBox');

    this.element.style = `
      height: ${height}px; 
    `;

    this.element.innerHTML = (`
      <p class="Dialog_p"></p>
      <button class="Dialog_button">Next</button>
    `);

    // typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".Dialog_p"),
      text: this.text,
    });

    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    })

    this.keyObj.on('down', e => {
      this.done();
    })
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