import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3,  } from "@babylonjs/core/Maths/math.color";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { PlaneBuilder } from "@babylonjs/core/Meshes/Builders/planeBuilder";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { PointerDragBehavior } from "@babylonjs/core/Behaviors/Meshes/pointerDragBehavior";
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
        camera.setTarget(new Vector3(0,5,0));
        camera.attachControl(canvas, true);
        camera.radius = 50;
        camera.beta = 1.25;
        camera.lowerAlphaLimit = -0.25;
        camera.upperAlphaLimit = 0.25;
        camera.upperBetaLimit = 1.55;
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 100;
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

        const baseball = SphereBuilder.CreateSphere(
            "sphere",
            { diameter: 2, segments: 32 },
            scene
        );
        pitchBall();
    
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

        const homePlate = PlaneBuilder.CreatePlane(
            "homePlate",
            { size: 7.5},
            scene
        );

        homePlate.position.y = 0.1;
        homePlate.rotation.x = Math.PI/2;

        const bat = MeshBuilder.CreateCylinder("bat", { height: 8}, scene);
        bat.physicsImpostor = new PhysicsImpostor(bat, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.6});
        bat.position.y = 12;


        var pointerDragBehavior = new PointerDragBehavior({dragAxis: new Vector3(1,0,0)});
        pointerDragBehavior.useObjectOrientationForDragging = false;
        bat.addBehavior(pointerDragBehavior);

        function pitchBall(){
            if(baseball.physicsImpostor)
            {
                baseball.physicsImpostor.dispose();
            }
            baseball.physicsImpostor = new PhysicsImpostor(baseball, PhysicsImpostor.SphereImpostor, { mass: 2, restitution: 0.8}, scene);
            baseball.physicsImpostor?.applyImpulse(new Vector3(75,25,0), baseball.getAbsolutePosition());
            baseball.position.x = -75;
            baseball.position.y = 10;
            baseball.position.z = 0;
        }

        setInterval(()=>{
            pitchBall();
        }, 5000)

        engine.runRenderLoop(function () {
            // console.log("radius:",camera.radius);
            // console.log("alpha:",camera.alpha);
            // console.log("beta:",camera.beta);
        });

        return scene;
    };
}

export default new BaseballPlayground();
