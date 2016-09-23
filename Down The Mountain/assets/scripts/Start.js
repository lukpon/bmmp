cc.Class({
    extends: cc.Component,

    properties: {
        aboutPanel: {
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
        this.aboutPanel.active = false;
    },

    showAboutPanel:function () {
        if (this.aboutPanel.active) {
            this.aboutPanel.active = false;
        } else {
            this.aboutPanel.active = true;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
