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
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
