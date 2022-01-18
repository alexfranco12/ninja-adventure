import character from "./character.js";
import { createAnimations } from "../animations/npcAnims.js";

export default class NPC extends character {
  constructor(config) {
    super(config)
    this.isTooCloseToHero = false;
  }

  static preload(scene) {
    scene.load.spritesheet('villager', "/assets/actors/characters/Villager/SpriteSheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 28,
    });
  }

  addAnims(anims) {
    createAnimations(anims, this.sprite.id)
  }

  initializeEntity() {
    this.shadow = this.scene.add.image(this.x, this.y + 7, 'shadow')
    this.sprite = this.scene.matter.add.sprite(this.x, this.y, this.texture, this.frame)
    

    // NPC Collision and Sensor areas
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let npcCollider = Bodies.rectangle(this.x, this.y, 16, 16, {
        isSensor: false, 
        label: 'npcCollider'
    })
    let npcSensor = Bodies.circle(this.x, this.y, 12, {
        isSensor: true, 
        label: 'npcSensor'
    })
    const compoundBody = Body.create({
        parts: [ npcCollider, npcSensor ],
        frictionAir: 0.00
    });

    // stops the NPC from rotating when interacted with
    this.sprite.setExistingBody(compoundBody);
    this.sprite.setFixedRotation();
    this.sprite.setStatic(true)

    this.createMatterCollisions(npcSensor);

    this.sprite.id = `${this.texture}`;
    this.addAnims(this.sprite.anims);
  }

  createMatterCollisions(npcSensor) {
    this.scene.matterCollision.addOnCollideStart({
      objectA:[npcSensor],
      callback: other => {
        if (other.bodyB.isSensor) return;
        if (other.gameObjectB.id === 'hero') {
          this.isTooCloseToHero = true
        }
      },
      context: this.scene,
    });

    this.scene.matterCollision.addOnCollideEnd({
      objectA: [npcSensor],
      callback: other => {
        this.isTooCloseToHero = false
      },
      context: this.scene,
    })
  }
}