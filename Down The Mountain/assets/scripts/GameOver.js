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
        
    },

    showScore:function(score){
        if (score == 1) {
            this.label.string = score.toString() + ' Punkt';
        } else {
            this.label.string = score.toString() + ' Punkte';
        }
    },

    showHighscore:function(score){
        this.label2.string = 'Highscore: ' + score.toString();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
