class Tableau08 extends Tableau{

    preload() {
        super.preload();
        this.load.image('demonasse', 'assets/demonasse.png');
        this.load.image('chapotasse', 'assets/chapotasse.png');
        this.load.image('star', 'assets/bonus.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('b1', 'assets/background1.png');
        this.load.image('b3', 'assets/background3.png');
        this.load.image('b2', 'assets/background2.png');
    }   
    create() {
        super.create();
        console.log("Tmor");

        

        
        //on définit la taille du tableau
        let largeurDuTableau=2000;
        let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, game.config.height);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        //quelques étoiles et plateformes qui vont avec
        this.stars=this.physics.add.group();
        
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        ////this.physics.add.collider(this.player,this.platforms);


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            game.config.width,
            game.config.height,
            'b3'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;


        this.sky3=this.add.tileSprite(
            0,
            0,
            game.config.width,
            game.config.height,
            'b2'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);



        this.sky=this.add.tileSprite(
            0,
            0,
            game.config.width,
            game.config.height,
            'b1'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //fait passer les éléments devant le ciel

        this.demonasse = new Demonasse(this,300,100);
        this.chapotasse = new Chapotasse(this,100,300);
        

        this.platforms = this.physics.add.staticGroup();

        for(let i=0; i<2000; i+=64){
            this.platforms
            .create(i,420,'ground');
        }

        for(let i=0; i<320; i=i+64){
            this.platforms
                .create(0+i,250,'platform')
                .setSize(64,25)
                .setOffset(0,0);
        }

        for(let i=0; i<200; i=i+64){
            this.platforms
            .create(600+i,300,'platform')
            .setSize(64,25)
            .setOffset(0,0);
        }
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.demonasse, this.hitSpike, null, this);
        this.physics.add.overlap(this.player, this.chapotasse, this.hitSpike, null, this);
        this.physics.add.collider(this.platforms, this.demonasse);
        this.physics.add.collider(this.platforms, this.chapotasse);
        
        this.stars=this.physics.add.group();
        this.stars.create(100,0,"star").setCollideWorldBounds(true).setBounce(0.4);
        this.stars.create(500,350,"star").setCollideWorldBounds(true).body.allowGravity=false;
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        this.physics.add.collider(this.platforms, this.stars);

        this.stars.setDepth(10)
        this.player.setDepth(10)
        this.sky2.alpha = 1;
    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;

        this.sky3.tilePositionX=this.cameras.main.scrollX*0.4+250;

        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3+500;

    }



}

