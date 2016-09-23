cc.Class({
    extends: cc.Component,

    properties: {
        aboutPanel: {
            default:null,
            type: cc.Node
        },

        tutorialPanel: {
            default:null,
            type: cc.Node
        },

        playButton: {
            default:null,
            type: cc.Node
        },

        closeButton: {
            default:null,
            type: cc.Node
        },

        aboutButton: {
            default:null,
            type: cc.Node
        },

        tutorialButton: {
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
    },

    showAboutPanel:function () {
        this.playButton.active = false;
        this.tutorialButton.active = false;
        this.aboutButton.active = false;
        this.aboutPanel.active = true;
        this.closeButton.active = true;
        this.startCredits();
    },

    showTutorialPanel:function () {
        this.playButton.active = false;
        this.tutorialButton.active = false;
        this.aboutButton.active = false;
        this.tutorialPanel.active = true;
        this.closeButton.active = true;
    },

    closePanels:function(){
        this.tutorialPanel.active = false;
        this.aboutPanel.active = false;
        this.closeButton.active = false;
        this.aboutButton.active = true;
        this.playButton.active = true;
        this.tutorialButton.active = true;
    },

    startCredits: function(){

        var self = this;

        // Abspann mit Namen
        var i = this.creditsContainer.getPosition().y; 

        function creditsRun () {
            setTimeout(function () {
                console.log('y='+i);
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
