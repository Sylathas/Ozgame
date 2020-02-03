export default class Bottone {
  constructor(scene, x, y) {
    this.scene = scene;
	  
	  const anims = scene.anims;
	  anims.create({
      key: "bottone",
      frames: anims.generateFrameNumbers("bottone", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: 0
    });
  }
}