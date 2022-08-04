Arena9 = function (game) {

    // Appel des variables nécéssaires
    this.game = game;
    var scene = game;
    //position d'apparition du joueur dans le niveau;
    this.spawn = new BABYLON.Vector3(0, 15 * 1, 0);
    //Vitesse du joueur dans le niveau
    this.speed = 2.5;
    var music2 = new BABYLON.Sound(
        "Music", "assets/sons/music.mp3", scene, null, {
        loop: true,
        autoplay: true
    }
    )
    this.music = music2;

    var materialNormalBox = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    materialNormalBox.diffuseTexture = new BABYLON.Texture("assets/images/decor3/wood.jpg", scene);
    materialNormalBox.diffuseTexture.uScale = 1.0;
    materialNormalBox.diffuseTexture.vScale = 1.0;
    scene.materialNormalBox = materialNormalBox;

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 50, 0), scene);
    light.intensity = 1.3

    //MESH DE FIN - Ramene au menu
    this.end = BABYLON.MeshBuilder.CreateBox("box1", { size: 250 }, scene);
    var endMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    endMaterial.alpha = 0
    this.end.material = endMaterial
    this.end.position = new BABYLON.Vector3(5100, -100, 0);
    loader = BABYLON.SceneLoader.Append('assets/model/', 'barrel.glb', scene, function (scene) {
        // do something with the scene
    })
    loader.onMeshLoaded = function (mesh) {
        mesh.position = new BABYLON.Vector3(5100, -100, 0)
        mesh.scaling = new BABYLON.Vector3(8, 8, 8)

    }

    scene.mapEngine = new MapEngine(scene, "clementArena7")
    //clementArena4
    //loic

    //Material pour normal box
    var materialPlayer = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    materialPlayer.diffuseTexture = new BABYLON.Texture("assets/images/player/player3.jpg", scene);
    materialPlayer.diffuseTexture.uScale = 1.0;
    materialPlayer.diffuseTexture.vScale = 1.0;
    scene.player.box.material = materialPlayer;
 /** DECOR************************************************* */
    if(scene.decorOn==true){
        var decor3= new Decor3(scene);} 
    /******************************************************************************************** */

    params = {"trigger":-1,"normalCubesProbability":1000,"pattern":[-1,0,1],"minWidth":3}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":400,"normalCubesProbability":800,"boostCubesProbability":850,"pattern":[-1,0,1,2],"minWidth":3,"maxWidth":0}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":1000,"normalCubesProbability":800,"boostCubesProbability":850,"pattern":[-1,0,1,2],"minWidth":2,"maxWidth":0}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":2000,"boostCubesProbability":50,"normalCubesProbability":800,"upCubesProbability":850,"upCubeSpeed":0.3,"upCubeTriggerX":15,"downCubesProbability":900,"downCubeSpeed":0.2,"downCubeTriggerX":5,"downCubeTriggerY":5,"pattern":[-2,-1,0,1,2],"minWidth":3,"maxWidth":2,"change":50}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":3000,"upCubesProbability":0,"downCubesProbability":0,"boostCubesProbability":50,"normalCubesProbability":800,"jumpCubesProbability":900,"dangerCubesProbability":1000,"pattern":[-2,-1,0,1,2],"minWidth":2,"maxWidth":2,"change":0}
    scene.mapEngine.addParamsConfiguration(params)
    params = {"trigger":5000,"normalCubesProbability":0,"boostCubesProbability":0,"upCubesProbability":0,"jumpCubesProbability":0,"downCubesProbability":0,"dangerCubesProbability":0,"pattern":[0],"minWidth":1,"maxWidth":0,"change":100}
    scene.mapEngine.addParamsConfiguration(params)


    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnEveryFrameTrigger },
        function () {
            updateMap(scene)

        }
    ));
    return this


}