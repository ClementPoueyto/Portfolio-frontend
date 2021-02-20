/**
 * Description du joueur
 * @author Clement Poueyto
 */
class Player {

    constructor(game,skin){
        // La scène du jeu
        this.scene = game.scene;
        this.size= 5;  
        this.hasJump=false; //saut en continu
        this.animation=false;//saut à l'infini
        // On crée le joueur
        this.box = BABYLON.Mesh.CreateSphere("redbox",16,4, this.scene);
        

        this.box.position = new BABYLON.Vector3(0,((this.size/2)*this.box.scaling.y+10),-5);

        //activation de la physique du joueur
        this.box.checkCollisions=true;
        this.box.physicsImpostor = new BABYLON.PhysicsImpostor(this.box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, this.scene);
        this.box.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.box.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 0, 0, 0));


    }

    

};



Player.prototype = {

};