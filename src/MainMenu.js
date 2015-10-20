var MainMenu = new PIXI.Container();
MainMenu.init1 = function(){

    var text = new InteractiveText("tab 1 and 5",this.onClickTab);
    MainMenu.addChild(text);
    text.numbers = [1,5];
    text.position.set(Game.designResolution.width/2, 100);


    text = new InteractiveText("tab 2 and 3",this.onClickTab);
    MainMenu.addChild(text);
    text.numbers = [2,3];
    text.position.set(Game.designResolution.width/2, 180);


    text = new InteractiveText("tab 3 and 4",this.onClickTab);
    MainMenu.addChild(text);
    text.numbers = [3,4];
    text.position.set(Game.designResolution.width/2, 260);
};

MainMenu.doFlow = function(){

};
MainMenu.onClickTab = function(){
    Game.stage = PlayGround;
    PlayGround.createLevel(this.parent.numbers);
};
