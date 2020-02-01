import Player from "./player.js";
import createRotatingPlatform from "./create-rotating-platform.js";
import createRotatingGear1 from "./create-rotating-gear.js";
import createRotatingGear2 from "./create-rotating-gear2.js";
import createJumpingPlatform from "./create-jumping-platform.js";
import Chiavi from "./Chiavi.js";
import NemicoVolante from "./FlyingEnemy.js"
import NemicoTerrestre from "./WalkingEnemy.js"
import Crates from "./crates.js"

var start = 1;
var f = 1;

export class MainMenu extends Phaser.Scene {
	
  constructor () {super({key: 'MainMenu'})};
	
  preload() {
	   this.load.image('backgroundmenu', './assets/Background/Backgroundgame/Background.png');
	   this.load.image('autors', './assets/Background/Backgroundgame/autors.png');
	   this.load.image('credits', './assets/Background/Backgroundgame/credits.png');
	   this.load.image('play', './assets/Background/Backgroundgame/play.png');
  }
	
  create() {	
	  this.add.sprite(640, 360, 'backgroundmenu');
	  const autors = this.add.sprite(1100, 400, 'autors')
	  .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Autors') );

	  const credits = this.add.sprite(1100, 500, 'credits')
	  .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Credits') );
	  
	  const play = this.add.sprite(1070, 300, 'play')
	  .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Inizio') );
  }
	
}

export class Credits extends Phaser.Scene {
	
  constructor () {super({key: 'Credits'})};
	
  preload() {
	   this.load.image('crediti', './assets/Background/Backgroundgame/creditsbackground.png');
	   this.load.image('freccia', './assets/Background/Backgroundgame/FrecciaBack.png');
  }
	
  create() {	
	  this.add.sprite(640, 360, 'crediti');
	  
	  const autors = this.add.sprite(50, 50, 'freccia')
	  .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('MainMenu') );
  }
	
}

export class Autors extends Phaser.Scene {
	
  constructor () {super({key: 'Autors'})};
	
  preload() {
	   this.load.image('autori', './assets/Background/Backgroundgame/autorsbackground.png');
	   this.load.image('freccia', './assets/Background/Backgroundgame/FrecciaBack.png');
  }
	
  create() {	
	  this.add.sprite(640, 360, 'autori');
	  
	  const autors = this.add.sprite(50, 50, 'freccia')
	  .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('MainMenu') );
  }
	
}

export class MainScene extends Phaser.Scene {
	
  constructor () {super({key: 'MainScene'})}
	
