cc.Class({
    extends: cc.Component,

    properties: {
        pausePanel: {
            default:null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
    },

    buttonControlCallback: function(){
        cc.director.loadScene('_game');
    },
    pauseButtonControlCallback: function(){

        if(!cc.director.isPaused()){
            cc.director.pause();
            this.pausePanel.active = true;
            cc.audioEngine.pauseMusic();
        }else{
            cc.director.resume();
            this.pausePanel.active = false;
            cc.audioEngine.resumeMusic();
        }

    },

    menuButtonControlCallback: function(){
        //this.pausePanel.active = false;
        cc.director.loadScene('_start');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
