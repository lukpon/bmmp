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
        pagesLabel: {
            default:null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        var ls = cc.sys.localStorage;
        var key  = "highscore";

        var existingHighscore = ls.getItem(key);
        this.highscoreLabel.string = 'Highscore: ' + existingHighscore.toString();

        // prüfe Anzahl Tutorial-Seiten via getChildren()
        this.tutorialPages = this.tutorialContainer.getChildren().length;
        // erste Seite im Tutorial
        this.tutorialCurrentPage = 1;
        this.pagesLabel.string = this.tutorialCurrentPage + '/' + this.tutorialPages;

        // aktives Tutorial-Container-Panel zu Beginn (Rest wird ausgeblendet)
        this.tutorialContainerPanel = this.tutorialContainer.getChildren();
        for (var i = 0; i < this.tutorialPages; i++) {
            this.tutorialContainerPanel[i].active = false;
        }
        this.tutorialContainerPanel[0].active = true;

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
        for (var i = 0; i < this.tutorialPages; i++) {
            this.tutorialContainerPanel[i].active = false;
        }
        if (this.tutorialCurrentPage < this.tutorialPages) {
            this.tutorialCurrentPage += 1;
            this.tutorialContainerPanel[this.tutorialCurrentPage-1].active = true;
        } else if (this.tutorialCurrentPage == this.tutorialPages) {
            this.tutorialCurrentPage = 1;
            this.tutorialContainerPanel[0].active = true;
        } else {
        }
        this.pagesLabel.string = this.tutorialCurrentPage + '/' + this.tutorialPages;

    },

    prevTutorialPage:function(){
        for (var i = 0; i < this.tutorialPages; i++) {
            this.tutorialContainerPanel[i].active = false;
        }
        if (this.tutorialCurrentPage > 1) {
            this.tutorialCurrentPage -= 1;
            this.tutorialContainerPanel[this.tutorialCurrentPage-1].active = true;
        } else if (this.tutorialCurrentPage == 1) {
            this.tutorialCurrentPage = this.tutorialPages;
            this.tutorialContainerPanel[this.tutorialPages-1].active = true;
        } else {
        }
        this.pagesLabel.string = this.tutorialCurrentPage + '/' + this.tutorialPages;
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
