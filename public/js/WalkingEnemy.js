export default class NemicoTerrestre{
	constructor(scene, x, y, player, camera, lvl) {
		
		this.camera = camera;
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.player = player;
		this.lvl = lvl;
		
		const anims = scene.anims;
    	anims.create({
        	key: "ragno-move",
			frames: anims.generateFrameNumbers("ragno", { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
        	key: "serpente-move",
			frames: anims.generateFrameNumbers("serpente", { start: 0, end: 1 }),
			frameRate: 2,
			repeat: -1
		});
		anims.create({
        	key: "ape-move",
			frames: anims.generateFrameNumbers("api", { start: 0, end: 1 }),
			frameRate: 2,
			repeat: -1
		});
		anims.create({
        	key: "ratto-move",
			frames: anims.generateFrameNumbers("ratto", { start: 0, end: 7 }),
			frameRate: 7,
			repeat: -1
		});
				
  		if(x > 8456 && x < 11999){
		   this.sprite = scene.matter.add.sprite(x ,y , "ragno", 0).setDepth(10);
		   this.sprite
			    .setDisplaySize(70,50)
				.setFixedRotation();
		   this.sprite.anims.play("ragno-move", true);
		   }
		if(x > 12351) {
			   this.sprite = scene.matter.add.sprite(x ,y , "serpente", 0).setDepth(10);
		   	   this.sprite
			   		.setDisplaySize(260,64)
					.setFixedRotation();
			   this.sprite.anims.play("serpente-move", true);
		} 
		if(x > 0 && x < 8455) {
			   if(lvl === 1){
				   this.sprite = scene.matter.add.sprite(x ,y , "api", 0).setDepth(10);
				   this.sprite
			    	  .setDisplaySize(60,54)
					  .setFixedRotation();
			       this.sprite.anims.play("ape-move", true);
			   } else if (lvl === 2){
				   this.sprite = scene.matter.add.sprite(x ,y , "ratto", 0).setDepth(10);
				   this.sprite
			    	  .setDisplaySize(90,54)
					  .setFixedRotation();
			   }
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
		const velocity = this.sprite.body.velocity;
		if (this.destroyed) return;
		
		if(this.sprite.x > this.x+300) {
        	this.sprite.setVelocityX(-10);
			this.sprite.setFlipX(false);
    	} else if(this.sprite.x <= this.x){
			this.sprite.setVelocityX(10);
			this.sprite.setFlipX(true);
		}
		if (this.sprite.y !== this.y){
			this.sprite.y = this.y;
		}
		if (this.sprite.body.velocity.x === 0){
			this.sprite.setVelocityX(8);
		} 
	}
	
	EnemyCollide({ gameObjectB }) {
    if (gameObjectB === this.player) {
		if (this.lvl === 1){
			const cam = this.scene.cameras.main;
			cam.fadeOut(1000);
			this.scene.start = 1;
        	this.player.x = this.scene.checkx;
			this.player.y = this.scene.checky;
			cam.fadeIn(1000);
			this.camera.y = this.scene.checky;
		}else if (this.lvl === 2){
			const cam = this.scene.cameras.main;
			cam.fadeOut(1000);
			this.scene.start = 1;
        	this.player.x = this.scene.checkx2;
			this.player.y = this.scene.checky2;
			cam.fadeIn(1000);
			this.camera.y = this.scene.checky2;
			this.scene.Nube.y = this.scene.checky2 + 200;
		}
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