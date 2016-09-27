cc.Class({
    extends: cc.Component,

    properties: {
        tutorialPanel: {
            default:null,
            type: cc.Node
        },
        closeButton: {
            default:null,
            type: cc.Node
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
});