  preload() {
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(490, 345, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2 + 20,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 + 10,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 60,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });

            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(500, 355, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });

            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
	  
	this.load.image('ChiaveV', './assets/images/Chiave_V.png');
	this.load.image('ChiaveR', './assets/images/Chiave_R.png');
	this.load.image('S1', './assets/images/1.png');
	this.load.image('S2', './assets/images/2.png');
	this.load.image('S3', './assets/images/3.png');
	this.load.image('S4', './assets/images/4.png');
	this.load.image('S5', './assets/images/5.png');
	this.load.image('S6', './assets/images/6.png');
	this.load.image('S7', './assets/images/7.png');
	this.load.image('BloccoB', './assets/images/BloccoBottone.png');  
	this.load.image('BloccoV', './assets/images/BloccoChiave_V.png');
	this.load.image('BloccoR', './assets/images/BloccoChiave_R.png');
	this.load.image('Gear', './assets/images/Ingranaggio.png');  
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/level.json");
    this.load.image(
      "kenney-tileset-64px-extruded",
      "./assets/tilesets/kenney-tileset-64px-extruded.png"
    );

    this.load.image("wooden-plank", "./assets/images/wooden-plank.png");
	this.load.image("f1", "./assets/images/renders/7.png");
	this.load.image("f2", "./assets/images/renders/8.png");
	this.load.image("f3", "./assets/images/renders/9.png");
    this.load.image("springb", "./assets/images/springb.png");
	this.load.image("springr", "./assets/images/springr.png");
	this.load.image("springy", "./assets/images/springy.png");
    this.load.image("block", "./assets/images/block.png");
    this.load.image("platform", "./assets/images/Platform.png");
	  
	this.load.spritesheet(
      "spaventapasseri",
      "./assets/spritesheets/spaventapasseri.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
	  
	this.load.spritesheet(
      "leone",
      "./assets/spritesheets/leone.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
	  
	this.load.spritesheet(
      "ominolatta",
      "./assets/spritesheets/ominolatta.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
	  
	this.load.spritesheet(
      "corvo",
      "./assets/spritesheets/spritesheetcorvi.png",
      {
        frameWidth: 508,
        frameHeight: 413,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "pipistrello",
      "./assets/spritesheets/spritesheetpipistrello.png",
      {
        frameWidth: 1026,
        frameHeight: 573,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "ragno",
      "./assets/spritesheets/spritesheetragno.png",
      {
        frameWidth: 818,
        frameHeight: 595,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "serpente",
      "./assets/spritesheets/spritesheetserpenti.png",
      {
        frameWidth: 389,
        frameHeight: 46,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "api",
      "./assets/spritesheets/spritesheetapi.png",
      {
        frameWidth: 193,
        frameHeight: 139,
        margin: 0,
        spacing: 0
      }
    );

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
	this.load.spritesheet(
      "bottone",
      "./assets/spritesheets/Bottone.png",
      {
        frameWidth: 54,
        frameHeight: 11,
        margin: 1,
        spacing: 2
      }
    );
	  
	this.load.spritesheet(
      "bandiera",
      "./assets/spritesheets/bandiera.png",
      {
        frameWidth: 64,
        frameHeight: 64,
        margin: 1,
        spacing: 2
      }
    );
	  
	this.load.spritesheet(
      "bandiera-still",
      "./assets/spritesheets/movimento_bandiera.png",
      {
        frameWidth: 64,
        frameHeight: 64,
        margin: 1,
        spacing: 2
      }
    );
	  
	this.load.scenePlugin('AnimatedTiles', './js/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
	
	this.load.image('bg1', './assets/Background/1.png');
	this.load.image('bg2', './assets/Background/2.png');
	this.load.image('bg3', './assets/Background/3.png');
    this.load.image('bg4', './assets/Background/4.png');
    this.load.image('bg5', './assets/Background/5.png');
    this.load.image('bg9', './assets/Background/9.png');
  }

  create() {
	  
	//create variables  
	var bandiera = 0;
	  
	//Inititate Matter Engine
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Bodies = Matter.Bodies;
	
	//Create Map and Layers
    const map = this.make.tilemap({ key: "map" });
	this.map = map;
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");
    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0).setDepth(15);
    const lavaLayer = map.createDynamicLayer("Lava", tileset, 0, 0).setDepth(15);
    map.createDynamicLayer("Background", tileset, 0, 0).setDepth(10);
	map.createDynamicLayer("Background2", tileset, 0, 0).setDepth(5);
    map.createDynamicLayer("Foreground", tileset, 0, 0).setDepth(20);
	map.createDynamicLayer("Grass", tileset, 0, 0).setDepth(25);
	map.createDynamicLayer("Sky", tileset, 0, 0).setDepth(-10);
	  
	 // Set colliding tiles before converting the layer to Matter bodies
    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
    // haven't mapped our collision shapes in Tiled so each colliding tile will get a default
    // rectangle body (similar to AP).
    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(lavaLayer);
	  
	//Make animated Tiles move
	this.animatedTiles.init(map);
	  
	this.camera = this.add.sprite(0, 0, "player");
	this.camera.alpha = 0;

    // Add each layer one by one
	this.bg9 = this.add.tileSprite(8000, 896, 16000, 1792, 'bg9');
	this.bg5 = this.add.tileSprite(11200, 896, 22400, 1792, 'bg5').setScrollFactor(0.5);
	this.bg4 = this.add.tileSprite(12000, 896, 24000, 1792, 'bg4').setScrollFactor(0.6);
	this.bg3 = this.add.tileSprite(5667, 896, 11335, 1792, 'bg3').setScrollFactor(0.7);
	this.bg2 = this.add.tileSprite(13600, 896, 27200, 1792, 'bg2').setScrollFactor(0.8);
	this.bg1 = this.add.tileSprite(7000, 896, 14000, 1792, 'bg1').setScrollFactor(0.85);
	  
	//Create the images that the signs will show
	this.S1 = this.add.sprite(160, 1200, 'S1').setDepth(10);
	this.S2 = this.add.sprite(480, 1270, 'S2').setDepth(10);
	this.S3 = this.add.sprite(930, 1330, 'S3').setDepth(10);
	this.S4 = this.add.sprite(3229, 1142, 'S4').setDepth(10);
	this.S5 = this.add.sprite(4318, 1271, 'S5').setDepth(10);
	this.S6 = this.add.sprite(7070, 1144, 'S6').setDepth(10);
	this.S7 = this.add.sprite(11165, 1281, 'S7').setDepth(10);
	this.S1.alpha = 0;
    this.S2.alpha = 0;
	this.S3.alpha = 0;
	this.S4.alpha = 0;
	this.S5.alpha = 0;
	this.S6.alpha = 0;
	this.S7.alpha = 0;
	  
	//tre personaggi
	this.leone = this.add.sprite(12416, 1300, 'leone', 0).setDepth(10).setScale(3);
	this.ominolatta = this.add.sprite(8513, 1240,1230, 'ominolatta', 0).setDepth(10).setScale(3);
	this.spaventapasseri = this.add.sprite(285, 1300, 'spaventapasseri', 0).setDepth(10).setScale(3);
	  
	//Create the blocks that will be opened by the keys
	this.BloccoV = this.matter.add.image(7744, 1151.02, "BloccoV");
	this.BloccoR = this.matter.add.image(7808, 1151.02, "BloccoR");
	this.BloccoV.body.density = 1;
	this.BloccoR.body.density = 1;
	this.BloccoR.body.friction = 1;
	this.BloccoV.body.friction = 1;
	  
	//Create the keys that open the blocks
	this.ChiaveV = this.matter.add.image(8192, 832, "ChiaveV");
	this.ChiaveR = this.matter.add.image(8000, 1600, "ChiaveR");
	  
	//Create the button that will be pressed by a crate
	this.button = this.matter.add.sprite(12065, 1660, "bottone", 0);
	this.matter.add.gameObject(this.button, {
    isStatic: true
  	});
	  
	//Create the Block that will be opened by the button
	this.BloccoB = this.matter.add.sprite(12288, 1152, "BloccoB");
	this.BloccoB.body.density = 1;
	this.BloccoB.body.friction = 1;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject("Spawn", obj => obj.name === "Spawn Point");
    this.player = new Player(this, x, y);
	  
	//Funzione passaggio di livello
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.PassaggioLivello,
            callbackScope: this,
            loop: true
    })
	  
	this.scenes = 1;
	
	//funzione per mostrare le immagini di flashback  
	this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.Flashback,
            callbackScope: this,
            loop: true
    })
	  
	//funzione Mostra aiuto nei Cartelli
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.Cartelli,
            callbackScope: this,
            loop: true
    })
	  
	//Crea punti di Checkpoint 
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.Checkpoints,
            callbackScope: this,
            loop: true
    })

    // Smoothly follow the player
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

	//funzione di collisione del giocatore
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this
    });
	  
	//funzione in loop di creazione di tutti gli oggetti  
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.CreazioneOggetti,
            callbackScope: this,
            loop: true
    });  
	  
	//Creazione e posizionamento Bandiere
	this.B1 = this.add.sprite(6943, 1230, 'bandiera', 0).setScale(1.5);
	this.B2 = this.add.sprite(8448, 1227, 'bandiera', 0).setScale(1.5);
	this.B3 = this.add.sprite(9983, 462, 'bandiera', 0).setScale(1.5);
	this.B4 = this.add.sprite(12351, 1300, 'bandiera', 0).setScale(1.5);
	this.B5 = this.add.sprite(14528, 1423, 'bandiera', 0).setScale(1.5);
	this.bandiera1 = 0;
	this.bandiera2 = 0;
	this.bandiera3 = 0;
	this.bandiera4 = 0;
	this.bandiera5 = 0;
	  
	//Creazione animazione bandiera Checkpoint ed applicazione a tutte le bandiere
	const anims = this.anims;
    		anims.create({
			key: "bandiera-zero",
      		frames: anims.generateFrameNumbers("bandiera", { start: 0, end: 0}),
      		frameRate: 3,
      		repeat: -1
    	});
    	anims.create({
      		key: "bandiera-movimento",
      		frames: anims.generateFrameNumbers("bandiera", { start: 0, end: 4 }),
      		frameRate: 8,
    	});
	    anims.create({
      		key: "bandiera-still",
      		frames: anims.generateFrameNumbers("bandiera-still", { start: 0, end: 3 }),
      		frameRate: 8,
			repeat: -1
    	});
	    anims.create({
      		key: "leone",
      		frames: anims.generateFrameNumbers("leone", { start: 0, end: 3 }),
      		frameRate: 6,
			repeat: -1
    	});
	    anims.create({
      		key: "ominolatta",
      		frames: anims.generateFrameNumbers("ominolatta", { start: 0, end: 3 }),
      		frameRate: 6,
			repeat: -1
    	});
	    anims.create({
      		key: "spaventapasseri",
      		frames: anims.generateFrameNumbers("spaventapasseri", { start: 0, end: 3 }),
      		frameRate: 6,
			repeat: -1
    	});
		
	this.B1.anims.play("bandiera-zero", true);
	this.B2.anims.play("bandiera-zero", true);
	this.B3.anims.play("bandiera-zero", true);
	this.B4.anims.play("bandiera-zero", true);
	this.B5.anims.play("bandiera-zero", true);
	this.leone.anims.play("leone", true);
	this.spaventapasseri.anims.play("spaventapasseri", true);
	this.ominolatta.anims.play("ominolatta", true);
	
	//Funzioni per il posizionamento di piattaforme e nemici
	map.getObjectLayer("Rotation Locations").objects.forEach(point => {
    createRotatingPlatform(this, point.x, point.y);
    }); 

    map.getObjectLayer("Jumping Locations").objects.forEach(point => {
      createJumpingPlatform(this, point.x, point.y, 1);
    });
	  
	map.getObjectLayer("FM Locations").objects.forEach(point => {
	   new NemicoVolante(this, point.x, point.y, this.player.sprite);
    });
	  
	this.map.getObjectLayer("WM Locations").objects.forEach(point => {
      new NemicoTerrestre(this, point.x, point.y, this.player.sprite, this.camera, 1);
    });
	  
  }
		
  Checkpoints () {
	  var checkx = 100;
	  var checky = 1210;
	  if(this.player.sprite.x > 6909 && this.player.sprite.x < 8455){
			  checkx = 6909;
	  	      checky = 1196;
		  	  this.B1.anims.play("bandiera-still", true);
              this.bandiera1 = 1;
	  }	else if(this.player.sprite.x > 8456 && this.player.sprite.x < 10000){
			  checkx = 8456;
	  	      checky = 1196;
		      this.B2.anims.play("bandiera-still", true);
		      this.bandiera2 = 1;
	  } else if(this.player.sprite.x > 10001 && this.player.sprite.x < 12285){
			  checkx = 10008;
	  	  	  checky = 471;
		      this.B3.anims.play("bandiera-still", true);
		      this.bandiera3 = 1;
	  } else if(this.player.sprite.x > 12286 && this.player.sprite.x < 14527){
			  checkx = 12286;
	  	      checky = 1252;
		      this.B4.anims.play("bandiera-still", true);
		      this.bandiera4 = 1;
	  } else if(this.player.sprite.x > 14200 && this.player.sprite.y < 1470){
			  checkx = 14528;
		  	  checky = 1376; 
		      this.B5.anims.play("bandiera-still", true);
		  	  this.bandiera5 = 1;
	  }
	  this.checkx = checkx;
	  this.checky = checky;
  }
	
  Cartelli(){
	  this.S1.alpha = 0;
      this.S2.alpha = 0;
	  this.S3.alpha = 0;
	  this.S4.alpha = 0;
	  this.S5.alpha = 0;
	  this.S6.alpha = 0;
	  this.S7.alpha = 0;
	  if(this.player.sprite.x > 127 && this.player.sprite.x < 192 && this.player.sprite.y > 1263){
		  this.S1.alpha = 1;
	  } else if(this.player.sprite.x > 7039 && this.player.sprite.x < 7103 && this.player.sprite.y > 1190){
		  this.S6.alpha = 1;
	  } else if(this.player.sprite.x > 447 && this.player.sprite.x < 511 && this.player.sprite.y > 1328){
		  this.S2.alpha = 1;
	  } else if(this.player.sprite.x > 896 && this.player.sprite.x < 960 && this.player.sprite.y > 1396){
		  this.S3.alpha = 1;
	  } else if(this.player.sprite.x > 3200 && this.player.sprite.x < 3265 && this.player.sprite.y > 1194){
		  this.S4.alpha = 1;
	  } else if(this.player.sprite.x > 4230 && this.player.sprite.x < 4350 && this.player.sprite.y > 1323){
		  this.S5.alpha = 1;
	  } else if(this.player.sprite.x > 11134 && this.player.sprite.x < 11198 && this.player.sprite.y > 1327){
		  this.S7.alpha = 1;
	  } 
  }
	
  CreazioneOggetti(){
	  
	if(start === 1) {
	start = 0;
	
	// Load up some crates from the "Crates" object layer created in Tiled
    this.map.getObjectLayer("Crates").objects.forEach(crateObject => {
        new Crates(this, crateObject.x, crateObject.y, crateObject.width, crateObject.height, this.player.sprite, this.matterCollision, this.button, this.BloccoB);
    });
	}
  }
	
  onPlayerCollide({ gameObjectB }) {

    if (!gameObjectB) return;
	  
	if((gameObjectB instanceof Phaser.Tilemaps.Tile)){
    	const tile = gameObjectB;
		this.tile = tile;

    	// Check the tile property set in Tiled
    	if (tile.properties.isLethal) {
			const cam = this.cameras.main;
			cam.fadeOut(1000);
			start = 1;
        	this.player.sprite.x = this.checkx;
			this.player.sprite.y = this.checky;
			cam.fadeIn(1000);
    	}
		if (tile.properties.ChiaveVerde) {
			this.BloccoV.destroy();
		}
		if (tile.properties.ChiaveRossa) {
			this.BloccoR.destroy();
		}
	}
	  
	if(gameObjectB === this.ChiaveV || gameObjectB === this.ChiaveR){
		if (gameObjectB === this.ChiaveV) {
			this.BloccoV.destroy();
			this.ChiaveV.destroy();
		}
		if (gameObjectB === this.ChiaveR) {
			this.BloccoR.destroy();
			this.ChiaveR.destroy();
		}
	}
  }
	
  PassaggioLivello() {
	  if(this.player.sprite.x > 15936){
		  this.scene.start('Intermezzo');
	  }	  
  }
	
  Flashback(){
	  this.player.unfreeze();
	  
	  if(this.scenes === 12){
		  this.flashback3.destroy();
		  this.scenes ++;
	  } 
	  
	  if(this.scenes === 11){
		  this.player.freeze();
		  this.scenes ++;
	  }	
	  
	  if(this.player.sprite.x > 15423 && this.scenes === 10){
		  this.flashback3 = this.add.image(15360, this.player.sprite.y, 'f3').setDepth(30);
		  this.player.freeze();
		  this.scenes ++;
	  }
	  
	  if(this.scenes === 9){
		  this.flashback2.destroy();
		  this.scenes ++;
	  } 
	  
	  if(this.scenes === 8){
		  this.player.freeze();
		  this.scenes ++;
	  }	
	  
	  if(this.player.sprite.x > 12416 && this.player.sprite.x < 13000 && this.scenes === 7){
		  this.flashback2 = this.add.image(this.player.sprite.x, this.player.sprite.y,'f2').setDepth(30);
		  this.player.freeze();
		  this.scenes ++;
	  } 
	  
	  if(this.scenes === 6){
		  this.flashback1.destroy();
		  this.scenes ++;
	  } 
	  
	  if(this.scenes === 5){
		  this.player.freeze();
		  this.scenes ++;
	  }	
	  
	  if(this.player.sprite.x > 8511 && this.player.sprite.x < 9000 && this.scenes === 4){
		  this.flashback1 = this.add.image(this.player.sprite.x, this.player.sprite.y,'f1').setDepth(30);
		  this.player.freeze();
		  this.scenes ++;
	  }	
	  
	  if(this.scenes === 3){
		  this.flashback1.destroy();
		  this.scenes ++;
	  } 
	  
	  if(this.scenes === 2){
		  this.player.freeze();
		  this.scenes ++;
	  }	
	  
	  if(this.player.sprite.x > 200 && this.player.sprite.x < 450 && this.scenes === 1){
		  this.flashback1 = this.add.image(640, this.player.sprite.y,'6').setDepth(30);
		  this.player.freeze();
		  this.scenes ++;
	  }	
  }
	
}

