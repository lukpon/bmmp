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
        var position = this.creditsContainer.getPosition();
        //var height = this.creditsContainer.height;
        
        this.creditsContainer.runAction(cc.sequence(cc.moveBy(10,cc.p(0,1155)),cc.moveTo(0,position))).repeatForever();


        /*// Abspann mit Namen
        var i = this.creditsContainer.getPosition().y; 

        
            function creditsRun () {
                if(self.creditsContainer.getPosition().y > 320){
                setTimeout(function () {
                    //console.log('y='+i);

                        i++;
                        if (i < 320) {
                            self.creditsContainer.setPosition(0,i); 
                            creditsRun();
                        } else {
                            self.creditsContainer.setPosition(0,-820); 
                        }
      
                }, 10)
                }


             }

        creditsRun();*/
        

        

        
  
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
