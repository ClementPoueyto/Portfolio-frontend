Decor3 = function (scene) {

    var skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 6000.0 }, scene)
    skybox.infiniteDistance = true;
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky/skybox', scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial


    var ground = BABYLON.MeshBuilder.CreatePlane("plane", { height: 4000, width: 5500 }, scene);
    ground.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
    ground.position = new BABYLON.Vector3(2500, -110, 0);
    //Material pour le sol
    var groundMaterial = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/images/decor3/water.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 1000.0;
    groundMaterial.diffuseTexture.vScale = 100.0;
    ground.material = groundMaterial;
    groundMaterial.freeze()
    
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);

    loaderDecor = BABYLON.SceneLoader.Append('assets/model/', 'boat.glb', scene, function (scene) {
        // do something with the scene
    });
    loaderDecor.onMeshLoaded = function (mesh) {

        mesh.position.y=-90

        for (var index = 0; index < 17; index++) {
            var newInstance = mesh.createInstance("i" + index);
            // Here you could change the properties of your individual instance,
            // for example to form a diagonal line of instances:
            newInstance.scaling = new BABYLON.Vector3(30,30, 30)
            newInstance.position.x = index*320;
            newInstance.position.y = -90;
            newInstance.position.z = 90;

           
        }
        for (var index = 0; index < 17; index++) {

            var newInstance = mesh.createInstance("i2-" + index);
            // Here you could change the properties of your individual instance,
            // for example to form a diagonal line of instances:
            newInstance.scaling = new BABYLON.Vector3(30, 30, 30)
            newInstance.position= new BABYLON.Vector3(index*300,-90,-110)

           
           
        }
    }
}