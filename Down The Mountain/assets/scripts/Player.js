cc.Class({
    extends: cc.Component,

    properties: {

        player: {
            default: null,
            type: cc.Sprite,
        },
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    dropToDeath: function() {
        this.group.player.runAction(cc.moveBy(0.3,cc.p(0,-300)));
    },

    bounceWithCube: function () {
        this.group.player.runAction(cc.sequence(cc.moveBy(0.1,cc.p(0,-3)),cc.moveBy(0.1,cc.p(0,3))));
    },

    move: function(nextX, nextY, left){


	    var bezierX = 10;
        if(this.group.player.getPosition().x > nextX){
              bezierX *= -1;
        }

        var flip = cc.flipX(left);

        var flipValue = 1;
        if (!left){
            flipValue *= -1;
        }

        var jumpAction = cc.sequence(cc.scaleTo(0.15, 0.9*flipValue, 1.3),cc.scaleTo(0.15, 1*flipValue, 1.0));


	    var bezier = [cc.p(this.group.player.getPosition().x - bezierX, this.group.player.getPosition().y), cc.p(nextX,nextY), cc.p(nextX,nextY)];
        var bezierTo = cc.bezierTo(0.15, bezier);

        var spawn = cc.spawn(flip, jumpAction, bezierTo);


        this.group.player.runAction(cc.sequence(spawn,cc.callFunc(this.group.moveFinished, this.group)));

	},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