export class MainScene2 extends Phaser.Scene {
	
  constructor () {super({key: 'MainScene2'})};
	
  preload() {
	this.load.image('Gear', './assets/images/Ingranaggio.png');  
	this.load.image("springg", "./assets/images/springg.png");
    this.load.tilemapTiledJSON("map2", "./assets/tilemaps/livello_2.json");
    this.load.image(
      "kenney-tileset-64px-extruded",
      "./assets/tilesets/kenney-tileset-64px-extruded.png"
    );
	  
	this.load.image(
      "finestre",
      "./assets/tilesets/Finestre.png"
    );

    this.load.image("wooden-plank", "./assets/images/wooden-plank.png");
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
	  
	 this.load.spritesheet(
      "ratto",
      "./assets/spritesheets/rattispritesheeti.png",
      {
        frameWidth: 824,
        frameHeight: 419,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "Nube",
      "./assets/spritesheets/NubeVelenosa.png",
      {
        frameWidth: 1280,
        frameHeight: 500,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.json('GearShape', 'assets/images/Gear.json');
	this.load.image('S8', './assets/images/8.png');
	this.load.image('badending', './assets/images/renders/badending.png');
  }

  create() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
	
	var engine = Engine.create();  
	  
	//Camera sprite 
	this.camera = this.add.sprite(0, 10500, "player");
	
	const map = this.make.tilemap({ key: "map2" });
	  
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");

    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0).setDepth(15);
    const lavaLayer = map.createDynamicLayer("Lava", tileset, 0, 0).setDepth(15);
    map.createDynamicLayer("Sky", tileset, 0, 0).setDepth(10);
    map.createDynamicLayer("Foreground", tileset, 0, 0).setDepth(12);

    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(lavaLayer);
	  
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	  
	this.B6 = this.add.sprite(988, 4960, 'bandiera', 0).setScale(1.5).setDepth(14);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject("Spawn", obj => obj.name === "Spawn Point");
    this.player2 = new Player(this, x, y);
	  
	//Add Help Sign
	this.S82 = this.add.sprite(157, 10368, 'S8').setDepth(10);
	this.S82.alpha = 0;
	  
	//funzione Mostra aiuto nei Cartelli
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.Cartelli,
            callbackScope: this,
            loop: true
    })

    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player2.sprite,
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
	  
