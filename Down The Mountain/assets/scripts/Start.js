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
        sound:{
            default: null,
            type:cc.Node,
        
        },
        soundOnOff: {
            default:null,
            type: cc.Node
        },
        atlas: {
            default:null,
            type:cc.SpriteAtlas
        },
        

    },

    // use this for initialization
    onLoad: function () {

        var ls = cc.sys.localStorage;
        var key  = "highscore";
        var key2  = "bg_music";

        var music_play = ls.setItem(key2, true);

        var existingHighscore = ls.getItem(key);
        this.highscoreLabel.string = 'Highscore: ' + existingHighscore.toString();

        this.sound.getComponent('Sound').startScene = this;

    },

    toggleSoundButton:function(on){
        if(on){
            this.soundOnOff.getComponent(cc.Button).normalSprite = this.atlas.getSpriteFrame('btn_sound_on');
            this.soundOnOff.getComponent(cc.Button).pressedSprite = this.atlas.getSpriteFrame('btn_sound_on');
            this.soundOnOff.getComponent(cc.Button).hoverSprite = this.atlas.getSpriteFrame('btn_sound_on');
        }else{
            this.soundOnOff.getComponent(cc.Button).normalSprite = this.atlas.getSpriteFrame('btn_sound_off');
            this.soundOnOff.getComponent(cc.Button).pressedSprite = this.atlas.getSpriteFrame('btn_sound_off');
            this.soundOnOff.getComponent(cc.Button).hoverSprite = this.atlas.getSpriteFrame('btn_sound_off');
        }
    },

    showAbout:function () {
        cc.director.loadScene('_about');
    },

    showTutorial:function () {
        cc.director.loadScene('_tutorial');
    }
});
