Decor1 = function (scene) {



    var skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 9000.0 }, scene)
    skybox.infiniteDistance = true;
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky/skybox', scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial

    city = BABYLON.SceneLoader.Append('assets/model/', 'city.glb', scene, function (scene) {
        // do something with the scene
    })
    city.onMeshLoaded = function (mesh) {
        mesh.position = new BABYLON.Vector3(2500, -700, -150)
        mesh.scaling = new BABYLON.Vector3(100, 100, 100)
        mesh.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
        mesh.freezeWorldMatrix();

    }

    var plane = BABYLON.MeshBuilder.CreatePlane('plane', { height: 5500, width: 5000 }, scene)
    plane.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD)
    plane.position = new BABYLON.Vector3(2500, -870, 100)

    var materialGround = new BABYLON.StandardMaterial('blue', scene)
    materialGround.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5)
    materialGround.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5)
    plane.material = materialGround
    materialGround.freeze()









}