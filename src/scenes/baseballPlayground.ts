import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3,  } from "@babylonjs/core/Maths/math.color";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { AmmoJSPlugin } from "@babylonjs/core/Physics/Plugins/ammoJSPlugin";
import "@babylonjs/core/Physics/physicsEngineComponent";
// If you don't need the standard material you will still need to import it since the scene requires it.
import "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";

import { ammoModule, ammoReadyPromise } from "../externals/ammo";
import { CreateSceneClass } from "../createScene";
import grassTextureUrl from "../../assets/grass.jpg";

class BaseballPlayground implements CreateSceneClass {
    preTasks = [ammoReadyPromise];

    createScene = async (engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> => {
        const scene = new Scene(engine);
    
        scene.enablePhysics(null, new AmmoJSPlugin(true, ammoModule));
    
        const camera = new ArcRotateCamera("mainCamera", 0, Math.PI / 3, 10, new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        camera.radius = 50;
        camera.beta = 1.25;
        camera.upperBetaLimit = 1.4;
        camera.lowerRadiusLimit = 10;
        camera.upperRadiusLimit = 500;
        camera.panningSensibility = 0; // panning disabled (ctrl+leftMouse)
    
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
    
        var skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
        var skyboxMaterial = new StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;	

        const sphere = SphereBuilder.CreateSphere(
            "sphere",
            { diameter: 2, segments: 32 },
            scene
        );
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 2, restitution: 0.8}, scene);
        sphere.position.y = 5;
    
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

        engine.runRenderLoop(function () {
            // console.log("radius:",camera.radius);
            // console.log("alpha:",camera.alpha);
            // console.log("beta:",camera.beta);
        });

        return scene;
    };
}

export default new BaseballPlayground();
