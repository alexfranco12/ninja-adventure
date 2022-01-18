export const createAnimations = (anims, id) => {
  anims.create({
    key:`${id}-idle-down`,
    frames: anims.generateFrameNumbers(id, {
      frames: [0]
    }),
    frameRate: 1,
    repeat: -1
  });
  anims.create({
    key:`${id}-idle-up`,
    frames: anims.generateFrameNumbers(id, {
      frames: [1]
    }),
    frameRate: 1,
    repeat: -1
  });
  anims.create({
    key:`${id}-idle-left`,
    frames: anims.generateFrameNumbers(id, {
      frames: [2]
    }),
    frameRate: 1,
    repeat: -1
  });
  anims.create({
    key:`${id}-idle-right`,
    frames: anims.generateFrameNumbers(id, {
      frames: [3]
    }),
    frameRate: 1,
    repeat: -1
  });
  anims.create({
    key:`${id}-walk-right`,
    frames: anims.generateFrameNumbers(id, {
      frames: [7, 11, 15]
    }),
    frameRate: 6,
    repeat: -1,
    yoyo: true,
  });
  anims.create({
    key:`${id}-walk-left`,
    frames: anims.generateFrameNumbers(id, {
      frames: [6, 10, 14]
    }),
    frameRate: 6,
    repeat: -1,
    yoyo: true,
  });
  anims.create({
    key:`${id}-walk-up`,
    frames: anims.generateFrameNumbers(id, {
      frames: [5, 9, 13]
    }),
    frameRate: 6,
    repeat: -1,
    yoyo: true,
  });
  anims.create({
    key:`${id}-walk-down`,
    frames: anims.generateFrameNumbers(id, {
      frames: [4, 8, 12]
    }),
    frameRate: 6,
    repeat: -1,
    yoyo: true,
  });
}