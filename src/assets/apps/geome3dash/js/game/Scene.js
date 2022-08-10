/**
 * Definie la scene de jeu
 *
 */
createScene = function (engine) {

    /************************* variables initialisation ********************************** */
    var initCompt = new Date().getTime()
    var isloaded = false


    /********************* Moteur physique du jeu *********************** */
    var scene = new BABYLON.Scene(engine)
    var gravityVector = new BABYLON.Vector3(0, -165.81, 0)
    var physicsPlugin = new BABYLON.CannonJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin)
    scene.clearColor = new BABYLON.Color3(0, 0, 0)
    scene.collisionsEnabled = true
        scene.engine = engine
    /********************* Player Controller *********************** */
    var previousMove = new Date().getTime()
    var previousTorque = new Date().getTime()
    var previousAcceleration = new Date().getTime()
    var previousJump = new Date().getTime()
    var previousPlayerFrontMovement  = new Date().getTime()
    var brakePower = 70
    var brakeInterval = 800
    var jumpPower = 130
    scene.jumpPower = jumpPower
    var sideDelay = 200
    var jumpVector = new BABYLON.Vector3(0, 1, 0)
    var brakeVector = new BABYLON.Vector3(-1, 0.01, 0)
    scene.keepPosition = new BABYLON.Vector3.Zero()
    var quaternion0=new BABYLON.Quaternion(0, 0, 0, 0)
    var linear0=new BABYLON.Vector3(0, 0, 0)

    /****************************************************************** */
    var player = new Player(this)
    scene.player = player
    player.position = new BABYLON.Vector3(0, 1, 0)
    player.movingSideTicks = 0
    player.movingSide = 0
    scene.actionManager = new BABYLON.ActionManager(scene)
    scene.end = false
    var shadowY = 0
    var bestScore = 0
    var ray = null
    var hit = null

    /********************* Camera  *********************** */
    scene.camera = new BABYLON.FreeCamera('camera', player.box.position, scene);
    scene.camera.setTarget(new BABYLON.Vector3(60, -10, 0));
    var cameraAdd = 0;

    var defaultEnvironment = scene.createDefaultEnvironment({ createSkybox: false })
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.0001;


    /**************************** Material ************************************************/
    scene.upCubeColor = new BABYLON.StandardMaterial('yellow', scene)
    scene.upCubeColor.emissiveColor = new BABYLON.Color3(0.86, 0.57, 0.13);
    scene.upCubeColor.diffuseColor = new BABYLON.Color3(0.86, 0.57, 0.13);

    scene.yellowMat = new BABYLON.StandardMaterial('yellowMat', scene)
    scene.yellowMat.emissiveColor = new BABYLON.Color3(1, 1, 0)

    scene.greenMat = new BABYLON.StandardMaterial('greenMat', scene)
    scene.greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0)

    scene.blueMat = new BABYLON.StandardMaterial('blueMat', scene)

    scene.blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0.8)
    scene.blueMat.alpha = 0.03
    scene.cyanMat = new BABYLON.StandardMaterial('cyanMat', scene)
    scene.cyanMat.emissiveColor = new BABYLON.Color3(0, 1, 1)

    scene.downCubeColor = new BABYLON.StandardMaterial('green', scene)
    scene.downCubeColor.emissiveColor = new BABYLON.Color3(0.17, 0.65, 0.22);
    scene.downCubeColor.diffuseColor = new BABYLON.Color3(0.17, 0.65, 0.22);

    scene.dangerCubeColor = new BABYLON.StandardMaterial('red', scene)
    scene.dangerCubeColor.emissiveColor = new BABYLON.Color3(0.69, 0.13, 0.13);
    scene.dangerCubeColor.diffuseColor = new BABYLON.Color3.Red()

    scene.jumpCubeColor = new BABYLON.StandardMaterial('blue', scene)
    scene.jumpCubeColor.emissiveColor = new BABYLON.Color3.Blue();
    scene.jumpCubeColor.diffuseColor = new BABYLON.Color3.Blue()


    var myMaterial = new BABYLON.StandardMaterial('myMaterial', scene)
    myMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    myMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    myMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0)
    myMaterial.ambientColor = new BABYLON.Color3(0, 0, 0)

    /****************************** Platform ******************************** */

    var pointer = BABYLON.MeshBuilder.CreateSphere('pointer', { size: 3 }, scene)
    pointer.scaling.y = 0.01
    pointer.scaling.x = 0.4
    pointer.scaling.z = 0.4
    pointer.material = myMaterial

    /****************************** GUI ******************************** */
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    advancedTexture.idealWidth = 1920
    advancedTexture.idealHeight = 1080
    advancedTexture.renderAtIdealSize = true
    scene.advancedTexture=advancedTexture
    var quitButton = BABYLON.GUI.Button.CreateImageWithCenterTextButton(
        "but",
        "",
        "assets/images/arrow.png"
      );
    quitButton.width = "80px"
    quitButton.height = "80px"
    quitButton.left = '50px'
    quitButton.top = '30px'
    quitButton.background="white"
    quitButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    quitButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    quitButton.onPointerClickObservable.add(function () {
        window.location = 'index.html'
    })
    advancedTexture.addControl(quitButton)

    /************************************ Pause ***************************** */

    var stopButton = BABYLON.GUI.Button.CreateImageWithCenterTextButton(
        "but",
        "",
        "assets/images/pause_icon.png"
      );
    stopButton.width = "80px"
    stopButton.height = "80px"

    stopButton.left = '50px'
    stopButton.top = '150px'
    stopButton.background="white"
    stopButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    stopButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    stopButton.onPointerClickObservable.add(function () {
        if (scene.keepPosition.x == 0 && scene.keepPosition.y == 0 && scene.keepPosition.z == 0) {
            stopButton.children[0].source="assets/images/play_icon.png"
            player.box.physicsImpostor.sleep()
            scene.keepPosition = player.box.position
            scene.mapEngine.run = false
            scene.arena.music.pause()
        } else {
            stopButton.children[0].source="assets/images/pause_icon.png"
            previousPlayerFrontMovement = new Date().getTime()
            scene.keepPosition = new BABYLON.Vector3.Zero()
            player.box.physicsImpostor.wakeUp()
            scene.mapEngine.run = true
            scene.arena.music.play()
        }
    })
    advancedTexture.addControl(stopButton)

    // X coord player
    var score = new BABYLON.GUI.TextBlock('Score')
    score.textWrapping = true
    score.position = 'absolute'
    score.width = 0.2
    score.height = 0.1
    score.color = 'red'
    score.text = ''
    score.fontSize = '25px'
    score.right = -30
    score.top = 50
    score.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    score.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    advancedTexture.addControl(score)

    var highScore = new BABYLON.GUI.TextBlock('Highscore')
    highScore.textWrapping = true
    highScore.position = 'absolute'
    highScore.width = 0.2
    highScore.height = 0.1
    highScore.color = 'white'
    highScore.text = ''
    highScore.fontSize = '30px'
    highScore.right = -30
    highScore.top = 100
    highScore.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    highScore.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    advancedTexture.addControl(highScore)

    // X coord player
    var textPlayerX = new BABYLON.GUI.TextBlock('X')
    textPlayerX.textWrapping = true
    textPlayerX.position = 'relative'
    textPlayerX.width = '100%'
    textPlayerX.height = '100%'
    textPlayerX.color = 'red'
    textPlayerX.text = ''
    textPlayerX.fontSize = '25px'
    textPlayerX.top = 360
    textPlayerX.left = 750
    advancedTexture.addControl(textPlayerX)

    // Y coord player
    var textPlayerY = new BABYLON.GUI.TextBlock('X')
    textPlayerY.textWrapping = true
    textPlayerY.position = 'absolute'
    textPlayerY.width = '100%'
    textPlayerY.height = '100%'
    textPlayerY.color = 'red'
    textPlayerY.text = ''
    textPlayerY.fontSize = '25px'
    textPlayerY.top = 390
    textPlayerY.left = 750
    advancedTexture.addControl(textPlayerY)

    // Z coord player
    var textPlayerZ = new BABYLON.GUI.TextBlock('X')
    textPlayerZ.textWrapping = true
    textPlayerZ.position = 'absolute'
    textPlayerZ.width = '100%'
    textPlayerZ.height = '100%'
    textPlayerZ.color = 'red'
    textPlayerZ.text = ''
    textPlayerZ.fontSize = '25px'
    textPlayerZ.top = 420
    textPlayerZ.left = 750
    advancedTexture.addControl(textPlayerZ)

    var jump = 0

    /*********************************** Level ************************************************ */
    scene.createLevel = function (lvl, condition) {
        scene.decorOn = condition;
        scene.level=lvl;
        switch (lvl) {
            case 0:
                scene.arena = new Infinite(scene)
                break
            case 1:
                scene.arena = new Arena1(scene)
                break
            case 2:
                scene.arena = new Arena2(scene)
                break
            case 3:
                scene.arena = new Arena3(scene)
                break
            case 4:
                scene.arena = new Arena4(scene)
                break
            case 5:
                scene.arena = new Arena5(scene)
                break
            case 6:
                scene.arena = new Arena6(scene)
                break
            case 7:
                scene.arena = new Arena7(scene)
                break
            case 8:
                scene.arena = new Arena8(scene)
                break
            case 9:
                scene.arena = new Arena9(scene)
                break
            case 10:
                scene.arena = new Arena10(scene)
                break
            case 11:
                scene.arena = new Arena11(scene)
                break
            case 12:
                scene.arena = new Arena12(scene)
                break
        }
        scene.arena.levelId = lvl
        onLoad()
        initCompt = new Date().getTime()

        return scene.arena
    }

    var respawn = function () {
        resetMovementPlayer()
        player.box.position = scene.arena.spawn
        scene.mapEngine.resetMap()

    }

    var end = function () {
        markFinishedLevel(scene.arena.levelId, scene)
        resetMovementPlayer()
        scene.keepPosition = player.box.position
        player.box.physicsImpostor.sleep()
        scene.end = true
    }

    /****************************Control Multiple Keys************************************************/

    var map = {} //object for multiple key presses
    let container = document.createElement('div')
    let butns = document.createElement('div')
    container.appendChild(butns)
    butns.id = 'btns'
    document.querySelector('body').appendChild(container)

    function MobileButton() {
        let container = document.createElement('div')
        container.classList.add('pause_container')
        let btn = document.createElement('div')
        btn.classList.add('right')
        let img = document.createElement('img')
        img.src = 'assets/controller/pico-pause.png'
        btn.appendChild(img)
        btn.addEventListener('touchstart', (e) => {

            e.preventDefault()
            map['d'] = true
            setTimeout(() => {
                map['d'] = false
            }, 100)
        })
        container.appendChild(btn)
        butns.appendChild(container)

        btn = document.createElement('div')
        btn.classList.add('left')
        img = document.createElement('img')
        img.src = 'assets/controller/pico-pause.png'
        btn.appendChild(img)
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault()
            map['q'] = true
            setTimeout(() => {
                map['q'] = false
            }, 100)
        })
        container.appendChild(btn)
        butns.appendChild(container)

        btn = document.createElement('div')
        btn.classList.add('pause')
        img = document.createElement('img')
        img.src = 'assets/controller/pico-pause.png'
        btn.appendChild(img)
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault()
            map[' '] = true
            setTimeout(() => {
                map[' '] = false
            }, 100)
        })
        container.appendChild(btn)
        butns.appendChild(container)
    }

    MobileButton()

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown'

        if (map['l']) {
            toggleFullscreen(evt);
        }
        //console.log(map);

    }))

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown'
    }))

    /********************** Player and camera Update  ****************************************** */

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnEveryFrameTrigger,
            },
            function () {
                loading()
                if (scene.keepPosition.x == 0 && scene.keepPosition.y == 0 && scene.keepPosition.z == 0) {

                    player.box.physicsImpostor.setAngularVelocity(quaternion0)
                    player.box.position.x += scene.arena.speed*min(150,(new Date().getTime() -previousPlayerFrontMovement))*0.05;
                    previousPlayerFrontMovement = new Date().getTime()
                    if (player.hasJump) {
                        cameraAdd += 0.2;
                        cameraAdd = Math.min(cameraAdd, 15);
                    } else {
                        cameraAdd -= 0.3;
                        cameraAdd = Math.max(cameraAdd, 0);
                    }
                    if (scene.level!==0 && player.box.position.y + 20 * scene.mapEngine.cubeWidth < scene.mapEngine.playerGameY + 160)
                        respawn()
                    if (scene.level===0 && player.box.position.y + 80 * scene.mapEngine.cubeWidth < scene.mapEngine.playerGameY + 160)
                        respawn()

                    scene.camera.position.x = player.box.position.x - 160 - cameraAdd;
                    scene.camera.position.y += (player.box.position.y - scene.camera.position.y + cameraAdd + 65) * 0.1
                    scene.camera.position.z = player.box.position.z * 1.1
                    //scene.camera.parent = player.box;



                    if (player.box.position.y >= 4 || scene.arena.end.position.x === 0) {
                        actualScore = scene.arena.end.position.x === 0 ? Math.floor(player.box.position.x) : min(scene.arena.end.position.x, Math.floor(player.box.position.x))
                        score.text = 'Score: ' + actualScore
                        if (actualScore > bestScore) {
                            bestScore = actualScore
                            highScore.color = 'red'
                        } else {
                            highScore.color = 'white'
                        }
                        setCookie('highscore' + scene.arena.levelId, bestScore, 100 * 365)
                        highScore.text = 'Highscore: ' + bestScore
                    }
                     textPlayerX.text = 'x: ' + Math.floor(player.box.position.x)
                    textPlayerY.text = 'y: ' + Math.floor(player.box.position.y)
                    textPlayerZ.text = 'z: ' + Math.floor(player.box.position.z)


                    var vec = new BABYLON.Vector3(player.box.position.x, player.box.position.y - 3, player.box.position.z)
                    ray = new BABYLON.Ray(vec, new BABYLON.Vector3(0, -1, 0), 20 * scene.mapEngine.cubeWidth)
                    hit = scene.pickWithRay(ray)
                    if (hit.pickedMesh) {
                        shadowY = hit.pickedMesh.position.y
                    }


                    if (player.box.position.y > shadowY + 12) {
                        pointer.position.x = player.box.position.x + (player.box.position.y - shadowY) * scene.arena.speed * 0.28
                        pointer.position.y = shadowY + 6
                        pointer.position.z = player.box.position.z
                        pointer.scaling.x = min(2, 0.4 * (player.box.position.y - shadowY) /  scene.mapEngine.cubeWidth + 0.4)
                        pointer.scaling.z = min(2, 0.4 * (player.box.position.y - shadowY) /  scene.mapEngine.cubeWidth + 0.4)
                    } else {
                        pointer.position.y += 500
                    }
                } else {

                    player.box.position = scene.keepPosition

                }
            })
    )

    function resetMovementPlayer() {
        player.box.physicsImpostor.setAngularVelocity(quaternion0)
        player.box.physicsImpostor.setLinearVelocity(linear0)
    }


    /**
     * Player action control:
     *  ->brake
     *  ->jump
     *  ->right
     *  ->left
     */
    scene.registerAfterRender(function () {

        /***** Transition on player shift (moving) *****/
        let scale = 13
        if (player.movingSideTicks <= 0) {
            player.movingSide = 0
            player.box.position.z = Math.round(player.box.position.z / scene.mapEngine.cubeWidth) *  scene.mapEngine.cubeWidth
        } else {
            player.box.position.z += player.movingSide * 2
            player.movingSideTicks -= 2
        }

        /***** Shift (moving) *****/
        if (new Date().getTime() - previousMove > sideDelay) {
            if ((map['q'] || map['Q'])) {
                player.movingSide = +1
                player.movingSideTicks = scale
                previousMove = new Date().getTime()

            }


            if ((map['d'] || map['D'])) {
                player.movingSide = -1
                player.movingSideTicks = scale
                previousMove = new Date().getTime()

            }


            if ((map['s'] || map['S']) && new Date().getTime() - previousTorque > brakeInterval) {
                var contactLocalRefPoint = BABYLON.Vector3.Zero()
                player.box.physicsImpostor.applyImpulse(brakeVector.scale(brakePower),
                    player.box.getAbsolutePosition().add(contactLocalRefPoint))
                previousTorque = new Date().getTime()

            }


            if ((map['z'] || map['Z'])) {
                // player.box.position.x += scale;
                // previousMove = new Date().getTime();
            }


            if (player.hasJump == false && (map[' ']) && new Date().getTime() - previousJump > 300) {
                var contactLocalRefPoint = BABYLON.Vector3.Zero()
                previousJump = new Date().getTime()
                jump = player.box.position.x
                var forceDirection = new BABYLON.Vector3(0, 0.9, 0)
                var contactLocalRefPoint = BABYLON.Vector3.Zero()
                scene.player.box.physicsImpostor.applyImpulse(forceDirection.scale(scene.jumpPower),
                    scene.player.box.getAbsolutePosition().add(contactLocalRefPoint))
                player.hasJump = true
            }

        }

    })


    /********************** Loading   ****************************************** */



    function loading() {
        if (isloaded == false) {
            let timeWaiting = 4000
            if (new Date().getTime() - initCompt < timeWaiting) {
                player.box.physicsImpostor.sleep()
                scene.keepPosition = scene.arena.spawn
                scene.mapEngine.run = false
                if (document.getElementById("customLoadingScreenDiv")) {
                    return;
                }
                this._loadingDiv = document.createElement("div");
                this._loadingDiv.id = "customLoadingScreenDiv";
                this._loadingDiv.innerHTML = '<div id="babylonjsLoadingDiv" style="opacity: 1; transition: opacity 1.5s ease 0s; pointer-events: none; position: absolute; left: 0px; top: 0px; width: 100vw; height: 100vh; background-color: black;"><div style="position: absolute; left: 0px; top: 50%; margin-top: 80px; width: 100%; height: 20px; font-family: Arial; font-size: 14px; color: white; text-align: center;"></div><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAuMTcgMjA4LjA0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6I2UwNjg0Yjt9LmNscy0ze2ZpbGw6I2JiNDY0Yjt9LmNscy00e2ZpbGw6I2UwZGVkODt9LmNscy01e2ZpbGw6I2Q1ZDJjYTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkJhYnlsb25Mb2dvPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iUGFnZV9FbGVtZW50cyIgZGF0YS1uYW1lPSJQYWdlIEVsZW1lbnRzIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05MC4wOSwwLDAsNTJWMTU2bDkwLjA5LDUyLDkwLjA4LTUyVjUyWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxODAuMTcgNTIuMDEgMTUxLjk3IDM1LjczIDEyNC44NSA1MS4zOSAxNTMuMDUgNjcuNjcgMTgwLjE3IDUyLjAxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjI3LjEyIDY3LjY3IDExNy4yMSAxNS42NiA5MC4wOCAwIDAgNTIuMDEgMjcuMTIgNjcuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iNjEuODkgMTIwLjMgOTAuMDggMTM2LjU4IDExOC4yOCAxMjAuMyA5MC4wOCAxMDQuMDIgNjEuODkgMTIwLjMiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iMTUzLjA1IDY3LjY3IDE1My4wNSAxNDAuMzcgOTAuMDggMTc2LjcyIDI3LjEyIDE0MC4zNyAyNy4xMiA2Ny42NyAwIDUyLjAxIDAgMTU2LjAzIDkwLjA4IDIwOC4wNCAxODAuMTcgMTU2LjAzIDE4MC4xNyA1Mi4wMSAxNTMuMDUgNjcuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTAuMDggNzEuNDYgNjEuODkgODcuNzQgNjEuODkgMTIwLjMgOTAuMDggMTA0LjAyIDExOC4yOCAxMjAuMyAxMTguMjggODcuNzQgOTAuMDggNzEuNDYiLz48cG9seWdvbiBjbGFzcz0iY2xzLTQiIHBvaW50cz0iMTUzLjA1IDY3LjY3IDExOC4yOCA4Ny43NCAxMTguMjggMTIwLjMgOTAuMDggMTM2LjU4IDkwLjA4IDE3Ni43MiAxNTMuMDUgMTQwLjM3IDE1My4wNSA2Ny42NyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSIyNy4xMiA2Ny42NyA2MS44OSA4Ny43NCA2MS44OSAxMjAuMyA5MC4wOCAxMzYuNTggOTAuMDggMTc2LjcyIDI3LjEyIDE0MC4zNyAyNy4xMiA2Ny42NyIvPjwvZz48L2c+PC9zdmc+" style="position: absolute; left: 50%; top: 50%; width: 10vw; height: 10vw; margin-left: -5vw; margin-top: -5vw;"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzOTIgMzkyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2UwNjg0Yjt9LmNscy0ye2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlNwaW5uZXJJY29uPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iU3Bpbm5lciI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDAuMjEsMTI2LjQzYzMuNy03LjMxLDcuNjctMTQuNDQsMTItMjEuMzJsMy4zNi01LjEsMy41Mi01YzEuMjMtMS42MywyLjQxLTMuMjksMy42NS00LjkxczIuNTMtMy4yMSwzLjgyLTQuNzlBMTg1LjIsMTg1LjIsMCwwLDEsODMuNCw2Ny40M2EyMDgsMjA4LDAsMCwxLDE5LTE1LjY2YzMuMzUtMi40MSw2Ljc0LTQuNzgsMTAuMjUtN3M3LjExLTQuMjgsMTAuNzUtNi4zMmM3LjI5LTQsMTQuNzMtOCwyMi41My0xMS40OSwzLjktMS43Miw3Ljg4LTMuMywxMi00LjY0YTEwNC4yMiwxMDQuMjIsMCwwLDEsMTIuNDQtMy4yMyw2Mi40NCw2Mi40NCwwLDAsMSwxMi43OC0xLjM5QTI1LjkyLDI1LjkyLDAsMCwxLDE5NiwyMS40NGE2LjU1LDYuNTUsMCwwLDEsMi4wNSw5LDYuNjYsNi42NiwwLDAsMS0xLjY0LDEuNzhsLS40MS4yOWEyMi4wNywyMi4wNywwLDAsMS01Ljc4LDMsMzAuNDIsMzAuNDIsMCwwLDEtNS42NywxLjYyLDM3LjgyLDM3LjgyLDAsMCwxLTUuNjkuNzFjLTEsMC0xLjkuMTgtMi44NS4yNmwtMi44NS4yNHEtNS43Mi41MS0xMS40OCwxLjFjLTMuODQuNC03LjcxLjgyLTExLjU4LDEuNGExMTIuMzQsMTEyLjM0LDAsMCwwLTIyLjk0LDUuNjFjLTMuNzIsMS4zNS03LjM0LDMtMTAuOTQsNC42NHMtNy4xNCwzLjUxLTEwLjYsNS41MUExNTEuNiwxNTEuNiwwLDAsMCw2OC41Niw4N0M2Ny4yMyw4OC40OCw2Niw5MCw2NC42NCw5MS41NnMtMi41MSwzLjE1LTMuNzUsNC43M2wtMy41NCw0LjljLTEuMTMsMS42Ni0yLjIzLDMuMzUtMy4zMyw1YTEyNywxMjcsMCwwLDAtMTAuOTMsMjEuNDksMS41OCwxLjU4LDAsMSwxLTMtMS4xNVM0MC4xOSwxMjYuNDcsNDAuMjEsMTI2LjQzWiIvPjxyZWN0IGNsYXNzPSJjbHMtMiIgd2lkdGg9IjM5MiIgaGVpZ2h0PSIzOTIiLz48L2c+PC9nPjwvc3ZnPg==" style="position: absolute; left: 50%; top: 50%; width: 18vw; height: 18vw; margin-left: -9vw; margin-top: -9vw; animation: 0.75s linear 0s infinite normal none running spin1; transform-origin: 50% 50%;"></div>'
                document.body.insertBefore(this._loadingDiv,document.getElementById("renderCanvas"));

            } else {
                player.box.physicsImpostor.wakeUp()
                scene.keepPosition = new BABYLON.Vector3.Zero()
                scene.mapEngine.run = true
                isloaded = true
                document.getElementById("customLoadingScreenDiv").style.display = "none";
            }
        }
    }


