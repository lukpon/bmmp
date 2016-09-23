cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
    },

    buttonControlCallback: function(){
        cc.director.loadScene('game');
    },
    pauseButtonControlCallback: function(){
        cc.log("Pause");
        if(!cc.director.isPaused()){
            cc.director.pause();

        }else{
            cc.director.resume();
        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
