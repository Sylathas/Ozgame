export default class Crates {
  constructor(scene, x, y, width, height, player, collision, bottone, blocco) {
	
	//from local variables to global variables
	this.blocco = blocco;
	this.button = bottone;
    this.scene = scene;
  	const platform = scene.add.tileSprite(x, y, width, height, "block").setDepth(10);
	this.platform = platform;
	  
	//Add button animations  
	const anims = scene.anims;
    anims.create({
      key: "Button-Pressed",
      frames: anims.generateFrameNumbers("bottone", { start: 1, end: 1 }),
      frameRate: 1,
      repeat: -1
    }); 
	
	anims.create({
      key: "Button-NotPressed",
      frames: anims.generateFrameNumbers("bottone", { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1
    }); 
	  
	//Without collision button is not pressed
	this.button.anims.play("Button-NotPressed", true);

	//Properties of the crate
  	scene.matter.add.gameObject(platform, {
    	restitution: 0,
		friction: 0.001,
    	density: 0.0008
  	});
	
	//Respawn on death
  	collision.addOnCollideStart({
		objectA: player,
      	callback: this.onPlayerCollide,
      	context: this
    });
	
	//Button collision event
	collision.addOnCollideStart({
		objectA: platform,
      	callback: this.onCrateCollide,
      	context: this
    });
  }
	
  onPlayerCollide({ gameObjectB }) {

    if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;

    const tile = gameObjectB;

    if (tile.properties.isLethal) {
		this.platform.destroy();
    }
	
  }
  
  onCrateCollide({ gameObjectB }) {

    if (!gameObjectB) return;

    if (gameObjectB === this.button) {
		this.button.anims.play("Button-Pressed", true);
		this.blocco.destroy();
    }
	
  }
	  
}
