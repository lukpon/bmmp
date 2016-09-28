cc.Class({
    extends: cc.Component,

    properties: {
        aboutPanel: {
            default:null,
            type: cc.Node
        },
        closeButton: {
            default:null,
            type: cc.Node
        },
        labelAbout: {
            default:null,
            type: cc.Label
        },
        creditsContainer: {
            default:null,
            type: cc.Node
        },
        sound:{
            default: null,
            type:cc.Node,
        
        },
    },

    // use this for initialization
    onLoad: function () {
        this.startCredits();
    },

    startCredits: function(){

        var self = this;

        // Abspann mit Namen
        var i = this.creditsContainer.getPosition().y; 

        
            function creditsRun () {
                setTimeout(function () {
                    //console.log('y='+i);
                    try {
                        i++;
                        if (i < 320) {
                            self.creditsContainer.setPosition(0,i); 
                            creditsRun();
                        } else {
                            self.creditsContainer.setPosition(0,-820); 
                        }
                    } catch (e) {
                    }
                }, 10)
             }

        creditsRun();
        

        

        
  
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
