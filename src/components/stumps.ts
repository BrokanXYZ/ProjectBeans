import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { CylinderBuilder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { BoxBuilder } from "@babylonjs/core/Meshes/Builders/boxBuilder";

var stumpHeight = 5.895;
var weightHeight = 1.179 ;

export class Stump1{
    mesh:Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
	   this.scene = scene;
		//stump
		const stumpWeight = CylinderBuilder.CreateCylinder("stumpWeight", {height: weightHeight, diameter:0.3}, scene);
		const stumpReal = CylinderBuilder.CreateCylinder("stumpTop", {height: stumpHeight, diameter:0.3}, scene);
		this.mesh = new Mesh(name, scene);
        this.mesh.addChild(stumpReal);
        this.mesh.addChild(stumpWeight);
		 stumpReal.position.y=1.5;
		stumpWeight.position.y=0.8;
		
		stumpWeight.physicsImpostor = new PhysicsImpostor(stumpWeight, PhysicsImpostor.CylinderImpostor, { mass:20 , restitution: 0.1 }, scene);

		stumpReal.physicsImpostor = new PhysicsImpostor(stumpReal, PhysicsImpostor.CylinderImpostor, { mass: 3, restitution: 0.1 }, scene);
		
		
		//this.mesh = Mesh.MergeMeshes([stumpReal,stumpWeight])!;

		this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.CylinderImpostor, { mass: 3, restitution: 0.1 }, scene);
		
		this.mesh.position.x = 9;
		this.mesh.position.y = 1.5;
		this.mesh.position.z =  -0.6;
		
    }
    
}

export class Stump2{
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
	   this.scene = scene;
	   this.mesh = CylinderBuilder.CreateCylinder(name, {height: stumpHeight, diameter:0.3}, scene)
	   
	   this.mesh.position.x = 9;
	   this.mesh.position.y = 1.5;
	   this.mesh.position.z = 0;

	   this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.CylinderImpostor, { mass: 3, restitution: 0.1 }, scene);
}
}

export class Stump3{
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
	   this.scene = scene;
	   this.mesh = CylinderBuilder.CreateCylinder(name, {height: stumpHeight, diameter:0.3}, scene);
	   
		this.mesh.position.x = 9;
		this.mesh.position.y = 1.5;
		this.mesh.position.z =  0.6;
		
		this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.CylinderImpostor, { mass: 3, restitution: 0.1 }, scene);
}
}

export class Bail1{
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
	   this.scene = scene;
	   this.mesh = BoxBuilder.CreateBox(name, {height:0.1, width:0.3, depth:0.5}, scene);

		 this.mesh.position.x = 9;
		 this.mesh.position.y = 6;
		 this.mesh.position.z = -0.3;

		 this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.BoxImpostor, { mass: 0.2, restitution: 0.1 }, scene);
}
}

export class Bail2{
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
	   this.scene = scene;
	   this.mesh = BoxBuilder.CreateBox(name, {height:0.1, width:0.3, depth:0.5}, scene);
	   
		 this.mesh.position.x = 9;
		 this.mesh.position.y = 6;
		 this.mesh.position.z = 0.3;
	   
	   this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.BoxImpostor, { mass: 0.2, restitution: 0.1 }, scene);
	   
}
}