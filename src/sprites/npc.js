import character from "./character.js";
import { createAnimations } from "../animations/npcAnims.js";

export default class NPC extends character {
  constructor(config) {
    super(config)
  }

  static preload(scene) {
    scene.load.spritesheet('Villager', "/assets/actors/characters/Villager/SpriteSheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 28,
    });
  }

  addAnims(anims) {
    createAnimations(anims, this.id)
  }

  initializeEntity() {
    this.shadow = this.scene.add.image(this.x, this.y + 7, 'shadow')
    this.sprite = this.scene.matter.add.sprite(this.x, this.y, this.texture, this.frame)
    

    // Person Collision and Sensor areas
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let personCollider = Bodies.rectangle(this.x, this.y, 16, 16, {
        isSensor: false, 
        label: 'personCollider'
    })
    let personSensor = Bodies.circle(this.x, this.y, 12, {
        isSensor: true, 
        label: 'personSensor'
    })
    const compoundBody = Body.create({
        parts: [ personCollider, personSensor ],
        frictionAir: 0.00
    });

    // stops the person from rotating when interacted with
    this.sprite.setExistingBody(compoundBody);
    this.sprite.setFixedRotation();
    this.sprite.setStatic(true)

    this.addAnims(this.sprite.anims);
  }

  createAnimations(anims) {

  }
}