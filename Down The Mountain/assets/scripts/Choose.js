cc.Class({
    extends: cc.Component,

    properties: {
        characterContainer: {
            default:null,
            type: cc.Node
        },
        pagesLabel: {
            default:null,
            type: cc.Label
        },
        sound:{
            default: null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        // prüfe Anzahl Tutorial-Seiten via getChildren()
        this.characterPages = this.characterContainer.getChildren().length;
        // erste Seite im Tutorial
        this.characterCurrentPage = 1;
        this.pagesLabel.string = this.characterCurrentPage + '/' + this.characterPages;

        // aktives Tutorial-Container-Panel zu Beginn (Rest wird ausgeblendet)
        this.characterContainerPanel = this.characterContainer.getChildren();
        for (var i = 0; i < this.characterPages; i++) {
            this.characterContainerPanel[i].active = false;
        }
        this.characterContainerPanel[0].active = true;

    },

    playerChosen:function() {
        var ls = cc.sys.localStorage;
        var key  = "player";

        switch(this.characterCurrentPage) {
            case 1: 
                ls.setItem(key, 1);
            break;
            case 2: 
                ls.setItem(key, 2);
            break;
            case 3:
                ls.setItem(key, 3);
            break;
            case 4:
                ls.setItem(key, 4);
            break;
        }

    },

    nextPlayer:function(){
        for (var i = 0; i < this.characterPages; i++) {
            this.characterContainerPanel[i].active = false;
        }
        if (this.characterCurrentPage < this.characterPages) {
            this.characterCurrentPage += 1;
            this.characterContainerPanel[this.characterCurrentPage-1].active = true;
        } else if (this.characterCurrentPage == this.characterPages) {
            this.characterCurrentPage = 1;
            this.characterContainerPanel[0].active = true;
        } else {
        }
        this.pagesLabel.string = this.characterCurrentPage + '/' + this.characterPages;

    },

    prevPlayer:function(){
        for (var i = 0; i < this.characterPages; i++) {
            this.characterContainerPanel[i].active = false;
        }
        if (this.characterCurrentPage > 1) {
            this.characterCurrentPage -= 1;
            this.characterContainerPanel[this.characterCurrentPage-1].active = true;
        } else if (this.characterCurrentPage == 1) {
            this.characterCurrentPage = this.characterPages;
            this.characterContainerPanel[this.characterPages-1].active = true;
        } else {
        }
        this.pagesLabel.string = this.characterCurrentPage + '/' + this.characterPages;
    },
});
