cc.Class({
    extends: cc.Component,

    properties: {
        hexagonGroup: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        atlas: {
            default:null,
            type: cc.SpriteAtlas
        },
        gameplayWindow: {
            default:null,
            type: cc.Node
        },
        gameOverMenu: {
            default:null,
            type: cc.Node
        },
        background: {
            default:null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        

        this.GameState = cc.Enum({
            Menu: -1,
            Run : -1,
            Over: -1
        });

        this.gameState = this.GameState.Ready;
        this.hexagonGroup.getComponent('HexagonGroup').game = this;
        this.reset();
    },

    startGame:function(){
        this.gameState = this.GameState.Run;
    },

    displayMenu:function(){
        cc.audioEngine.stopMusic();
        this.gameState = this.GameState.Menu;
        this.hexagonGroup.getComponent('HexagonGroup').stop();
        cc.director.loadScene('_start');
    },

    reset:function(){
        this.score = 0;
        this.sticky = false;
        this.flipped = false;
        this.gameOverMenu.active = false;
        this.startGame();
    },

    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = this.score.toString();
        cc.audioEngine.playEffect(this.gainScore, false);

    },
    stick: function(duration){
        this.toggleStickiness();
        setTimeout(this.toggleStickiness.bind(this), duration);
    },
    flipDirection: function(times){
        this.toggleFlip();
    },

    toggleFlip: function(){
        this.flipped = !this.flipped;
    },
    toggleStickiness: function(){
        this.sticky = !this.sticky;
    },

    gameOver:function () {
        cc.audioEngine.stopMusic();

        // Highscore via Local Storage
        var ls = cc.sys.localStorage;
        var value = this.score;
        var key  = "highscore";

        // prüfe, ob der aktuelle Score groesser ist als der bestehende Highscore
        var existingHighscore = ls.getItem(key);
        if (existingHighscore != null) {
            if (value > existingHighscore) {
                ls.setItem(key, value);
            }
        } else {
            ls.setItem(key, value);
        }

        // neuen Highscore festlegen
        this.newHighscore = ls.getItem(key);

        this.gameState = this.GameState.Over;
        this.gameOverMenu.active = true;
        this.gameOverMenu.getComponent('GameOver').showScore(this.score);
        this.gameOverMenu.getComponent('GameOver').showHighscore(this.newHighscore);
        this.hexagonGroup.getComponent('HexagonGroup').stop();

        // add keyboard event listener
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: function(keyCode, event) {
                if(self.gameState == self.GameState.Over){
                    switch(keyCode) {
                        case cc.KEY.space:
                        self.runAction(cc.sequence(
                            this.gameOverMenu.fadeOut(),
                            cc.callFunc(function () {
                                 cc.director.loadScene('_game');
                            })
                        ));
                        cc.director.loadScene('_game');
                        break;
                    }
                }
            }
        }, self.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
