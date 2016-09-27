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
                i++;
                if (i < 320) {
                    self.creditsContainer.setPosition(0,i); 
                    creditsRun();
                } else {
                    self.creditsContainer.setPosition(0,-820); 
                }
            }, 10)
        }

        creditsRun();

        /* TODO */
        // fehlt noch, dass der Abspann vorzeitig stoppt, 
        // wenn man den Close-Button drückt ***KEIN PLAN***
  
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
