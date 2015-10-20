function InteractiveText(text,handler){
    PIXI.Container.apply(this, arguments);
    if(text != undefined)  this.init1(text);
    if(handler != undefined) this.setHandler(handler);
}
InteractiveText.prototype = Object.create(PIXI.Container.prototype);
InteractiveText.prototype.init1 = function(number) {


    this.textnumber = new PIXI.Text(number,{
        font : '30px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#3F4343',
        strokeThickness : 4,
        padding:0,align:"center"
    });
    this.addChild(this.textnumber);
    this.textnumber.buttonMode = true;
    this.textnumber.interactive = true;
    this.textnumber.anchor.set(0.5,0.5);



};
InteractiveText.prototype.setHandler = function(handler){
    this.textnumber.click = handler;
    this.textnumber.tap = handler;
};

