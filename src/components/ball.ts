import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/Math.vector";
import { Quaternion } from "@babylonjs/core/Maths/Math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { TrailMesh } from "@babylonjs/core/Meshes/trailMesh";
import { Color3 } from "@babylonjs/core/Maths/Math.color";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
//import { Math } from 

export default class Ball {
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
        this.scene = scene;
        this.mesh = SphereBuilder.CreateSphere(
            name,
            { diameter: 1, segments: 32 },
            scene
        );

        const trail = new TrailMesh('new', this.mesh, scene, 0.5, 30, true);
        const trailMaterial = new StandardMaterial('sourceMat', scene);
        trailMaterial.emissiveColor = new Color3(1,1,1);
        trailMaterial.diffuseColor = new Color3(1,1,1);
        trailMaterial.specularColor = new Color3(0,0,1);
        trail.material = trailMaterial;
    }

    pitch() {
        if(this.mesh.physicsImpostor)
        {
            this.mesh.physicsImpostor.dispose();
        }

        this.mesh.physicsImpostor = new PhysicsImpostor(
            this.mesh, 
            PhysicsImpostor.SphereImpostor, 
            { mass: 0.3, restitution: 0.8}, 
            this.scene
        );

		this.mesh.physicsImpostor.setLinearVelocity(new Vector3(Math.random()*20+25, -10, 0));
		
		var pitchType = Math.random();
		var sideSpin = 0;
		var topSpin = 0;
		
		if (pitchType <= .33) 
		{
			//nothing to do...no angular velocity
			this.mesh.physicsImpostor.setAngularVelocity(new Vector3(sideSpin, topSpin, 0));
		}
		else if (pitchType <= .66)  
		{
		//add .01 to account for the zero spin case
		//((Math.random() <. 50 ? (-1) : (1))*
			sideSpin = ((Math.random() < .5 ?  -1 : 1)*(Math.random()*40+20))+.01;
			this.mesh.physicsImpostor.setAngularVelocity(new Vector3(sideSpin, 0, 0));
		}
		else if  (pitchType < .90)
		{
			topSpin = ((Math.random() < .5 ?  -1 : 1)*(Math.random()*40+20))+.01;
			this.mesh.physicsImpostor.setAngularVelocity(new Vector3(0, topSpin, 0));
		}
		else
		{
			 sideSpin = ((Math.random() < .5 ?  -1 : 1)*(Math.random()*40+20))+.01;
			 topSpin = ((Math.random() < .5 ?  -1 : 1)*(Math.random()*40+20))+.01;
			 this.mesh.physicsImpostor.setAngularVelocity(new Vector3(sideSpin, topSpin, 0));
		}
		//var trajectoryType = Math.random();
		//if trajectory < .33 then straight, if trajectory < .66, then right with random height and distance from center, else left with random height and distance from center
      //this.mesh.physicsImpostor?.applyImpulse(new Vector3(10,-10,0), this.mesh.getAbsolutePosition());
		//this.mesh..physicsImpostor.setLinearVelocity(new Vector3(0, 5, (Math.floor((Math.random()+.2)*-20)-3)));
        //this.mesh.physicsImpostor.setAngularVelocity(new Quaternion(0, 0, (Math.floor(Math.random()*50)), 0));
		//-50 in first parameter = left, +50 = right
		//second or third parameter = top spin/slice
		//
        this.mesh.position.x = -75;
        this.mesh.position.y = 10;
        this.mesh.position.z = 0;
    }
}