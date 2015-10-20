var Game = {
    stage:null,
    screen: {width:960, height:540},
    designResolution: {width:960, height:540},
    devicePixelRatio:1,
    scaleFactor: 1,
    lives:3,
    level:1,
    success:0,
    fails:0,
    score:0,
    bestScore:0,
    elapsed:Date.now(),
    now: Date.now(),
    assets:null,
    numbers:null,
    setup:function(){
        //scaling game to device resolution;
        this.devicePixelRatio = window.devicePixelRatio;
        this.scaleFactor = Math.min(window.innerWidth/this.designResolution.width,
            window.innerHeight/this.designResolution.height);
        this.screen.width = this.scaleFactor * this.designResolution.width;
        this.screen.height = this.scaleFactor * this.designResolution.height;


        if(window.localStorage.getItem("$BEST_SCORE$") == null)     window.localStorage.setItem("$BEST_SCORE$",0);
        this.bestScore = window.localStorage["$BEST_SCORE$"];

        //loading screen
        var loading = new PIXI.Text("Loading",{
            font : '30px HennyPenny',
            fill : '#FFFFFF',
            stroke : '#000000',
            strokeThickness : 4,
            padding:20,align:"center"
        });
        loading.anchor.set(0.5,0.5);
        loading.position.set(this.designResolution.width/2, this.designResolution.height/2);

        this.stage = new PIXI.Container();
        this.stage.scale.set(this.scaleFactor);
        this.stage.addChild(loading);
        this.stage.doFlow= function(){};

        window.addEventListener("resize",Game.ongameresize);

        var loader = new PIXI.loaders.Loader();
        loader.add("background","img/background.png");
        loader.load(Game.ontexturesload);
    },
    ontexturesload: function(loader,resouces){
        Game.assets = resouces;
        resouces = null;
        PlayGround.init1();
        MainMenu.init1();
        ResultsPage.init1();
        Game.rescaleScenes();
        Game.showStartMenu();


    },
    ongameresize: function() {
        Game.scaleFactor = Math.min(window.innerWidth/Game.designResolution.width,
            window.innerHeight/Game.designResolution.height);

        Game.screen.width = Game.scaleFactor * Game.designResolution.width;
        Game.screen.height = Game.scaleFactor * Game.designResolution.height;

        renderer.resize(Game.screen.width,Game.screen.height);

        Game.rescaleScenes();
    },
    rescaleScenes:function(){
        MainMenu.scale.set(Game.scaleFactor,Game.scaleFactor);
        PlayGround.scale.set(Game.scaleFactor,Game.scaleFactor);
    },
	detectmob: function detectmob() { 
		 if( navigator.userAgent.match(/Android/i)
		 || navigator.userAgent.match(/webOS/i)
		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)
		 ){
			return true;
		  }
		 else {
			return false;
		  }
	},
    showStartMenu: function(){
        Game.stage = MainMenu;
    },
    showResult: function () {
        ResultsPage.updateResults();
        Game.stage = ResultsPage;

    }
};