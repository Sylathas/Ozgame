import {MainScene} from "./main-scene.js";
import {MainScene2} from "./main-scene.js";
import {Finale} from "./main-scene.js";
import {Intermezzo} from "./main-scene.js";
import {Inizio} from "./main-scene.js";
import {MainMenu} from "./main-scene.js";
import {Autors} from "./main-scene.js";
import {Credits} from "./main-scene.js";
import {DeathScreen} from "./main-scene.js";

let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: "#000c1f",
  parent: "game-container",
  scene: [MainMenu, Inizio, MainScene2, Finale, Intermezzo, MainScene, Credits, Autors, DeathScreen],
  pixelArt: true,
  physics: { default: "matter" },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      }
    ]
  }
};

let game = new Phaser.Game(config);