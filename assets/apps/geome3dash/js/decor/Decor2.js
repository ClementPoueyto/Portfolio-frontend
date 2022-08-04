Decor2=function(scene){
    var materialWood = new BABYLON.StandardMaterial("woodtexture", scene);
    materialWood.diffuseTexture = new BABYLON.Texture("assets/images/decor2/wood.jpg", scene);
    materialWood.diffuseTexture.uScale = 1.0;
    materialWood.diffuseTexture.vScale = 1.0;

    var materialLeaf = new BABYLON.StandardMaterial("leaftexture", scene);
    materialLeaf.diffuseTexture = new BABYLON.Texture("assets/images/decor1/grass.jpg", scene);
    materialLeaf.diffuseTexture.uScale = 1.0;
    materialLeaf.diffuseTexture.vScale = 1.0;

    
    for(let i=0; i<20;i++){
        let z =getRandomInt(30);
        var tree = QuickTreeGenerator(15, 10, 5, materialWood, materialLeaf, scene);
        tree.position= new BABYLON.Vector3(i*200+200,-100,-100-z);
        tree.scaling = new BABYLON.Vector3(4, 4, 4)
        tree.freezeWorldMatrix();

        var tree2 = QuickTreeGenerator(15, 10, 5, materialWood, materialLeaf, scene);
        tree2.position= new BABYLON.Vector3(i*200+200,-100,-60+z);
        tree2.scaling = new BABYLON.Vector3(4, 4, 4)
        tree2.freezeWorldMatrix();

    }
    for(let i=0; i<20;i++){
        let z =getRandomInt(30);
        var tree = QuickTreeGenerator(15, 10, 5, materialWood, materialLeaf, scene);
        tree.position= new BABYLON.Vector3(i*200+200,-100,100+z);
        tree.scaling = new BABYLON.Vector3(4, 4, 4)
        tree.freezeWorldMatrix();

        var tree2 = QuickTreeGenerator(15, 10, 5, materialWood, materialLeaf, scene);
        tree2.position= new BABYLON.Vector3(i*200+200,-100,60+z);
        tree2.scaling = new BABYLON.Vector3(4, 4, 4)
        tree2.freezeWorldMatrix();


    }

    var skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 6000.0 }, scene)
    skybox.infiniteDistance = true;
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky/skybox', scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial
    
    var ground = BABYLON.MeshBuilder.CreatePlane("plane", {height:400, width: 7000}, scene);
    ground.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
    ground.position=new BABYLON.Vector3(2500,-110,0);
    //Material pour le sol
    var groundMaterial = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/images/decor1/grass.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 1000.0;
    groundMaterial.diffuseTexture.vScale = 100.0;
    ground.material = groundMaterial;


     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 50, 0), scene);
     light.intensity = 1.3
    

}