	this.Nube = this.add.sprite(640, this.camera.y + 200, 'Nube', 0).setDepth(20);
	this.Nube.alpha = 0.8;
	  
	const anims = this.anims;
            anims.create({
			key: "nubetossica",
      		frames: anims.generateFrameNumbers("Nube", { start: 0, end: 4}),
      		frameRate: 10,
      		repeat: -1
    	});
		
	this.Nube.anims.play("nubetossica", true);

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
      createJumpingPlatform(this, point.x, point.y, 2);
    });  
	  
	map.getObjectLayer("WM Locations").objects.forEach(point => {
      new NemicoTerrestre(this, point.x, point.y, this.player2.sprite, this.camera, 2);
    });
	  
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.PassaggioLivello,
            callbackScope: this,
            loop: true
    })
  }
	
  update(){
	  
	  if (this.camera.y != 100){
		  this.camera.y = this.camera.y - 2;
		  this.Nube.y = this.Nube.y - 2;
	  }
	  
	  if(this.player2.sprite.y > this.camera.y + 450){
			  const cam = this.cameras.main;
	   	  	  cam.fadeOut(1000);
          	  this.player2.sprite.x = this.checkx2;
		      this.player2.sprite.y = this.checky2;
		      this.camera.y = this.checky2;
		      this.Nube.y = this.checky2 + 200;
		      cam.fadeIn(1000);
		      this.scene.pause();
		      this.scene.launch('DeathScreen');
	  }
	  
		this.cameras.main.startFollow(this.camera, false, 0.5, 0.5);
  }
	
  Checkpoints () {
	  var checkx2 = 86;
	  var checky2 = 10421;
	  if(this.player2.sprite.y < 4900 && this.player2.sprite.y > 1951){
		  checkx2 = 964;
	  	  checky2 = 4962;
		  this.B6.anims.play("bandiera-still", true);
	  }
	  this.checkx2 = checkx2;
	  this.checky2 = checky2;
  }
	
  Cartelli(){
	  this.S82.alpha = 0;
	  if(this.player2.sprite.x > 127 && this.player2.sprite.x < 187 && this.player2.sprite.y > 10368){
		  this.S82.alpha = 1;
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
        	this.player2.sprite.x = this.checkx2;
			this.player2.sprite.y = this.checky2;
			cam.fadeIn(1000);
			this.camera.y = this.checky2;
			this.Nube.y = this.checky2 + 250;
			this.scene.pause();
		    this.scene.launch('DeathScreen');
    }
  }
	
  PassaggioLivello() {
	  if(this.player2.sprite.x > 1065 && this.player2.sprite.y < 450){
		  this.scene.start('Finale');
	  }	  
  }
}

