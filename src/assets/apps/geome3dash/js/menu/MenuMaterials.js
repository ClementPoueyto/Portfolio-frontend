MenuMaterials = function (scene) {
    var tableauMaterials = [];

    var levelTx = [];

    levelTx[0] = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
    levelTx[0].diffuseTexture = new BABYLON.Texture("assets/images/infinite.jpg", scene);
    levelTx[0].emissiveColor = BABYLON.Color3.Blue();
    levelTx[0].diffuseTexture.uScale = 1.0;
    levelTx[0].diffuseTexture.vScale = 1.0;
    tableauMaterials.push(levelTx[0]);

    for (let i = 1; i < 4; i++) {
        // Material pour normal box

        levelTx[i] = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
        levelTx[i].diffuseTexture = new BABYLON.Texture("assets/images/menu/green.jpg", scene);
        levelTx[i].emissiveColor = BABYLON.Color3.Green();
        levelTx[i].diffuseTexture.uScale = 1.0;
        levelTx[i].diffuseTexture.vScale = 1.0;
        tableauMaterials.push(levelTx[i]);
    }
    for (let i = 4; i < 7; i++) {
        // Material pour normal box

        levelTx[i] = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
        levelTx[i].diffuseTexture = new BABYLON.Texture("assets/images/menu/brown.jpg", scene);
        levelTx[i].emissiveColor = new BABYLON.Color3(165 / 255, 42 / 255, 42 / 255);
        levelTx[i].diffuseTexture.uScale = 1.0;
        levelTx[i].diffuseTexture.vScale = 1.0;
        tableauMaterials.push(levelTx[i]);
    }
    for (let i = 7; i < 10; i++) {
        // Material pour normal box

        levelTx[i] = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
        levelTx[i].diffuseTexture = new BABYLON.Texture("assets/images/menu/blue.jpg", scene);
        levelTx[i].emissiveColor = BABYLON.Color3.Blue();
        levelTx[i].diffuseTexture.uScale = 1.0;
        levelTx[i].diffuseTexture.vScale = 1.0;
        tableauMaterials.push(levelTx[i]);
    }
    for (let i = 10; i < 13; i++) {
        // Material pour normal box

        levelTx[i] = new BABYLON.StandardMaterial("NormalBoxTexture", scene);
        levelTx[i].diffuseTexture = new BABYLON.Texture("assets/images/menu/yellow.jpg", scene);
        levelTx[i].emissiveColor = BABYLON.Color3.Yellow();
        levelTx[i].diffuseTexture.uScale = 1.0;
        levelTx[i].diffuseTexture.vScale = 1.0;
        tableauMaterials.push(levelTx[i]);
    }








    return tableauMaterials;
}