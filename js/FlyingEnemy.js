export default class NemicoVolante{
	constructor(scene, x, y, player) {
		this.x = x;
		this.y = y;
		this.player = player;
		this.scene = scene;
		
		const anims = scene.anims;
    	anims.create({
        	key: "corvo-move",
			frames: anims.generateFrameNumbers("corvo", { start: 0, end: 3 }),
			frameRate: 8,
			repeat: -1
		});
		anims.create({
        	key: "pipistrello-move",
			frames: anims.generateFrameNumbers("pipistrello", { start: 0, end: 1 }),
			frameRate: 2,
			repeat: -1
		});
		
		if(x > 8456 && x < 12000){
		   this.sprite = scene.matter.add.sprite(x ,y , "pipistrello", 0).setDepth(10);
		   this.sprite
			    .setDisplaySize(110,64)
				.setFixedRotation();
		   this.sprite.anims.play("pipistrello-move", true);
		   }
		if(x > 0 && x < 8456){
			   this.sprite = scene.matter.add.sprite(x ,y , "corvo", 0).setDepth(10);
		   	   this.sprite
			    	.setDisplaySize(100,64)
					.setFixedRotation();
			   this.sprite.anims.play("corvo-move", true);
		   }
		
		this.destroyed = false;
		scene.events.on("update", this.update, this);
    	scene.events.once("shutdown", this.destroy, this);
    	scene.events.once("destroy", this.destroy, this);
		scene.matterCollision.addOnCollideStart({
      		objectA: this.sprite,
      		callback: this.EnemyCollide,
      		context: this
    	});
		
	}
	
	update(){
		if (this.destroyed) return;
		
		if(this.sprite.y > this.y+120) {
        	this.sprite.setVelocityY(-10);
    	} else if(this.sprite.y < this.y-50){
			this.sprite.setVelocityY(13);
		}
		if (this.sprite.x !== this.x){
			this.sprite.x = this.x;
		}
		
	}
	
	EnemyCollide({ gameObjectB }) {
    if (gameObjectB === this.player) {
		const cam = this.scene.cameras.main;
		cam.fadeOut(1000);
		this.scene.start = 1;
        this.player.x = this.scene.checkx;
		this.player.y = this.scene.checky;
		cam.fadeIn(1000);
    }
  }
	
	destroy() {
    // Clean up any listeners that might trigger events after the player is officially destroyed
    this.scene.events.off("update", this.update, this);
    this.scene.events.off("shutdown", this.destroy, this);
    this.scene.events.off("destroy", this.destroy, this);
    if (this.scene.matter.world) {
      this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
    }
    this.destroyed = true;
    this.sprite.destroy();
  }
}