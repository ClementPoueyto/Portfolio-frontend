Arena4 = function (game) {

    // Appel des variables nécéssaires
    this.game = game;
    var scene = game;
    //position d'apparition du joueur dans le niveau;
    this.spawn = new BABYLON.Vector3(0, 15 * 1, 0);
    //Vitesse du joueur dans le niveau
    this.speed = 2;
    var music2 = new BABYLON.Sound(
        "Music", "assets/sons/music.mp3", scene, null, {
        loop: true,
        autoplay: true
    }
    )
    this.music = music2;


     //Material pour normal box
    var materialNormalBox = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    materialNormalBox.diffuseTexture = new BABYLON.Texture("assets/images/decor2/terre.jpg", scene);
    materialNormalBox.diffuseTexture.uScale = 1.0;
    materialNormalBox.diffuseTexture.vScale = 1.0;
    scene.materialNormalBox = materialNormalBox;

    //MESH DE FIN - Ramene au menu
    this.end = BABYLON.MeshBuilder.CreateBox("box1", { size: 100 }, scene);
    var endMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    endMaterial.alpha = 0
    this.end.position = new BABYLON.Vector3(5100, -40, 0);
    this.end.material = endMaterial
    //MESH DE FIN - Ramene au menu
    loader = BABYLON.SceneLoader.Append('assets/model/', 'scene2end.glb', scene, function (scene) {
        // do something with the scene
    })
    loader.onMeshLoaded = function (mesh) {
        mesh.position = new BABYLON.Vector3(5100, -80, 0)
        mesh.scaling = new BABYLON.Vector3(40, 40, 40)

    }
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 50, 0), scene);
     light.intensity = 1.3

    scene.mapEngine = new MapEngine(scene, "clementArena4")
    //clementArena4
    //loic

     //Material pour normal box
     var materialPlayer = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
     materialPlayer.diffuseTexture = new BABYLON.Texture("assets/images/player/player2.jpg", scene);
     materialPlayer.diffuseTexture.uScale = 1.0;
     materialPlayer.diffuseTexture.vScale = 1.0;
     scene.player.box.material = materialPlayer;

    /** DECOR************************************************* */
    if(scene.decorOn==true){
        var decor2= new Decor2(scene);}
/******************************************************************************************** */

    params = {"trigger":-1,"normalCubesProbability":1000,"pattern":[-1,0,1],"minWidth":3}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":400,"normalCubesProbability":850,"upCubesProbability":1000,"upCubeSpeed":0.2,"upCubeTriggerX":5,"pattern":[0,1],"minWidth":2,"maxWidth":0}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":2000,"normalCubesProbability":1000,"pattern":[-1,0,1],"minWidth":2,"change":0,"maxWidth":3}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":3000,"normalCubesProbability":850,"upCubesProbability":1000,"pattern":[-1,0,1,2],"minWidth":3,"maxWidth":4,"change":0}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":4500,"normalCubesProbability":850,"pattern":[-1,0,1],"minWidth":2,"maxWidth":2,"change":200}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":5000,"normalCubesProbability":0,"upCubesProbability":0,"pattern":[0],"minWidth":1,"maxWidth":0,"change":0}
    scene.mapEngine.addParamsConfiguration(params)


    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnEveryFrameTrigger },
        function () {
            updateMap(scene)

        }
    ));
    return this


}