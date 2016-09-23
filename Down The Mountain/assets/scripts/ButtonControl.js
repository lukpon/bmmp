cc.Class({
    extends: cc.Component,

    properties: {
        pauseOverlay: {
            default:null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        
    },

    buttonControlCallback: function(){
        cc.director.loadScene('game');
    },
    pauseButtonControlCallback: function(){

        if(!cc.director.isPaused()){
            cc.director.pause();
            this.pauseOverlay.active = true;
        }else{
            cc.director.resume();
            this.pauseOverlay.active = false;
        }

    },

    menuButtonControlCallback: function(){
        cc.director.loadScene('start');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
