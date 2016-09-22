cc.Class({
    extends: cc.Component,

    properties: {
        label:{
            default:null,
            type:cc.Label,
        },
        label2:{
            default:null,
            type:cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = 'Score: ' + this.game.getScore();
    },

    showScore:function(score){
        this.label.string = score.toString() + ' Punkte';
    },

    showHighscore:function(score){
        this.label2.string = score.toString();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
