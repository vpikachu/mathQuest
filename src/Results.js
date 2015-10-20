var ResultsPage = new PIXI.Container();
ResultsPage.init1 = function(){
    ResultsPage.textedit = new PIXI.Text("Success: 0",{
        font : '50px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#3F4343',
        strokeThickness : 4,
        padding:2,align:"left",

    });
    ResultsPage.textedit.anchor.set(0.5,0.5);
    ResultsPage.textedit.position.set(Game.designResolution.width/2,Game.designResolution.height/2);
    ResultsPage.addChild(ResultsPage.textedit);



    var home = new InteractiveText("Main menu",ResultsPage.onClickHome);
    home.textnumber.style.font = "20px HennyPenny";
    home.position.set(80,Game.designResolution.height-50);
    ResultsPage.addChild(home);


};
ResultsPage.updateResults = function() {
    ResultsPage.textedit.text = PlayGround.success.text + "\n" + PlayGround.fails.text;
};

ResultsPage.doFlow = function(){

};
ResultsPage.onClickHome = function(){
    Game.showStartMenu();
};

