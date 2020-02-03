export default class Chiavi {
  constructor(scene, x, y) {
    this.scene = scene;
	
	function preload(){
	}

  	function create(){
	  	this.keyR = this.matter.add.image(8036, 1613, "keyR");
		this.keyV = this.matter.add.image(8258, 729, "keyV");
		this.BloccoV = this.matter.add.image(7808, 1152.75, "BloccoV");
		this.BloccoR = this.matter.add.image(7808, 1216.02, "BloccoR");
		this.keyR.setCircle();
		this.keyV.setCircle();
		this.keyV.setStatic(true);
		this.keyR.setStatic(true);
		this.keyV.body.isSensor = true;
		this.keyR.body.isSensor = true;
		this.BloccoV.body.density = 1;
		this.BloccoR.body.density = 1;
  	}	

  	function update() {
    
  	}
  }
}