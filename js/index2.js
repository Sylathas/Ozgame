import MainScene2 from "./main-scene2.js";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: "#000c1f",
  parent: "game-container",
  scene: MainScene2,
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

const game = new Phaser.Game(config);