;



    //Ensemble des actions a execute une fois le niveau charge
    function onLoad() {

        var scoreCookie = getCookie('highscore' + scene.arena.levelId)

        bestScore = scoreCookie == '' ? 0 : scoreCookie

        player.box.position = scene.arena.spawn
        player.box.actionManager = new BABYLON.ActionManager(scene)

        // Intersections, si le joueur franchit la fin du niveau revient au menu
        player.box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: scene.arena.end },
            function () { end() }
        ))

    }

    return scene

}

function markFinishedLevel(levelId, scene) {
    setCookie('finished' + levelId, 1, 100 * 365)
    updateFinishedLevels(scene)
}

function updateFinishedLevels(scene) {
    for (let i = 0; i < scene.materials.length; i++) {
        if (getCookie('finished' + i) == 1 || i==0) {
            if (scene.listMesh != null) {
                let gl = new BABYLON.GlowLayer("glow", scene);
                gl.addIncludedOnlyMesh(scene.listMesh[i]);
                gl.intensity = 0.45
            }

        }
    }

}

function getCookie(cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

/**
 * Toggle fullscreen function who work with webkit and firefox.
 * @function toggleFullscreen
 * @param {Object} event
 */
function toggleFullscreen(event) {
    var element = document.body;

    if (event instanceof HTMLElement) {
        element = event;
    }

    var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };

    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}
