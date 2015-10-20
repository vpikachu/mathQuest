var PlayGround = new PIXI.Container();
PlayGround.answers = [];
PlayGround.init1 = function(){
    PlayGround.initTimeValue = 61000;
    PlayGround.secondCounter = 0;

    PlayGround.question = new PIXI.Text("asdfasdf",{
        font : '50px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#3F4343',
        strokeThickness : 4,
        padding:2,align:"center"
    });
    PlayGround.question.correctAnswer = 0;
    PlayGround.question.generateQuestion = function(){
        var numb,multiplier;
        for(;;) {
            numb = Game.numbers[Math.customRandom(0, 1)];
            multiplier = Math.customRandom(1, 10);
            if(PlayGround.question.text == "" + numb + "x" + multiplier) continue;
            PlayGround.question.correctAnswer = numb * multiplier;
            PlayGround.question.text = "" + numb + "x" + multiplier;
            break;
        }
    };
    PlayGround.question.position.set(Game.designResolution.width/2,Game.designResolution.height/2);
    PlayGround.question.anchor.set(0.5,0.5);
    PlayGround.addChild(PlayGround.question);


    PlayGround.success = new PIXI.Text("Success: 0",{
        font : '15px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#3F4343',
        strokeThickness : 4,
        padding:2,align:"left"
    });
    PlayGround.success.position.set(20,20);
    PlayGround.addChild(PlayGround.success);

    PlayGround.fails = new PIXI.Text("Fails: 0",{
        font : '15px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#3F4343',
        strokeThickness : 4,
        padding:2,align:"left"
    });
    PlayGround.fails.position.set(20,50);
    PlayGround.addChild(PlayGround.fails);


    PlayGround.timer = new PIXI.Text("Remain: 0",{
        font : '15px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#3F4343',
        strokeThickness : 4,
        padding:2,align:"left"
    });
    PlayGround.timer.position.set(Game.designResolution.width - 200,20);
    PlayGround.addChild(PlayGround.timer);

    PlayGround.message = new PIXI.Text("Remain: 0",{
        font : '35px HennyPenny',
        fill : '#FFFFFF',
        padding:2,align:"left"
    });
    PlayGround.message.alpha = 0;
    PlayGround.message.anchor.set(0.5,0.5);
    PlayGround.message.position.set(Game.designResolution.width/2,Game.designResolution.height/2 - 80);
    PlayGround.addChild(PlayGround.message);



    var home = new InteractiveText("Main menu",PlayGround.onClickHome);
    home.position.set(80,Game.designResolution.height-50);
    home.textnumber.style.font = "20px HennyPenny";
    PlayGround.addChild(home);




    var width = 120;
    var height = 80;
    for(var i=0; i<2;i++){
        var number = new InteractiveText("0",PlayGround.onSelectAnswer);
        number.position.set(Game.designResolution.width/2+ width/2 + i*width,
            Game.designResolution.height/2 - height*2);
        PlayGround.addChild(number);
        PlayGround.answers.push(number);
    }

    for(i=0; i<4;i++){
        number = new InteractiveText("0",PlayGround.onSelectAnswer);
        number.position.set(Game.designResolution.width/2+ width/2 + 2*width,
            Game.designResolution.height/2 - height*2 + i*height);
        PlayGround.addChild(number);
        PlayGround.answers.push(number);
    }

    for( i=0; i<5;i++){
        number = new InteractiveText("0",PlayGround.onSelectAnswer);
        number.position.set(Game.designResolution.width/2+ width/2 + width*2 - i*width,
            Game.designResolution.height/2 + height*2);
        PlayGround.addChild(number);
        PlayGround.answers.push(number);
    }

    for(i=0; i<4;i++){
        number = new InteractiveText("0",PlayGround.onSelectAnswer);
        number.position.set(Game.designResolution.width/2 - width/2 - 2*width,
            Game.designResolution.height/2 + height*2 - i*height);
        PlayGround.addChild(number);
        PlayGround.answers.push(number);
    }

    for(i=0; i<3;i++){
        number = new InteractiveText("0",PlayGround.onSelectAnswer);
        number.position.set(Game.designResolution.width/2 - width/2 - width*2 + i*width,
            Game.designResolution.height/2 - height*2);
        PlayGround.addChild(number);
        PlayGround.answers.push(number);
    }
};

PlayGround.doFlow = function(){

    PlayGround.secondCounter -= Game.now - Game.elapsed;
    PlayGround.timer.text = "Remain: " + Math.floor(PlayGround.secondCounter/1000);

    if(PlayGround.message.alpha > 0){
        PlayGround.message.alpha -= (Game.now - Game.elapsed)/2000;

    }
    if(PlayGround.secondCounter < 0) {
        Game.showResult();
    }



};
PlayGround.onSelectAnswer = function(){
    if(this.text == PlayGround.question.correctAnswer){
        Game.success++;
        PlayGround.updateScores();

        PlayGround.message.style.fill = "#00CC66";
        PlayGround.message.text = "Cool!";
        PlayGround.message.alpha = 1;
        PlayGround.question.generateQuestion();
    }
    else {
        Game.fails++;
        PlayGround.updateScores();
        PlayGround.message.style.fill = "#FF7575";
        PlayGround.message.text = "Fail!";
        PlayGround.message.alpha = 1;
    }




};
PlayGround.updateScores = function(){
    PlayGround.fails.text = "Fails: " + Game.fails;
    PlayGround.success.text = "Success: " + Game.success;
};

PlayGround.createLevel = function(numbers){
    PlayGround.secondCounter = PlayGround.initTimeValue;
    Game.numbers = numbers;
    Game.success = 0;
    Game.fails = 0;
    PlayGround.message.alpha = 0;
    PlayGround.question.generateQuestion();


    var res_array= [];
    var res;
    for(var n=0;n<2;n++)
        for(var i = 1; i<=10;i++){
            res =  numbers[n]*i;
            if(res_array.indexOf(res) == -1){
                res_array.push(res);
            }
        }
    while(res_array.length < PlayGround.answers.length){
        res = Math.customRandom(numbers[0],numbers[1]*10);
        if(res_array.indexOf(res) == -1){
            res_array.push(res);
        }
    }
    res_array.sort(sortNumber);

    for(i=0;i<PlayGround.answers.length;i++){
        PlayGround.answers[i].textnumber.text = res_array[i];
    }


};
PlayGround.onClickHome = function(){
    Game.showStartMenu();
};
function sortNumber(a,b) {
    return a - b;
}
