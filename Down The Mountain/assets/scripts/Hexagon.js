cc.Class({
    extends: cc.Component,

    properties: {
        overlay:{
            default: null,
            type:cc.Node,
        },
        emmitter:{
            default:null,
            type:cc.ParticleSystem,
        },

        animation:{
            default:null,
            type:cc.Animation,
        },

        overlayType: "none",
        groundType: "none",

    },

    // use this for initialization
    onLoad: function () {
        this.particles = this.emmitter;
        this.particles.stopSystem();

        this.ground_tiles = {
            DEFAULT: 'none',
            NORMAL: 'isocube',
            TRAP: 'trap',
            STICKY: 'sticky',
            FLIP: 'flip',
            FATAL: 'othercube',
            LAVA: 'lava',
            POISON: 'posion',
            SPIKE: 'zacken',
        };

        this.playerStatus = 'neutral';

        this.State = cc.Enum({
            Visible: -1,
            Invisible : -1,
        });

        this.spikeOut = false;

        this.animation.parent = this;
        this.state = this.State.Visible;



    },


    explosionParticlePlay: function() {
        if(this.state == this.State.Visible){
            this.group.checkPlayerStatus(this.row, this.col, 'explosion');
            this.particles.resetSystem();
            this.overlay.removeFromParent(true);
            this.getComponent(cc.Sprite).spriteFrame = this.group.game.atlas.getSpriteFrame('othercube2');
        }

    },

    trapDrop: function() {
        if(this.state == this.State.Visible){
            this.group.checkPlayerStatus(this.row, this.col, 'trap');
            this.getComponent(cc.Sprite).node.runAction(cc.moveBy(0.3,cc.p(0,-300)));
        }

    },

    getPlayerStatus: function() {
        return this.playerStatus;
    },

    poisonPlayer: function(state) {
        if (state == 'active') {
            this.playerStatus = 'poisoned';
        } else if (state = 'cure'){
            this.playerStatus = 'neutral';
        }
    },

    setSpriteFrame:function(frame){

        var sprite = this.getComponent(cc.Sprite);

        if(frame === "zacken"){
            this.animation.play("zacken");
            sprite.spriteFrame = this.group.game.atlas.getSpriteFrame("cube2");
        }else{
            this.animation.stop();
            sprite.spriteFrame = this.group.game.atlas.getSpriteFrame(frame);
        }

        this.groundType = frame;

    },

    setOverlay:function(overlayType){

        if(overlayType==="none"){
            //cc.log("Overlay Type: "+ overlayType);
            return;
        }


        /*var self = this;

        if(this.overlay === null){
            // Create a new node and add sprite components.
            self.overlay = new cc.Node("New Node");
            self.node.addChild(self.overlay);

        }*/

        var sprite = this.overlay.addComponent(cc.Sprite);
        sprite.spriteFrame = this.group.game.atlas.getSpriteFrame(overlayType);
        this.overlay.y += 48;

        this.overlayType = overlayType;

        if(overlayType === "star"){
            var moveUp = cc.moveBy(1.5,cc.p(0,3));
            var moveDown = cc.moveBy(1.5,cc.p(0,-3));
            sprite.node.runAction(cc.sequence(moveUp,moveDown)).repeatForever();
        }

    },

    animateBounce: function() {
        var sprite = this.getComponent(cc.Sprite);
        sprite.node.runAction(cc.sequence(cc.moveBy(0.1,cc.p(0,-3)),cc.moveBy(0.1,cc.p(0,3))));
    },

    canStepOverlay: function(){

      var result = true;

      switch(this.overlayType){
            case "tree":
                result = false;
                break;
            case "tree2":
                result = false;
                break;
            default:
                result = true;

      }
      return result;

    },
    checkAction:function(){


        switch(this.groundType){

            case this.ground_tiles.NORMAL:
                break;
            case this.ground_tiles.FATAL:
                setTimeout(this.explosionParticlePlay.bind(this), 1000);
                break;
            case this.ground_tiles.TRAP:
                setTimeout(this.trapDrop.bind(this), 1000);
                break;
            // case this.ground_tiles.FLIP:
            //     this.group.game.flipDirection();
            //     break;
            case this.ground_tiles.STICKY:
                this.group.game.stick(1000);
                break;
            case this.ground_tiles.LAVA:
                this.group.game.gameOver();
                break;
            case this.ground_tiles.POISON:
                this.poisonPlayer('active');
                break;
            case this.ground_tiles.SPIKE:
                this.group.checkPlayerStatus(this.row, this.col, 'spike', this.spikeOut);
                break;
            break;

        }

        switch(this.overlayType){

            case 'star':
                this.group.game.gainScore();
                this.overlay.getComponent(cc.Sprite).setVisible(false);
                break;
            case 'sticky':
                this.group.game.stick(3000);
                break;
            case 'potion':
                this.poisonPlayer('cure');
                break;
            case 'flip':
                this.group.game.flipDirection();
                break;
            case 'trap':
                setTimeout(this.trapDrop.bind(this), 1000);
                break;
        }

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