export class Finale extends Phaser.Scene {
	
  constructor () {super({key: 'Finale'})};
	
  preload() {
    this.load.tilemapTiledJSON("map3", "./assets/tilemaps/finale.json");
    this.load.image(
      "kenney-tileset-64px-extruded",
      "./assets/tilesets/kenney-tileset-64px-extruded.png"
    );
	  
	this.load.image(
      "final",
      "./assets/images/renders/final.png"
    );
	  
	this.load.spritesheet(
      "mago",
      "./assets/spritesheets/StanzaMago.png",
      {
        frameWidth: 1280,
        frameHeight: 767,
        margin: 0,
        spacing: 0
      }
    );
  }
  create() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
	
	var engine = Engine.create();  
	  	
	const map = this.make.tilemap({ key: "map3" });
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");

    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0).setDepth(15);
    map.createDynamicLayer("Sky", tileset, 0, 0).setDepth(10);

    groundLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(groundLayer);
	  
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	  
	this.stanzamago = this.add.sprite(640, 390, 'mago', 0).setDepth(12);
	  
	const anims = this.anims;
            anims.create({
			key: "stanzamago",
      		frames: anims.generateFrameNumbers("mago", { start: 0, end: 3}),
      		frameRate: 12,
      		repeat: -1
    	});
		
	this.stanzamago.anims.play("stanzamago", true);
	

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject("Spawn", obj => obj.name === "Spawn Point");
    this.player3 = new Player(this, x, y);
	  
  }
	
  update(){
	  if(this.player3.sprite.x > 893){
		  this.player3.freeze();
		  this.add.sprite(640, 360, "final").setDepth(20);
	  }
  }
}

