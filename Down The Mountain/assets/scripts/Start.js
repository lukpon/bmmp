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

        startPanel: {
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

        highscoreLabel: {
            default:null,
            type: cc.Label
        },

        tutorialContainer: {
            default:null,
            type: cc.Node
        },

    },

    // use this for initialization
    onLoad: function () {
        var ls = cc.sys.localStorage;
        var key  = "highscore";

        var existingHighscore = ls.getItem(key);
        this.highscoreLabel.string = 'Highscore: ' + existingHighscore.toString();

        this.tutorialPages = this.tutorialContainer.getChildren().length;
        this.tutorialCurrentPage = 1;
        console.log(this.tutorialCurrentPage);
    },

    showAboutPanel:function () {
        this.startPanel.active = false;
        this.aboutPanel.active = true;
        this.closeButton.active = true; 
        this.startCredits();
    },

    showTutorialPanel:function () {
        this.startPanel.active = false;
        this.tutorialPanel.active = true;
        this.closeButton.active = true;
    },

    closePanels:function(){
        this.tutorialPanel.active = false;
        this.aboutPanel.active = false;
        this.closeButton.active = false;
        this.startPanel.active = true;
    },

    nextTutorialPage:function(){
        console.log('next');
        if (this.tutorialCurrentPage < this.tutorialPages) {
            this.tutorialCurrentPage += 1;
        } else if (this.tutorialCurrentPage == this.tutorialPages) {
            this.tutorialCurrentPage = 1;
        } else {
            console.log('ende erreicht');
        }
        console.log(this.tutorialCurrentPage);
    },

    prevTutorialPage:function(){
        console.log('prev');
        if (this.tutorialCurrentPage > 1) {
            this.tutorialCurrentPage -= 1;
        } else if (this.tutorialCurrentPage == 1) {
            this.tutorialCurrentPage = this.tutorialPages;
        } else {
            console.log('anfang erreicht');
        }
        console.log(this.tutorialCurrentPage);
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
