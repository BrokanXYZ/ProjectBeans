import { Engine } from "@babylonjs/core/Engines/engine";
import { getSceneModuleWithName } from "./createScene";

export const babylonInit = async (): Promise<void>  => {
    const createSceneModule = await getSceneModuleWithName();

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || []);

    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; 
    const engine = new Engine(canvas, true); 
    const scene = await createSceneModule.createScene(engine, canvas);

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});