export class DeathScreen extends Phaser.Scene {
	
  constructor () {super({key: 'DeathScreen'})};
	
  preload() {
	this.load.image(
      "badending",
      "./assets/images/renders/badending.png"
    );
  }
  create() {
	this.deathscreen = this.add.sprite(640, 360, 'badending');
	this.deathscreen.alpha = 0;
	this.timez = 200;
  }
	
  update(){
	  if(this.timez > 0){
		  this.deathscreen.alpha = 1;
		  this.timez = this.timez - 1;
	  } else {
		  this.deathscreen.alpha = 0;
		  this.scene.resume('MainScene2');
	  }
  }
}

export class Intermezzo extends Phaser.Scene {
	
  constructor () {super({key: 'Intermezzo'})};
	
  preload() {
    this.load.tilemapTiledJSON("map4", "./assets/tilemaps/intermezzo.json");
    this.load.image(
      "kenney-tileset-64px-extruded",
      "./assets/tilesets/kenney-tileset-64px-extruded.png"
    );
	this.load.spritesheet(
      "nuve",
      "./assets/spritesheets/NubeVelenosa2.png",
      {
        frameWidth: 1280,
        frameHeight: 500,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "oz",
      "./assets/spritesheets/ozspritesheet.png",
      {
        frameWidth: 33,
        frameHeight: 32,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.spritesheet(
      "magia",
      "./assets/spritesheets/Magia.png",
      {
        frameWidth: 57,
        frameHeight: 55,
        margin: 0,
        spacing: 0
      }
    );
	  
	this.load.image('freccia', './assets/Background/Backgroundgame/FrecciaBack.png');
	
  }
	
  create() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
	
	var engine = Engine.create();  
	  	
	const map = this.make.tilemap({ key: "map4" });
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");

    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0).setDepth(15);
    map.createDynamicLayer("Sky", tileset, 0, 0).setDepth(10);

    groundLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(groundLayer);
	  
	this.Nube = this.add.sprite(-640, 384, 'nuve', 0).setDepth(20);
	this.Nube.alpha = 0.8;
	this.Nube.setDisplaySize(1280,768);
	  
	this.Oz = this.add.sprite(680, 270, 'oz', 0).setDepth(11).setScale(3);
	this.Magia = this.add.sprite(580, 270, 'magia', 0).setDepth(11);
	this.Magia.alpha = 0;
	  
	const anims = this.anims;
	anims.create({
			key: "nube",
      		frames: anims.generateFrameNumbers("nuve", { start: 0, end: 4}),
      		frameRate: 10,
      		repeat: -1
    	});
	anims.create({
			key: "oz",
      		frames: anims.generateFrameNumbers("oz", { start: 0, end: 3}),
      		frameRate: 5,
      		repeat: -1
    	});
	anims.create({
			key: "magia",
      		frames: anims.generateFrameNumbers("magia", { start: 0, end: 3}),
      		frameRate: 5,
      		repeat: -1
    	});
	  
	this.stupore = this.add.text(680, 150, '!', { fontSize: '64px', fill: '#000' }).setDepth(30);
	this.stupore.alpha = 0;
	  
	this.Nube.anims.play("nube", true);
	var nubetime = 400;
	this.nubetime = nubetime;
	  
	this.freccia = this.add.sprite(640, 360, 'freccia').setFlipX(true).setScale(3).setDepth(40);
	this.freccia.alpha = 0;
	  
	  
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject("Spawn", obj => obj.name === "Spawn Point");
    this.player4 = new Player(this, x, y);
	  
	this.timedEvent = this.time.addEvent({
            delay: 100,
            callback: this.PassaggioLivello,
            callbackScope: this,
            loop: true
    })
  }
	
  update(){
	  this.nubetime --;
	  if(this.nubetime === 300){
		  this.player4.freeze();
		  this.Oz.setFlipX(true);
		  this.stupore.alpha = 1;
	  }
	  
	  if(this.nubetime === 200){
		  this.stupore.alpha = 0;
		  this.Oz.anims.play("oz", false);
		  this.Magia.anims.play("magia", false);
		  this.Magia.alpha = 0.8;
	  }
	  if(this.nubetime < 0){
		  this.player4.unfreeze();
		  this.Nube.x = this.Nube.x + 2;
		  if(this.nubetime % 5 === 0){
		  		this.freccia.alpha = 1
	  	  } else {
		        this.freccia.alpha = 0;
		  }
	  }
	  
	  if(this.player4.sprite.x < this.Nube.x + 100){
		  this.player4.freeze();
      	  const cam = this.cameras.main;
          cam.fade(250, 0, 0, 0);
          cam.once("camerafadeoutcomplete", () => this.scene.restart());
	  }
	  
  }
	
  PassaggioLivello() {
	  if(this.player4.sprite.x > 1216){
		  this.scene.start('MainScene2');
	  }	  
  }
	
}

export class Inizio extends Phaser.Scene {
	
