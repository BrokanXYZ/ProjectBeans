///// Query 1 //////

var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // Setup environment
    var camera = new BABYLON.ArcRotateCamera("Camera", 11, 4, 15, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.2;
    camera.upperBetaLimit = (Math.PI / 2) * 0.7;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    // // // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // light1
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -5, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.intensity = 0.9;

    var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere.position = light.position;
    lightSphere.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    //Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:150}, scene);
      const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skybox.material = skyboxMaterial;

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: .75, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 3;
    sphere.position.x = 0;
    sphere.position.z = 19;

        var trail = new BABYLON.TrailMesh('new', sphere, scene, .1, 30, true);
var sourceMat = new BABYLON.StandardMaterial('sourceMat', scene);
sourceMat.emissiveColor = 
sourceMat.diffuseColor = new BABYLON.Color3.White();
sourceMat.specularColor = new BABYLON.Color3.Blue();
trail.material = sourceMat;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 20}, scene);

// Our built-in 'bat' shape.
    var bat = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 4, diameter:1}, scene);

        // Move the bat
    bat.position.x = 0
    bat.position.y = 2;
    bat.position.z = -9;

    scene.enablePhysics();
    
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    bat.physicsImpostor = new BABYLON.PhysicsImpostor(bat, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);

        var sixDofDragBehavior = new BABYLON.SixDofDragBehavior()
        bat.addBehavior(sixDofDragBehavior)

    //impulse
    sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 5, -10));

    //materials
    var grassMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
    var grassTexture = new BABYLON.GrassProceduralTexture(name + "textbawl", 256, scene);
    grassMaterial.ambientTexture = grassTexture;
    ground.material = grassMaterial;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.getShadowMap().renderList.push(sphere);
    shadowGenerator.getShadowMap().renderList.push(bat);
    

    var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator2.addShadowCaster(sphere);
    shadowGenerator2.addShadowCaster(bat);
    shadowGenerator2.usePoissonSampling = true;

ground.receiveShadows = true;

    
    return scene;
};



///// Query 2 //////

var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 9, -20), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // // // This attaches the camera to the canvas
    //  camera.attachControl(canvas, true);

    // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
     var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // // Default intensity is 1. Let's dim the light a small amount
     light.intensity = 0.8;

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    var trail = new BABYLON.TrailMesh('new', sphere, scene, .1, 30, true);
var sourceMat = new BABYLON.StandardMaterial('sourceMat', scene);
sourceMat.emissiveColor = 
sourceMat.diffuseColor = new BABYLON.Color3.White();
sourceMat.specularColor = new BABYLON.Color3.Blue();
trail.material = sourceMat;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 20}, scene);

// Our built-in 'bat' shape.
    var bat = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 1, diameter:.4}, scene);

        // Move the bat
    bat.position.x = 0
    bat.position.y = 2.5;
    bat.position.z = -9;

    scene.enablePhysics();

    //batbottom
    var batbottom = BABYLON.MeshBuilder.CreateBox("cube", { size: .6, height: 2 }, scene);

    batbottom.position.x = 0
    batbottom.position.y = 1;
    batbottom.position.z = -9;

        var mesh = BABYLON.Mesh.MergeMeshes([bat, batbottom]);
    
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.8 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.7 }, scene);
    bat.physicsImpostor = new BABYLON.PhysicsImpostor(bat, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.8 }, scene);
    batbottom.physicsImpostor = new BABYLON.PhysicsImpostor(batbottom, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.8 }, scene);
    
        var sixDofDragBehavior = new BABYLON.SixDofDragBehavior()
        bat.addBehavior(sixDofDragBehavior)

    //impulse
    sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 5, -6));

    //materials
    var grassMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
    var grassTexture = new BABYLON.GrassProceduralTexture(name + "textbawl", 256, scene);
    grassMaterial.ambientTexture = grassTexture;
    ground.material = grassMaterial;

    //meshes
    var startingPoint;
    var currentMesh;

    var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }

        return null;
    }

    var pointerDown = function (mesh) {
            currentMesh = mesh;
            startingPoint = getGroundPosition();
            if (startingPoint) { // we need to disconnect camera from canvas
                setTimeout(function () {
                    camera.detachControl(canvas);
                }, 0);
            }
    }

    var pointerUp = function () {
        if (startingPoint) {
            camera.attachControl(canvas, true);
            startingPoint = null;
            return;
        }
    }

    var pointerMove = function () {
        if (!startingPoint) {
            return;
        }
        var current = getGroundPosition();
        if (!current) {
            return;
        }

        var diff = current.subtract(startingPoint);
        currentMesh.position.addInPlace(diff);

        startingPoint = current;

    }

    scene.onPointerObservable.add((pointerInfo) => {            
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != ground) {
                    pointerDown(pointerInfo.pickInfo.pickedMesh)
                }
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                    pointerUp();
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:          
                    pointerMove();
                break;
        }
    });
    
   

    
    return scene;
};

