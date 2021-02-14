import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { SixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/sixDofDragBehavior";
import { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { BoundingBoxGizmo } from "@babylonjs/core/Gizmos/boundingBoxGizmo";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";

export default class Bat {
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
        this.scene = scene;

        const batTop = MeshBuilder.CreateCylinder("batTop", {height: 1.5, diameter: 0.75}, scene);
        const batBottom = MeshBuilder.CreateBox("batBottom", { size: 1.25, height: 5}, scene);
        batBottom.position.y = -3.25;

        this.mesh = new Mesh("bat", scene);
        this.mesh.addChild(batTop);
        this.mesh.addChild(batBottom);

        // Enable physics on colliders first then physics root of the mesh
        batTop.physicsImpostor = new PhysicsImpostor(
            batTop, 
            PhysicsImpostor.CylinderImpostor, 
            { mass: 0, restitution: 0.75}, 
            scene
        );
        batBottom.physicsImpostor = new PhysicsImpostor(
            batBottom, 
            PhysicsImpostor.BoxImpostor, 
            { mass: 0, restitution: 0.75}, 
            scene
        );
        this.mesh.physicsImpostor = new PhysicsImpostor(
            this.mesh, 
            PhysicsImpostor.CylinderImpostor, 
            { mass: 0, restitution: 0.75}, 
            scene
        );

        this.mesh.position = new Vector3(0,8,0);

        // wrap in bounding box mesh to avoid picking perf hit
        let boundingBox = BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(this.mesh);
        
        // // Create behaviors to drag and scale with pointers in VR
        let sixDofDragBehavior = new SixDofDragBehavior()
        boundingBox.addBehavior(sixDofDragBehavior)
    }
    
}