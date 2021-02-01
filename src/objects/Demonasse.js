class Demonasse extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "demonasse");

        this.body.allowGravity=true;

        this.setOrigin(0,20);
        this.setDisplaySize(80,80);
        this.setCollideWorldBounds(true);
        this.setBounceX(1);
        this.setGravityY(2000);
        this.setVelocityX(300);

        //scene.physics.add.collider(this, scene.platforms)
        //scene.physics.add.collider(this, scene.walls)
        }
    }
