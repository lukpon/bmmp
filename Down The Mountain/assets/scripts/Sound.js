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
        if (cc.sys.localStorage.getItem('bg_music') == true) {
            this.playMusic();
            console.log(cc.sys.localStorage.getItem('bg_music'));
        }
    },

    // MUSIC ###############################
    playMusic: function() {
        cc.audioEngine.playMusic(this.startMusic, true);
        this.musicWillPlay = true;
        cc.audioEngine.setMusicVolume(0.3);
        cc.sys.localStorage.setItem('bg_music', false);
    },

    toggleMusic: function() {
        //prüfe, ob Music läuft oder nicht
        if (this.musicWillPlay) {
            this.startScene.toggleSoundButton(false);
            this.musicWillPlay = false;
           cc.audioEngine.pauseMusic();
       } else {
            this.startScene.toggleSoundButton(true);
            this.musicWillPlay = true;
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
