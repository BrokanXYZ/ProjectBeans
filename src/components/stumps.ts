import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { CylinderBuilder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { BoxBuilder } from "@babylonjs/core/Meshes/Builders/boxBuilder";

var stumpHeight = 5.895;

export class Stump1{
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
	   this.scene = scene;
		//stumps
		this.mesh = CylinderBuilder.CreateCylinder(name, {height: stumpHeight, diameter:0.3}, scene);

		this.mesh.position.x = 9;
		this.mesh.position.y = 1.5;
		this.mesh.position.z =  -0.6;
	
		this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.CylinderImpostor, { mass: 3, restitution: 0.1 }, scene);
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