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
        pausePanel: {
            default:null,
            type: cc.Node
        },
        sound:{
            default: null,
            type:cc.Node,
        },
        playPauseButton: {
            default:null,
            type: cc.Node
        },
        atlasPlayPause: {
            default:null,
            type:cc.SpriteAtlas
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

    reset:function(){
        this.score = 0;
        this.sticky = false;
        this.flipped = false;
        this.gameOverMenu.active = false;
        this.pausePanel.active = false;
        this.startGame();
    },

    displayMenu:function(){
        this.gameState = this.GameState.Menu;
        this.hexagonGroup.getComponent('HexagonGroup').stop();
        cc.director.loadScene('_start');
    },

    togglePause: function(){
        if(!cc.director.isPaused()){
            cc.director.pause();

            // ersetze Sprite durch Pause-Frame
            this.playPauseButton.getComponent(cc.Button).normalSprite = this.atlasPlayPause.getSpriteFrame('btn_pauseplay_normal');
            this.playPauseButton.getComponent(cc.Button).pressedSprite = this.atlasPlayPause.getSpriteFrame('btn_pauseplay_hover');
            this.playPauseButton.getComponent(cc.Button).hoverSprite = this.atlasPlayPause.getSpriteFrame('btn_pauseplay_hover');
            
            this.pausePanel.active = true;
        }else{
            cc.director.resume();

            // ersetze Sprite durch Play-Frame
            this.playPauseButton.getComponent(cc.Button).normalSprite = this.atlasPlayPause.getSpriteFrame('btn_pause_normal');
            this.playPauseButton.getComponent(cc.Button).pressedSprite = this.atlasPlayPause.getSpriteFrame('btn_pause_hover');
            this.playPauseButton.getComponent(cc.Button).hoverSprite = this.atlasPlayPause.getSpriteFrame('btn_pause_hover');

            this.pausePanel.active = false;
        }
    },

    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = this.score.toString();

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
