cc.Class({
    extends: cc.Component,

    properties: {
        closeButton: {
            default:null,
            type: cc.Node
        },
        labelCredits: {
            default:null,
            type: cc.Label
        },
        creditsContainer: {
            default:null,
            type: cc.Node
        },
        sound:{
            default: null,
            type:cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.startCredits();
    },

    startCredits: function(){

        var self = this;
        var position = this.creditsContainer.getPosition();        
        this.creditsContainer.runAction(cc.sequence(cc.moveBy(20,cc.p(0,1444)),cc.moveTo(0,position))).repeatForever(); 
  
    },

});
