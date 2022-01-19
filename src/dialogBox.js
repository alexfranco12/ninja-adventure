const dialogBox = {
  key: 'dialog-scene',
  active: true,
  preload: function() {
    this.load.bitmapFont('font', '/assets/fonts/font.png', '/assets/fonts/font.xml')
    this.load.image('dialogBox', '/assets/hud/dialog/DialogueBoxSimple.png');
  },
  create: function() {
    const x = this.game.config.width / 2;
    const y = this.game.config.height - 200;
    this.index = 0;

    this.dialogBox = this.add.image(x, y, 'dialogBox').setScale(1.5).setOrigin(.5, 0).setVisible(false)

    this.scene.get('world-scene').events.on('createDialog', text => {
      this.text = text;
      this.dialogBox.setVisible(true)
      this.message = new Phaser.GameObjects.BitmapText(this, Math.floor(x), Math.floor(y + 10), 'font', this.text[this.index], 14).setOrigin(.5, 0)
      this.add.existing(this.message).setMaxWidth(440).setLeftAlign();
    })

    this.input.keyboard.on('keydown-'+'ENTER', e => {
      if (this.index < this.text.length - 1) {
        this.index += 1;
        this.message.setText(this.text[this.index])
      } else {
        this.index = 0;
        this.dialogBox.setVisible(false);
        this.message.destroy()
        this.events.emit("PersonDoneTalking");
      }
    })
  },
  update: function() {

  }
}

export default dialogBox;