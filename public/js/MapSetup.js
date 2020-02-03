export default class mapSetup {
	
	sceneMap (map, ctx) {
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");

    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0).setDepth(15);
    const lavaLayer = map.createDynamicLayer("Lava", tileset, 0, 0).setDepth(15);
    map.createDynamicLayer("Background", tileset, 0, 0).setDepth(10);
	map.createDynamicLayer("Background2", tileset, 0, 0).setDepth(5);
    map.createDynamicLayer("Foreground", tileset, 0, 0).setDepth(20);
	map.createDynamicLayer("Grass", tileset, 0, 0).setDepth(25);
	map.createDynamicLayer("Sky", tileset, 0, 0).setDepth(-10);

    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    ctx.matter.world.convertTilemapLayer(groundLayer);
    ctx.matter.world.convertTilemapLayer(lavaLayer);	
	}	

}