var Infinite = function (game) {

    var player = game.player


    // Appel des variables nécéssaires
    this.game = game;
    var scene = game;
    var engine = scene.engine
    //position d'apparition du joueur dans le niveau;
    this.spawn = new BABYLON.Vector3(0, 100 * 1, 0);
    //Vitesse du joueur dans le niveau
    this.speed = 5;
    var music2 = new BABYLON.Sound(
        "Music", "assets/sons/music.mp3", scene, null, {
        loop: true,
        autoplay: true
    }
    )
    this.music = music2;
    scene.jumpPower = 200


    /****************************** Particle******************************** */
    if(scene.decorOn==true){
    
        var particleSystem = new BABYLON.ParticleSystem("laser", 10000, scene);
        particleSystem.particleTexture = new BABYLON.Texture("assets/images/flare.png", scene);
        particleSystem.emitter = player.box;
        particleSystem.emitRate = 3000;
        particleSystem.maxEmitBox = new BABYLON.Vector3(-1, 0, 0);
        particleSystem.minLifeTime = 0.1;
        particleSystem.maxLifeTime = 1;
        particleSystem.minSize = 0.2;
        particleSystem.maxSize = 1.1
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, -2, -2);
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 2, 2);;
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.3, 0.0, 1);
        particleSystem.color2 = new BABYLON.Color4(199/255, 63/255, 252/255, 0.0);
        particleSystem.colorDead = new BABYLON.Color4(1, 0, 0.2, 0.0);
        particleSystem.minEmitPower = 0.1;
        particleSystem.maxEmitPower = 8;
        particleSystem.updateSpeed = 0.01;
        particleSystem.start();
    }

    scene.mapEngine = new MapEngine(scene, "Infinite Level")
    this.end = BABYLON.MeshBuilder.CreateBox("box1", { size: 0 }, scene);
    this.end.position = new BABYLON.Vector3(0,0,0);


    //Material pour normal box
    var materialPlayer = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    materialPlayer.diffuseTexture = new BABYLON.Texture("assets/images/player/player0.jpg", scene);
    materialPlayer.diffuseTexture.uScale = 1.0;
    materialPlayer.diffuseTexture.vScale = 1.0;
    scene.player.box.material = materialPlayer;

    var pattern_params = [
        { "normalCubesProbability": 800, "pattern": [-1, 0, 1], "minWidth": 3, "maxWidth": 0,"angle":0 },
        { "normalCubesProbability": 800, "pattern": [-1, 0, 1], "minWidth": 2, "maxWidth": 2,"angle":0},
        { "normalCubesProbability": 500, "pattern": [-1, 0, 1], "minWidth": 2, "maxWidth": 0,"angle":0},
        { "normalCubesProbability": 800, "pattern": [-1, 0, 1], "minWidth": 2, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 1000, "pattern": [-1, 0, 1], "minWidth": 1, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 500, "pattern": [-1, 0, 1], "minWidth": 2, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [0, 1], "minWidth": 2, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [-1, 0], "minWidth": 2, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [0], "minWidth": 1, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [-2, -1, 0, 1], "minWidth": 3, "maxWidth": 0,"angle":0 },
        { "normalCubesProbability": 700, "pattern": [-2, -1, 0, 1, 2], "minWidth": 3, "maxWidth": 2 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [-2, -1, 0, 1], "minWidth": 3, "maxWidth": 0,"angle":0 },
        { "normalCubesProbability": 700, "pattern": [-2, -1, 0, 1, 2], "minWidth": 3, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [-1, 0, 1, 2], "minWidth": 3, "maxWidth": 0 ,"angle":0},
        { "normalCubesProbability": 800, "pattern": [-1, 0, 1, 2], "minWidth": 4, "maxWidth": 0 ,"angle":0},

    ]

    var edit_params = { "boostCubesProbability": 10, "dangerCubesProbability": 30, "superJumpCubesProbability": 8, "jumpCubesProbability": 20, "heightDifferenceDownProbability": 100, "heightDifferenceUpProbability": 5, "downCubesProbability": 30, "upCubesProbability": 3, "angle": 0, "change": 50 }
    var edit_paramsA = [ "boostCubesProbability", "dangerCubesProbability", "superJumpCubesProbability", "jumpCubesProbability", "heightDifferenceDownProbability", "heightDifferenceUpProbability", "downCubesProbability", "upCubesProbability", "angle", "change"]
    var probabilityA = ["boostCubesProbability", "dangerCubesProbability", "superJumpCubesProbability", "jumpCubesProbability", "heightDifferenceDownProbability", "heightDifferenceUpProbability", "downCubesProbability", "upCubesProbability"]

    function take(array){
        return array[Math.floor(Math.random()*array.length)]
    }
    function copy(src) {
        return Object.assign({}, src);
      }

    function generate_params(scene) {
        params = { "trigger": -1, "normalCubesProbability": 1000, "pattern": [-1, 0, 1], "minWidth": 3, "maxWidth": 0,"trigger": -1, "jumpCubesPower": 180, "superJumpCubesPower": 240, "boostPower": 180, "maxUpCubeSpeed": 3, "downCubeSpeed": 0.5, "upCubeTriggerX": 30, "downCubeTriggerX": 20 }
        trigger = -1
        scene.mapEngine.addParamsConfiguration(params)
        for (index = 0; index < 50; index++) {
            params = copy(pattern_params[Math.floor(Math.random() * pattern_params.length)])
            trigger += Math.floor(Math.random() * 800 + 400)
            params["trigger"] = trigger
            params["normalCubesProbability"] += Math.floor((2 * Math.random() - 1) * 100)
            current =  params["normalCubesProbability"]
            n = Math.floor(Math.random() * 4) + 2
            for (i = 0; i < n; i++) {
                para = take(edit_paramsA)
                v = Math.max(Math.floor(edit_params[para]*(3*Math.random()-1))+ edit_params[para],0)+1
                if(probabilityA.includes(para) ){
                    v+=current
                    current = v
                }
                if(para == "angle"){
                    v = (2*Math.random()-1)*2
                }
                params[para] = v

            }
            scene.mapEngine.addParamsConfiguration(params)
        }
    }

    generate_params(scene)

    var size = new BABYLON.Vector3(13, 13, 13)
    var box = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
    box.position = new BABYLON.Vector3(300, 20, 30)
    box.scaling = size
    let instanceCount = 600;
    let colorData = new Float32Array(4 * instanceCount);

    for (var index = 0; index < instanceCount; index++) {
        colorData[index * 4] = Math.random();
        colorData[index * 4 + 1] = Math.random();
        colorData[index * 4 + 2] = Math.random();
        colorData[index * 4 + 3] = 1.0;
    }

    var buffer = new BABYLON.VertexBuffer(engine, colorData, BABYLON.VertexBuffer.ColorKind, false, false, 4, true);
    box.setVerticesBuffer(buffer);
    box.material = new BABYLON.StandardMaterial("material", scene);
    box.material.disableLighting = true;
    box.material.emissiveColor = BABYLON.Color3.White();


    let gl1 = new BABYLON.GlowLayer("glow", scene);
    gl1.addIncludedOnlyMesh(box)
    gl1.intensity = 1


    var around = []
    for (var index = 0; index < 30 - 1; index++) {
        let instance = box.createInstance("box" + index);
        instance.position.x = Math.random() * 4000;
        instance.position.y = (2 * Math.random() - 1) * 500;
        instance.position.z = (2 * Math.random() - 1) * 500;
        instance.scaling = size
        around.push(instance)


    }
    var far = []
    for (var index = 0; index < instanceCount - 1; index++) {
        let instance = box.createInstance("box" + index);
        instance.position.x = Math.random() * 15000;
        instance.position.y = (2.8 * Math.random() - 2) * 2000;
        instance.position.z = (2 * Math.random() - 1) * 4000;
        instance.scaling = size
        far.push(instance)

    }
    var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0.2, -1, 0), scene);




    var count = 0

    function updateAround() {
        for (index = 0; index < Math.floor(around.length / 1); index++) {
            take = Math.floor(Math.random() * around.length)
            if (around[take].position.x < scene.player.box.position.x) {
                around[take].position.x += Math.random() * 4000
                around[take].position.y = (2 * Math.random() - 1) * 500 + scene.player.box.position.y
                around[take].position.z = (2 * Math.random() - 1) * 500 + scene.player.box.position.z
            }
        }
    }

    function updateFar() {
        for (index = 0; index < Math.floor(far.length / 25); index++) {
            take = Math.floor(Math.random() * far.length)
            if (far[take].position.x < scene.player.box.position.x) {
                far[take].position.x += Math.random() * 15000
                far[take].position.y = (2.8 * Math.random() - 2) * 2000 + scene.player.box.position.y
                far[take].position.z = (2 * Math.random() - 1) * 4000 + scene.player.box.position.z
            }
        }
    }


    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnEveryFrameTrigger },
        function () {
            updateMap(scene)
            count += 1
            if (count % 120 == 0) {
                updateAround()
            }
            if (count % 240 == 0) {
               updateFar()
            }if(count%500==0){
                light.intensity = Math.min(Math.random()+0.05,0.4)
            }
        
            



        }
    ));





    return this
}
