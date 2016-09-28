cc.Class({
    extends: cc.Component,

    properties: {
        clickSound: {
            default:null,
            url: cc.AudioClip
        },
        returnSound: {
            default:null,
            url: cc.AudioClip
        },
        startMusic: {
            default:null,
            url: cc.AudioClip
        },
        gameMusic: {
            default:null,
            url: cc.AudioClip
        },
        gainScore: {
            default:null,
            url: cc.AudioClip
        },
        nextPrevPageSound: {
            default:null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    playSound_nextPrevPage: function() {
        cc.audioEngine.playEffect(this.nextPrevPageSound, false);
    },

    playSound_return: function() {
        cc.audioEngine.playEffect(this.returnSound, false);
    },

    playMusic_Start: function() {
        cc.audioEngine.playMusic(this.startMusic, true);
    },

    playSound_Click: function() {
        cc.audioEngine.playEffect(this.clickSound, false);
    },

});
