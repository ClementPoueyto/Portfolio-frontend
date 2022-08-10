/**
 * Definie la scene de jeu du menu
 * @author Clement Poueyto
 */
createMenuScene = function (engine, canvas) {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    scene.begin = false;
    scene.level = 13;
    scene.pointedLevel = 1;

    var nbLevel = 13;

    scene.decor = true;
    scene.materials = new MenuMaterials(scene);
    scene.listMesh = []
    for (let i = 0; i < nbLevel; i++) {
        addMesh(i);
    }
    updateFinishedLevels(scene);


    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //lance la procedure de chargement de niveau
    function selectLevel(mesh) {
        scene.level = mesh.id;
        updateText()
        if (mesh.position.x == camera.position.x && mesh.position.z - 10 == camera.position.z) {
            scene.begin = true
            //music.stop();

        }
        camera.position = new BABYLON.Vector3(mesh.position.x, 5, mesh.position.z - 10);
    }

    function pointerOnLevel(mesh) {
        scene.pointedLevel = mesh.id;

    }


    function showSelectedLevel(mesh, lvl) {
        if (lvl == mesh.id) {
            mesh.scaling = new BABYLON.Vector3(1.4, 1.4, 1.4);
        } else {
            mesh.scaling = new BABYLON.Vector3(1, 1, 1);
        }
    }




    //affiche un niveau
    function addMesh(id) {
        var box = BABYLON.Mesh.CreateBox(id, 1, scene);
        if (id!=0) {
            box.position = new BABYLON.Vector3(
                id * 1.5,
                -2,
                id * 0.9,
            );
        }
        else{
            box.position = new BABYLON.Vector3(
                -1.5,
                -2,
                id * 0.9,
            );
        }

        //ensemble d'observable
        box.material = new BABYLON.StandardMaterial("mat", scene);
        box.id = id;
        box.actionManager = new BABYLON.ActionManager(scene);
        box.material = scene.materials[box.id];
        box.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnPickTrigger,
                    parameter: ''
                },
                function () {
                    selectLevel(box);
                }
            )
        );
        box.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnPointerOverTrigger,
                    parameter: ''
                },
                function () {
                    pointerOnLevel(box);
                }
            )
        );

        scene.listMesh.push(box);


    };




    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.idealWidth = 1920;
    advancedTexture.idealHeight = 1080;
    advancedTexture.renderAtIdealSize = true
    //advancedTexture.isForeground = true;

    //texte : titre du jeu
    var imageTitle = new BABYLON.GUI.Image("title", "assets/images/menu/title.png");
    imageTitle.width = "1000px";
    imageTitle.height = "200px";
    imageTitle.top = -270;

    advancedTexture.addControl(imageTitle);

    //Theme du jeu
    var imageTitle2 = new BABYLON.GUI.Image("title", "assets/images/menu/title2.png");
    imageTitle2.width = "600px";
    imageTitle2.height = "100px";
    imageTitle2.top = -100;

    advancedTexture.addControl(imageTitle2);


    var image = new BABYLON.GUI.Image("but", "assets/images/menu/keyQ.png");
    image.width = "40px";
    image.height = "40px";
    image.top = 200;
    image.left = 600;
    advancedTexture.addControl(image);
    var image2 = new BABYLON.GUI.Image("but", "assets/images/menu/keyD.png");
    image2.width = "40px";
    image2.height = "40px";
    image2.top = 200;
    image2.left = 700;
    advancedTexture.addControl(image2);

    var image3 = new BABYLON.GUI.Image("but", "assets/images/menu/keySpace.png");
    image3.width = "180px";
    image3.height = "30px";

    image3.top = 250;
    image3.left = 650;
    advancedTexture.addControl(image3);

    var image4 = new BABYLON.GUI.Image("but", "assets/images/menu/keyS.png");
    image4.width = "40px";
    image4.height = "40px";
    image4.top = 200;
    image4.left = 650;
    advancedTexture.addControl(image4);



    var setting = new BABYLON.GUI.Button.CreateSimpleButton('Decor', 'Mode Performance')
    setting.width = "0.1"
    setting.height = "0.1"
    setting.color = 'black'
    setting.background = 'white'
    setting.fontSize = "25";

    setting.left = '50px'
    setting.top = '30px'
    setting.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    setting.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    setting.onPointerClickObservable.add(function () {
        if (scene.decor == true) {
            scene.decor = false;
            setting.background = 'cyan'
        }
        else {
            scene.decor = true
            setting.background = 'white'
        }
    })
    advancedTexture.addControl(setting)

    var instructionsScene = createInstructionsScene(engine, canvas);

    var instructions = new BABYLON.GUI.Button.CreateSimpleButton('Decor', 'Instructions');
    instructions.width = "0.1";
    instructions.height = "0.1";
    instructions.color = 'black';
    instructions.background = 'white';
    instructions.fontSize = "25";

    instructions.left = '50px'
    instructions.top = '-30px'
    instructions.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    instructions.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    instructions.onPointerClickObservable.add(function () {
        scene.dispose();
        instructionsScene.render();

    })
    advancedTexture.addControl(instructions)




    //

    var textDecor = [
        "Aidez le déchet à atteindre la poubelle !",
        "Aidez l'oeuf à regagner son nid !",
        "Aidez le boulet de canon à percuter le navire",
        "Rentrez le ballon de foot dans le but",
        "Niveau infini, réalisez le meilleur score !",
    ]

    var textDifficulty = [
        "Facile",
        "Moyen",
        "Dificile",
        "Expert"
    ]

    var dataBaseLevel = [
        textDecor[4] + "\nDifficulté : " + textDifficulty[3],
        "Niveau 1\n"+textDecor[0] + "\nDifficulté : " + textDifficulty[0],
        "Niveau 2\n"+textDecor[0] + "\nDifficulté : " + textDifficulty[0],
        "Niveau 3\n"+textDecor[0] + "\nDifficulté : " + textDifficulty[0],
        "Niveau 4\n"+textDecor[1] + "\nDifficulté : " + textDifficulty[1],
        "Niveau 5\n"+textDecor[1] + "\nDifficulté : " + textDifficulty[1],
        "Niveau 6\n"+textDecor[1] + "\nDifficulté : " + textDifficulty[2],
        "Niveau 7\n"+textDecor[2] + "\nDifficulté : " + textDifficulty[0],
        "Niveau 8\n"+textDecor[2] + "\nDifficulté : " + textDifficulty[1],
        "Niveau 9\n"+textDecor[2] + "\nDifficulté : " + textDifficulty[2],
        "Niveau 10\n"+textDecor[3] + "\nDifficulté : " + textDifficulty[1],
        "Niveau 11\n"+textDecor[3] + "\nDifficulté : " + textDifficulty[2],
        "Niveau 12\n"+textDecor[3] + "\nDifficulté : " + textDifficulty[3],
        "SELECTIONNER UN NIVEAU"
    ]
    var dataBaseColor = [
        "grey", "green", "green", "green", "red", "red", "red", "blue", "blue", "blue", "orange", "orange", "orange"
    ]

    var rectangle = new BABYLON.GUI.Rectangle("rect");
    rectangle.background = "grey";
    rectangle.color = "black";
    rectangle.width = "30%";
    rectangle.height = "15%";
    rectangle.top = "40%"
    advancedTexture.addControl(rectangle);
    var text1 = new BABYLON.GUI.TextBlock("text1");

    text1.fontFamily = "Helvetica";
    text1.textWrapping = true;

    text1.text = dataBaseLevel[0]
    text1.color = "white";
    text1.fontSize = "20%";
    rectangle.addControl(text1);


    function updateText() {
        text1.text = dataBaseLevel[scene.level]
        rectangle.background = dataBaseColor[scene.level]
    }

    //-------------------------KEY CONTROLL -------------------------------//

    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnEveryFrameTrigger,
            },
            function () {
                for (let i = 0; i < scene.listMesh.length; i++) {
                    showSelectedLevel(scene.listMesh[i], scene.pointedLevel);
                }
            })
    );

    function keyController(evt) {
        switch (evt.key) {
            case "q": //"Q"
            case "ArrowLeft":
                if (scene.pointedLevel > 0) {
                    scene.pointedLevel--;
                    camera.position = new BABYLON.Vector3(scene.listMesh[scene.pointedLevel].position.x, 5, scene.listMesh[scene.pointedLevel].position.z - 10);
                }
                break;
            case "d"://"D"
            case "ArrowRight":
                if (scene.pointedLevel < nbLevel - 1) {
                    scene.pointedLevel++;
                    camera.position = new BABYLON.Vector3(scene.listMesh[scene.pointedLevel].position.x, 5, scene.listMesh[scene.pointedLevel].position.z - 10);
                }
                break;
            case "Enter"://"Enter"
            case " "://"Space"
                if (scene.pointedLevel >= 0) {
                    selectLevel(scene.listMesh[scene.pointedLevel]);
                }
                break;
        }
    }

    // Quand les touches sont relachés
    window.addEventListener("keyup", keyController, false);
    updateText();


    //MUSIC

    scene.music = new BABYLON.Sound(
        "MusicMenu", "assets/sons/menu.mp3", scene, null, {
        loop: true,
        autoplay: true
    });

    return scene;
};