  constructor () {super({key: 'Inizio'})};
	
  preload() {
	  
	  var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(490, 345, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2 + 20,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 + 10,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 60,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });

            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(500, 355, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });

            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
	  
	  this.load.image('1', './assets/images/renders/1.png');
	  this.load.image('2', './assets/images/renders/2.png');
	  this.load.image('3', './assets/images/renders/3.png');
	  this.load.image('4', './assets/images/renders/4.png');
	  this.load.image('5', './assets/images/renders/5.png');
	  this.load.image('6', './assets/images/renders/6.png');
  }
	
  create() {	
	  this.image = 0;
	  this.timedEvent = this.time.addEvent({
            delay: 2000,
            callback: this.images,
            callbackScope: this,
            loop: true
    }) 
  }
	
  images(){
	  if(this.image === 0){
		  this.add.image(640, 360, "1");
		  this.image++;
	  } else if(this.image === 1){
		  this.add.image(640, 360, "1");
		  this.image++;
	  } else if(this.image === 2){
		  this.add.image(640, 360, "2");
		  this.image++;
	  } else if(this.image === 3){
		  this.add.image(640, 360, "2");
		  this.image++;
	  } else if(this.image === 4){
		  this.add.image(640, 360, "3");
		  this.image++;
	  } else if(this.image === 5){
		  this.add.image(640, 360, "4");
		  this.image++;
	  }  else if(this.image === 6){
		  this.add.image(640, 360, "5");
		  this.image++;
	  } else if(this.image === 7){
		  this.add.image(640, 360, "5");
		  this.image++;
	  } else {
		  this.scene.start('MainScene');
	  }
  }
}

export default class MapSetup {

}