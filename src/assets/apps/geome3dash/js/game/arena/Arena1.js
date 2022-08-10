

Arena1 = function (game) {

    // Appel des variables nécéssaires
    this.game = game;
    var scene = game;
    //position d'apparition du joueur dans le niveau;
    this.spawn = new BABYLON.Vector3(0, 15 * 1, 0);
    //Vitesse du joueur dans le niveau
    this.speed = 1.5;
    var music2 = new BABYLON.Sound(
        "Music", "assets/sons/music.mp3", scene, null, {
        loop: true,
        autoplay: true
    }
    )
    this.music = music2;

    //Material pour normal box
    var materialNormalBox = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    materialNormalBox.diffuseTexture = new BABYLON.Texture("assets/images/decor1/road.jpg", scene);
    materialNormalBox.diffuseTexture.uScale = 1.0;
    materialNormalBox.diffuseTexture.vScale = 1.0;
    scene.materialNormalBox = materialNormalBox;


     //MESH DE FIN - Ramene au menu
     this.end = BABYLON.MeshBuilder.CreateBox("box1", { size: 350 }, scene);
     var endMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
     endMaterial.alpha = 0
     this.end.material = endMaterial
     this.end.position = new BABYLON.Vector3(5100, -200, 10);
     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 50, 0), scene);
     light.intensity = 1.3
     //MESH DE FIN - Ramene au menu

     loader = BABYLON.SceneLoader.Append('assets/model/', 'scene1end.glb', scene, function (scene) {
        // do something with the scene
    })
    loader.onMeshLoaded = function (mesh) {
        mesh.position = new BABYLON.Vector3(5100, -450, 10)
        mesh.scaling = new BABYLON.Vector3(250, 250, 250)
    }

    /**DECOR*********************************************************************** */
    if (scene.decorOn == true) {
        var decor1 = new Decor1(scene);
    }
    /********************************************************************** */

    scene.mapEngine = new MapEngine(scene, "D")

    params = { "trigger": -1, "normalCubesProbability": 1000, "pattern": [-1, 0, 1], "minWidth": 3 }
    scene.mapEngine.addParamsConfiguration(params)
    params = { "trigger": 400, "normalCubesProbability": 950, "pattern": [0,1], "minWidth": 2, "change": 50 }
    scene.mapEngine.addParamsConfiguration(params)
    params = { "trigger": 3000, "normalCubesProbability": 1000, "pattern": [0], "minWidth": 1, "change": 80 }
    scene.mapEngine.addParamsConfiguration(params)
    params = { "trigger": 5000, "normalCubesProbability": 0, "pattern": [-1, 0, 1], "minWidth": 1, "change": 0 }
    scene.mapEngine.addParamsConfiguration(params)


     //Material pour normal box
     var materialPlayer = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
     materialPlayer.diffuseTexture = new BABYLON.Texture("assets/images/player/player1.jpg", scene);
     materialPlayer.diffuseTexture.uScale = 1.0;
     materialPlayer.diffuseTexture.vScale = 1.0;
     scene.player.box.material = materialPlayer;

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnEveryFrameTrigger },
        function () {
            updateMap(scene)

        }
    ));



    var imageArrowleft = new BABYLON.GUI.Image("left", "assets/images/arrow.png");
    imageArrowleft.width = "300px";
    imageArrowleft.height = "200px";
    imageArrowleft.top = 250;
    imageArrowleft.left = -350;
    scene.advancedTexture.addControl(imageArrowleft);

    var imageArrowright = new BABYLON.GUI.Image("right", "assets/images/arrow.png");
    imageArrowright.width = "300px";
    imageArrowright.height = "200px";
    imageArrowright.top = 250;
    imageArrowright.left = 350;
    imageArrowright.rotation=Math.PI
    scene.advancedTexture.addControl(imageArrowright);

    var image = new BABYLON.GUI.Image("but", "assets/images/menu/keyQ.png");
    image.width = "60px";
    image.height = "60px";
    image.top = 320;
    image.left = -350;
    scene.advancedTexture.addControl(image);
    var image2 = new BABYLON.GUI.Image("but2", "assets/images/menu/keyD.png");
    image2.width = "60px";
    image2.height = "60px";
    image2.top = 320;
    image2.left = 350;
    scene.advancedTexture.addControl(image2);
    var image3 = new BABYLON.GUI.Image("but3", "assets/images/menu/keySpace.png");
    image3.width = "360px";
    image3.height = "60px";
    image3.top = 360;
    image3.left = 0;
    scene.advancedTexture.addControl(image3);



    return this


}
