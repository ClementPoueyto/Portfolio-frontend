Decor4 = function (scene) {

    var skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 6000.0 }, scene)
    skybox.infiniteDistance = true;
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky/skybox', scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial


    var ground = BABYLON.MeshBuilder.CreatePlane("plane", { height: 600, width: 5500 }, scene);
    ground.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
    ground.position = new BABYLON.Vector3(2500, -110, 0);
    //Material pour le sol
    var groundMaterial = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/images/decor4/stade.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 4.0;
    groundMaterial.diffuseTexture.vScale = 2.0;
    ground.material = groundMaterial;
    
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);

    var rot=new BABYLON.Vector3(0, Math.PI/2, 0);
    var rot2=new BABYLON.Vector3(0, -Math.PI/2, 0);

    loaderDecor = BABYLON.SceneLoader.Append('assets/model/', 'football.glb', scene, function (scene) {
        // do something with the scene
    });
    loaderDecor.onMeshLoaded = function (mesh) {
        mesh.isVisible=false;
        mesh.position.y=-140

        for (var index = 0; index < 20; index++) {
            var newInstance = mesh.createInstance("i" + index);
            newInstance.scaling = new BABYLON.Vector3(20, 20, 20)
            newInstance.position.x = (index*1370)-300;
            newInstance.position.y = -100;
            newInstance.position.z =150;
            newInstance.rotation= rot;

            var newInstance2 = mesh.createInstance("i" + index);
            newInstance2.scaling = new BABYLON.Vector3(20, 20, 20)
            newInstance2.position.x = (index*1370)-200;
            newInstance2.position.y = -100;
            newInstance2.position.z =150;
            newInstance2.rotation= rot2;
        }
        for (var index = 0; index < 20; index++) {

            var newInstance = mesh.createInstance("i2-" + index);
            // Here you could change the properties of your individual instance,
            // for example to form a diagonal line of instances:
            newInstance.scaling = new BABYLON.Vector3(20, 20, 20)
            newInstance.position.x = (index*1370)-300;
            newInstance.position.y = -100;
            newInstance.position.z = -150;
            newInstance.rotation= rot;

            var newInstance2 = mesh.createInstance("i" + index);
            newInstance2.scaling = new BABYLON.Vector3(20, 20, 20)
            newInstance2.position.x = (index*1370)-200;
            newInstance2.position.y = -100;
            newInstance2.position.z =-150;
            newInstance2.rotation= rot2;

            // See below for more details on what can be changed.
        }
    }

}