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
        if (cc.sys.localStorage.getItem('bg_music') == 'notplaying') {
            this.playMusic();
        }
    },

    // MUSIC ###############################
    playMusic: function() {
        cc.audioEngine.playMusic(this.startMusic, true);
        cc.audioEngine.setMusicVolume(0.3);
        cc.sys.localStorage.setItem('bg_music', 'playing');
    },

    toggleMusic: function() {
        //prüfe, ob Music läuft oder nicht
        if (cc.sys.localStorage.getItem('bg_music') == 'notplaying') {
            this.startScene.toggleSoundButton(false);
           cc.audioEngine.pauseMusic();
       } else if (cc.sys.localStorage.getItem('bg_music') == 'playing') {
            this.startScene.toggleSoundButton(true);
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
