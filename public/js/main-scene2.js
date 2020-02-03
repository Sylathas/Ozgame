import Player from "./player.js";
import createRotatingPlatform from "./create-rotating-platform.js";
import createRotatingGear1 from "./create-rotating-gear.js";
import createRotatingGear2 from "./create-rotating-gear2.js";
import createJumpingPlatform from "./create-jumping-platform.js";
import Chiavi from "./Chiavi.js";
import NemicoVolante from "./FlyingEnemy.js"
import NemicoTerrestre from "./WalkingEnemy.js"
import Crates from "./crates.js"

export class MainScene2 extends Phaser.Scene {
	
  constructor () {super('MainScene2')}
	
  preload() {
	this.load.image('Gear', './assets/images/Ingranaggio.png');  
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/livello_2.json");
    this.load.image(
      "kenney-tileset-64px-extruded",
      "./assets/tilesets/kenney-tileset-64px-extruded.png"
    );

    this.load.image("wooden-plank", "./assets/images/wooden-plank.png");
    this.load.image("spring", "./assets/images/spring.png");
    this.load.spritesheet(
      "player",
      "./assets/spritesheets/0x72-industrial-player-32px-extruded.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
	this.load.json('GearShape', 'assets/images/Gear.json');
	this.load.image('S8', './assets/images/8.png');
  }

  create() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
	
	var engine = Engine.create();  
	  
	//Camera sprite 
	this.camera = this.add.sprite(0, 10700, "player");
	
	const map = this.make.tilemap({ key: "map" });
	  
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");

    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0).setDepth(15);
    const lavaLayer = map.createDynamicLayer("Lava", tileset, 0, 0).setDepth(15);
    map.createDynamicLayer("Background", tileset, 0, 0).setDepth(10);
    map.createDynamicLayer("Foreground", tileset, 0, 0).setDepth(20);

    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(lavaLayer);
	  
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject("Spawn", obj => obj.name === "Spawn Point");
    this.player = new Player(this, x, y);
	  
	//Add Help Sign
	this.S8 = this.add.sprite(157, 10368, 'S8');
	this.S8.alpha = 0;
	  
	//funzione Mostra aiuto nei Cartelli
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.Cartelli,
            callbackScope: this,
            loop: true
    })

    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this
    });
	  
	//Crea punti di Checkpoint 
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.Checkpoints,
            callbackScope: this,
            loop: true
    })

    // Create platforms at the point locations in the "Platform Locations" layer created in Tiled
    map.getObjectLayer("Rotation Locations").objects.forEach(point => {
      createRotatingPlatform(this, point.x, point.y);
    }); 
	  
	map.getObjectLayer("Gear Locations 1").objects.forEach(point => {
      createRotatingGear1(this, point.x, point.y);
    }); 
	  
	map.getObjectLayer("Gear Locations 2").objects.forEach(point => {
      createRotatingGear2(this, point.x, point.y);
    }); 

    map.getObjectLayer("Jumping Locations").objects.forEach(point => {
      createJumpingPlatform(this, point.x, point.y);
    });  
	  
	map.getObjectLayer("WM Locations").objects.forEach(point => {
      new NemicoTerrestre(this, point.x, point.y, this.player.sprite, this.camera);
    });
  }
	
  update(){
	  
	  if (this.camera.y != 100){
		  this.camera.y = this.camera.y - 2;
	  }
	  
	  if(this.player.sprite.y > this.camera.y + 450){
		  const cam = this.cameras.main;
	   	  cam.fadeOut(1000);
          this.player.sprite.x = this.checkx;
		  this.player.sprite.y = this.checky;
		  cam.fadeIn(1000);
		  this.camera.y = this.checky;
	  }
	  
	  if (this.camera.y > 10460) {
		this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
	  } else {
		this.cameras.main.startFollow(this.camera, false, 0.5, 0.5);
	  }
	  
  }
	
  Checkpoints () {
	  var checkx = 86;
	  var checky = 10421;
	  if(this.player.sprite.y < 8455 && this.player.sprite.y > 4901){
		  checkx = 1159;
	  	  checky = 8415;
	  }	else if(this.player.sprite.y < 4900 && this.player.sprite.y > 1951){
		  checkx = 964;
	  	  checky = 4962;
	  } else if(this.player.sprite.y < 1950){
		  checkx = 461;
	  	  checky = 1999;
	  }
	  this.checkx = checkx;
	  this.checky = checky;
  }
	
  Cartelli(){
	  this.S8.alpha = 0;
	  if(this.player.sprite.x > 127 && this.player.sprite.x < 187 && this.player.sprite.y > 10368){
		  this.S8.alpha = 1;
	  }
  }
	
  onPlayerCollide({ gameObjectB }) {
    if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;

    const tile = gameObjectB;

    // Check the tile property set in Tiled (you could also just check the index if you aren't using
    // Tiled in your game)
    if (tile.properties.isLethal) {
		const cam = this.cameras.main;
		cam.fadeOut(1000);
        this.player.sprite.x = this.checkx;
		this.player.sprite.y = this.checky;
		cam.fadeIn(1000);
		this.camera.y = this.checky;
    }
  }
}

export default class mapSetup {

}