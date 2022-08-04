/**
 * Rassemble les differentes scenes et les fait tourner
 * @author Clement Poueyto
 */
Game = function (canvasId) {

    // Canvas et engine défini ici
    var canvas = document.getElementById(canvasId)
    var engine = new BABYLON.Engine(canvas, true)
    // On initie la scène avec une fonction associé à l'objet Game
    var scene = new createScene(engine)
    this.scene = scene

    // on initie le menu de jeu pour selectionner le niveau
    var menu = new createMenuScene(engine, canvasId)

    var loaded = false


    var options = new BABYLON.SceneOptimizerOptions(60, 2000)
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1))

    // Permet au jeu de tourner en boucle
    engine.runRenderLoop(function () {
        if (loaded == false && menu.begin == true && menu.level != -1) {
            scene.createLevel(menu.level, menu.decor)//charge le niveau correspondant au level
            loaded = true // le niveau a été chargé
            menu.dispose()
        }
        display(scene)
        var fpsLabel = document.getElementById('fpsLabel')
        fpsLabel.innerHTML = engine.getFps().toFixed() + ' fps'
    })

    // Ajuste la vue 3D si la fenetre est agrandie ou diminuée
    window.addEventListener('resize', function () {
        if (engine) {
            engine.resize()
        }
    }, false)

    //selectionne l'affichage du menu ou du niveau
    function display (scene) {
        if (menu.begin == true) {
            scene.render()
            if (scene.end == true) {
                /*loaded=false; //doit charger un niveau
                menu.begin=false; //doit ramener sur le menu
                scene.end=false; // doit quitter la scene de jeu
                menu=new createMenuScene(engine,canvasId);*/
                window.location = 'index.html'
                return
            }
        } else {
            menu.render()
        }
    }

}
// Page entièrement chargé, on lance le jeu
document.addEventListener('DOMContentLoaded', function () {
    new Game('renderCanvas')
}, false)
