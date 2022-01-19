const dialogBox = {
  key: 'dialog-scene',
  active: true,
  preload: function() {
    console.log('dialog-scene created')
    this.load.image('dialogBox', '/assets/hud/dialog/DialogueBoxSimple.png');
  },
  create: function() {
    const x = 500;
    const y = 400;
    this.index = 1;

    this.dialogBox = this.add.image(x, y, 'dialogBox').setScale(2).setVisible(false)
    
    this.message = this.add.text(x - 290, y - 30, "", {
      font: '16px Arial',
      color: '#000',
    })

    this.input.keyboard.on('keydown-'+'ENTER', e => {
      this.message.setText(this.text[this.index])
      this.index += 1;
    })
  },
  update: function() {
    this.scene.get('world-scene').events.on('createDialog', text => {
      this.dialogBox.setVisible(true)
      this.message.setText(text[this.index])
      this.text = text;
    })
  }
}

export default dialogBox;