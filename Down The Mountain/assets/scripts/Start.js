cc.Class({
    extends: cc.Component,

    properties: {
        startPanel: {
            default:null,
            type: cc.Node
        },
        highscoreLabel: {
            default:null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        var ls = cc.sys.localStorage;
        var key  = "highscore";

        var existingHighscore = ls.getItem(key);
        this.highscoreLabel.string = 'Highscore: ' + existingHighscore.toString();
    },

    showAbout:function () {
        cc.director.loadScene('_about');
    },

    showTutorial:function () {
        cc.director.loadScene('_tutorial');
    }
});
