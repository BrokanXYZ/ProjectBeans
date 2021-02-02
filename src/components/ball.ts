import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { TrailMesh } from "@babylonjs/core/Meshes/trailMesh";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";

export default class Ball {
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
        this.scene = scene;
        this.mesh = SphereBuilder.CreateSphere(
            name,
            { diameter: 2, segments: 32 },
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
            { mass: 2, restitution: 0.8}, 
            this.scene
        );

        this.mesh.physicsImpostor?.applyImpulse(new Vector3(75,25,0), this.mesh.getAbsolutePosition());
        this.mesh.position.x = -75;
        this.mesh.position.y = 10;
        this.mesh.position.z = 0;
    }
}