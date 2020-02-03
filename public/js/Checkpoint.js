export default class Checkpoint{
	constructor(scene, x, y, checkpoint, bandiera, player) {
		this.x = x;
		this.y = y;
		this.player = player;
		this.scene = scene;
		this.bandiera = bandiera;
		
		const anims = scene.anims;
    		anims.create({
			key: "bandiera-zero",
      		frames: anims.generateFrameNumbers("bandiera", { start: 1, end: 1}),
      		frameRate: 3,
      		repeat: -1
    	});
    	anims.create({
      		key: "bandiera-movimento",
      		frames: anims.generateFrameNumbers("bandiera", { start: 0, end: 0 }),
      		frameRate: 12,
      		repeat: -1
    	});
		
		this.sprite = scene.add.sprite(x, y, "bandiera", 1);
		this.sprite.anims.play("bandiera-zero", true);
				
		scene.events.on("update", this.update, this);		
	}
	
	update(){
		if(this.bandiera === 0){
			if(this.player.sprite.x > 6909 && this.player.sprite.x < 8455){
				this.sprite.anims.play("bandiera-movimento", true);
			}
		}
		if(this.bandiera === 1){
			if(this.player.sprite.x > 8456 && this.player.sprite.x < 10000){
				this.sprite.anims.play("bandiera-movimento", true);
			}
		}
		if(this.bandiera === 2){
			if(this.player.sprite.x > 10001 && this.player.sprite.x < 12285){
				this.sprite.anims.play("bandiera-movimento", true);
			}
		}
		if(this.bandiera === 3){
			if(this.player.sprite.x > 12286 && this.player.sprite.x < 14527){
				this.sprite.anims.play("bandiera-movimento", true);
			}
		}
		if(this.bandiera === 4){
			if(this.player.sprite.x > 14200 && this.player.sprite.x < 1470){
				this.sprite.anims.play("bandiera-movimento", true);
			}
		}
	}
}