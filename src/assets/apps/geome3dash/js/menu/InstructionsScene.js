/**
 * Menu d'instructions
 */
createInstructionsScene = function (engine, canvas) {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine)

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -20), scene)

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero())
    scene.begin = false
    // This attaches the camera to the canvas
    //camera.attachControl(canvas, true);
    scene.level = -1
    scene.pointedLevel = -1

    engine.resize()

    window.addEventListener('resize', function(){ engine.resize(); });

    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    advancedTexture.idealWidth = 1920
    advancedTexture.idealHeight = 1080
    // advancedTexture.renderAtIdealSize = true
    var quitButton = BABYLON.GUI.Button.CreateImageWithCenterTextButton(
        'but',
        '',
        'assets/images/arrow.png'
    )
    quitButton.width = '80px'
    quitButton.height = '80px'
    quitButton.left = '50px'
    quitButton.top = '30px'
    quitButton.background = 'white'
    quitButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    quitButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    quitButton.onPointerClickObservable.add(function () {
        window.location = 'index.html'
    })
    advancedTexture.addControl(quitButton)

    var instructionsTexture = BABYLON.GUI.Button.CreateImageWithCenterTextButton(
        'but',
        '',
        'assets/images/menu/instructions.png'
    )
    instructionsTexture.width = "1129px";
    instructionsTexture.height = "766px";
    instructionsTexture.stretch = BABYLON.GUI.Image.STRETCH_NONE;
    instructionsTexture.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    instructionsTexture.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    advancedTexture.addControl(instructionsTexture)

    scene.upCubeColor = new BABYLON.StandardMaterial('yellow', scene)
    scene.upCubeColor.emissiveColor = new BABYLON.Color3(0.86, 0.57, 0.13)
    scene.upCubeColor.diffuseColor = new BABYLON.Color3(0.86, 0.57, 0.13)

    scene.yellowMat = new BABYLON.StandardMaterial('yellowMat', scene)
    scene.yellowMat.emissiveColor = new BABYLON.Color3(1, 1, 0)

    scene.greenMat = new BABYLON.StandardMaterial('greenMat', scene)
    scene.greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0)

    scene.blueMat = new BABYLON.StandardMaterial('blueMat', scene)

    //scene.blueMat.diffuseTexture = new BABYLON.Texture("assets/images/Portal-PNG-Free-Image.png", scene);
    scene.blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0.8)
    scene.blueMat.alpha = 0.03
    scene.cyanMat = new BABYLON.StandardMaterial('cyanMat', scene)
    scene.cyanMat.emissiveColor = new BABYLON.Color3(0, 1, 1)

    scene.downCubeColor = new BABYLON.StandardMaterial('green', scene)
    scene.downCubeColor.emissiveColor = new BABYLON.Color3(0.17, 0.65, 0.22)
    scene.downCubeColor.diffuseColor = new BABYLON.Color3(0.17, 0.65, 0.22)

    scene.dangerCubeColor = new BABYLON.StandardMaterial('red', scene)
    scene.dangerCubeColor.emissiveColor = new BABYLON.Color3(0.69, 0.13, 0.13)
    scene.dangerCubeColor.diffuseColor = new BABYLON.Color3.Red()

    scene.jumpCubeColor = new BABYLON.StandardMaterial('blue', scene)
    scene.jumpCubeColor.emissiveColor = new BABYLON.Color3.Blue()
    scene.jumpCubeColor.diffuseColor = new BABYLON.Color3.Blue()

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 2, -10), scene)

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.4

    //lance la procedure de chargement de niveau


    // var particlesBox = BABYLON.MeshBuilder.CreateSphere("normalBox", { size: 3 }, scene);
    //
    // particlesBox.material = scene.cyanMat
    // var particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);
    // particleSystem.particleTexture = new BABYLON.Texture("assets/images/flare.png", scene);
    // var radius = 0.5;
    // var angle = Math.PI / 4;
    // particlesBox.rotate(BABYLON.Axis.Z, 0, BABYLON.Space.WORLD);
    // var sphereEmitter = particleSystem.createSphereEmitter(0.2);
    // particleSystem.emitter = particlesBox;
    // particlesBox.rotation.z = -300
    // particleSystem.color2 = new BABYLON.Color4(0.2, 0.8, 0.2, 1);
    // particleSystem.color1 = new BABYLON.Color4(0.2, 0.8, 0.2, 1);
    // particleSystem.colorDead = new BABYLON.Color4(0.2, 0.8, 0.2, 1);
    // particleSystem.gravity = new BABYLON.Vector3(-20, 15, 0);
    // // Size of each particle (random between...
    // particleSystem.minSize = 0.1;
    // particleSystem.maxSize = 0.8;
    // // Life time of each particle (random between...
    // particleSystem.minLifeTime = 0.1;
    // particleSystem.maxLifeTime = 0.12;
    // // Emission rate
    // particleSystem.emitRate = 2000;
    // // Speed
    // particleSystem.minEmitPower = 0.3;
    // particleSystem.maxEmitPower = 4;
    // particleSystem.updateSpeed = 0.008;
    // particleSystem.start();
    //
    // scene.cyanMat = particlesBox;


    var instructions = [
        [scene.dangerCubeColor, 'Les dalles rouges vous font perdre la partie dès lors que vous passez dessus... Un conseil : évitez les !'],
        [scene.cyanMat, 'Si vous cherchez un peu de vitesse, passez sur les les particules cyan ! Boost garanti !'],
        [scene.jumpCubeColor, 'Pouf ! Passez sur une dalle bleue et vous serez propulsé à l\'infini ! Attention à l\'atterissage !'],
        [scene.greenMat, 'Ces dalles se retirent de la plateforme à votre passage ! Ne comptez pas sur elles...'],
        [scene.yellowMat, 'Ces dalles s\'élèvent à votre approche ; elles constituent un deuxième niveau de plateforme dont il faut profiter !'],
    ]



    // var pos = 0;
    // for (let i = 0; i < instructions.length; i++) {
    //     createEntry(pos, instructions[i][0], instructions[i][1], i);
    //     pos++;
    // }

    function createText (pos, text) {
        var rectangle = new BABYLON.GUI.Rectangle('rect')
        rectangle.background = 'grey'
        rectangle.color = 'black'
        rectangle.width = '50%'
        rectangle.height = '15%'
        rectangle.left = pos.x
        rectangle.top = pos.z
        advancedTexture.addControl(rectangle)
        var text1 = new BABYLON.GUI.TextBlock('text1')

        text1.fontFamily = 'Helvetica'
        text1.textWrapping = true

        text1.text = text + ''
        text1.color = 'white'
        text1.fontSize = '20%'
        rectangle.addControl(text1)
    }

    function createEntry (pos, color, text, i) {
        createBox(new BABYLON.Vector3(-10, -pos * 2.9 + 5.3, 0), color)
        createText(new BABYLON.Vector3(30, -2, -275 + pos * 150), text)
    }

    function createBox (position, color, i) {
        if(i == 1){
            var mainBox = scene.cyanMat
        }else{
            var mainBox = BABYLON.MeshBuilder.CreateBox('normalBox', { size: 3 }, scene)
            mainBox.material = color
        }

        mainBox.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
        mainBox.name = 'box'
        mainBox.position = position


        return mainBox
    }

    //-------------------------KEY CONTROLL -------------------------------//

    scene.actionManager = new BABYLON.ActionManager(scene)

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnEveryFrameTrigger,
            },
            function () {
                // for (let i = 0; i < scene.listMesh.length; i++) {
                //     showSelectedLevel(scene.listMesh[i], scene.pointedLevel);
                // }
            })
    )

    return scene
}
