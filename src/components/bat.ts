import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { SixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/sixDofDragBehavior";
import { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { BoundingBoxGizmo } from "@babylonjs/core/Gizmos/boundingBoxGizmo";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export default class Bat {
    mesh: Mesh;
    scene: Scene;

    constructor(name: string, scene: Scene) {
        this.scene = scene;
        this.mesh = MeshBuilder.CreateCylinder("bat", { height: 8}, scene);
        this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.8});
        this.mesh.position.y = 8;

        // wrap in bounding box mesh to avoid picking perf hit
        let boundingBox = BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(this.mesh);

        // Create bounding box gizmo
        let utilLayer = new UtilityLayerRenderer(scene)
        utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
        let gizmo = new BoundingBoxGizmo(Color3.FromHexString("#0984e3"), utilLayer)
        gizmo.attachedMesh = boundingBox;

        // // Create behaviors to drag and scale with pointers in VR
        let sixDofDragBehavior = new SixDofDragBehavior()
        boundingBox.addBehavior(sixDofDragBehavior)
    }
    
}