cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
    },

    buttonControlCallback: function(){
        cc.director.loadScene('_game');
    },

    choosePlayerCallback: function(){
        cc.director.loadScene('_choose');
    },

    menuButtonControlCallback: function(){
        //this.pausePanel.active = false;
        cc.director.loadScene('_start');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
