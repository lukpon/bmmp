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
       // this.startMusic();

    },

    // MUSIC ###############################
    startMusic: function() {
        cc.audioEngine.playMusic(this.startMusic, true);
        cc.audioEngine.setMusicVolume(0.3);
        this.musicWillPlay = true;
    },

    stopMusic: function(){
        cc.audioEngine.stopMusic();
        this.musicWillPlay = false;
    },

    toggleMusic: function() {
        //prüfe, ob Music läuft oder nicht
        if (this.musicWillPlay) {
           cc.audioEngine.pauseMusic();
       } else {
            cc.audioEngine.resumeMusic();
       }
    },

    //SOUNDS ###############################
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

    playSound_gainScore: function() {
        cc.audioEngine.playEffect(this.gainScore, false);
    },


});
