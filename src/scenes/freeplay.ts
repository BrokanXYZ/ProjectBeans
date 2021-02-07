import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { SixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/sixDofDragBehavior";
import { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { BoundingBoxGizmo } from "@babylonjs/core/Gizmos/boundingBoxGizmo";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { AmmoJSPlugin } from "@babylonjs/core/Physics/Plugins/ammoJSPlugin";
import "@babylonjs/core/Physics/physicsEngineComponent";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
// If you don't need the standard material you will still need to import it since the scene requires it.
import "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";

import { ammoModule, ammoReadyPromise } from "../externals/ammo";
import { CreateSceneClass } from "../createScene";
import grassTextureUrl from "../../assets/grass.jpg";
import Ball from "../components/ball";
import Bat from "../components/bat";
import * as Stumps from "../components/stumps";

class Freeplay implements CreateSceneClass {
    preTasks = [ammoReadyPromise];

    createScene = async (engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> => {

        const scene = new Scene(engine);
        scene.enablePhysics(null, new AmmoJSPlugin(true, ammoModule));
    
        const camera = new ArcRotateCamera("mainCamera", 0, Math.PI / 3, 10, new Vector3(0, 0, 0), scene);
        camera.setTarget(new Vector3(0,5,0));
        camera.attachControl(scene, false);
        camera.radius = 50;
        camera.beta = 1.25;
    
        const light = new DirectionalLight("dir01", new Vector3(-1, -5, -1), scene);
        light.position = new Vector3(20, 40, 20);
        light.intensity = 0.9;

        const lightSphere = SphereBuilder.CreateSphere("lightSphere", {}, scene);
        lightSphere.position = light.position;

        const lightSphereMat = new StandardMaterial("lightSphereMat", scene);
        lightSphereMat.emissiveColor = new Color3(1, 1, 0);
        lightSphere.material = lightSphereMat;
        
        const ground = GroundBuilder.CreateGround(
            "ground",
            { width: 1000, height: 1000 },
            scene
        );
        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.6});

        const groundMaterial = new StandardMaterial("ground material", scene);
        let groundTexture: Texture = new Texture(grassTextureUrl, scene);
        groundTexture.uScale = 10;
        groundTexture.vScale = 10;
        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;

		const stump1 = new Stumps.Stump1("stump1",scene);
		const stump2 = new Stumps.Stump2("stump2",scene);
		const stump3 = new Stumps.Stump3("stump3",scene);		
		
		const bail1 = new Stumps.Bail1("bail1",scene);
		const bail2 = new Stumps.Bail2("bail2",scene);				
		
        const bat = new Bat("bat", scene);

        const ball = new Ball("ball", scene);
        ball.pitch();

        setInterval(()=>{
            ball.pitch();
        }, 5000)

        // Shadows
        var shadowGenerator = new ShadowGenerator(1024, light);
        shadowGenerator.getShadowMap()?.renderList?.push(ball.mesh);
        shadowGenerator.getShadowMap()?.renderList?.push(bat.mesh);
        

        var shadowGenerator2 = new ShadowGenerator(1024, light);
        shadowGenerator2.addShadowCaster(ball.mesh);
        shadowGenerator2.addShadowCaster(bat.mesh);
        shadowGenerator2.usePoissonSampling = true;

        ground.receiveShadows = true;


        return scene;
    };
}

export default new Freeplay();
