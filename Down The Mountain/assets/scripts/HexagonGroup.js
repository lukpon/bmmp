cc.Class({
    extends: cc.Component,

    properties: {
        gridSizeX: 0,
        gridSizeY: 0,
        hexagon: {
            default: null,
            type: cc.Prefab,
        },
        coin: {
            default: null,
            type: cc.Prefab,
        },
        background: {
            default: null,
            type: cc.Node,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        spawnSlides: {
            default:true,
        },

    },

    // initialize the hexagon grid
    onLoad: function () {

        this.reset();

    },

    reset:function(){


        this.running = false;
        this.playerHasMoved = false;
        this.setInputControl();

        this.level_base = [];
        this.level_overlay = [];

        this.playerCol = 2;
        this.playerRow = 0;
        this.playerMove = true;
        this.playerSlide = false;

        this.hexagonArray = [];
        this.hexagonWidth = 64;
        this.hexagonHeight = 64;
        this.minRow = 0;

        this.currentDepth = 0;

        this.node.removeChild(this.player);
        //initialize hexagons
        this.hexGroup = new cc.Node();
        this.hexGroup.setAnchorPoint(cc.p(0,1))
        this.hexGroup.setPosition(cc.p(0,0));
        this.node.addChild(this.hexGroup);
        this.hexGroup.x += this.hexagonWidth/2 + (480 - this.gridSizeX*this.hexagonWidth)/2 ;
        this.hexGroup.y -= this.hexagonHeight + 320 ;

        this.generateRandomRows(this.gridSizeY*2, this.gridSizeX);

        for(var i = 0; i < this.gridSizeY; i ++){
            this.addHexagonRow(i);
        }
        this.hexGroup.addChild(this.player);
        
        // initialize player
        this.player.getComponent('Player').group = this;
        var markerX = (this.hexagonWidth * (2 * this.playerCol + 1 + this.playerRow % 2) / 2) - this.hexagonWidth / 2;
        var markerY = (this.hexagonHeight * (3 * - this.playerRow + 1) / 4) + 64/4;
        this.markerStartPosition = cc.p(markerX, markerY);
        this.player.setPosition(this.markerStartPosition);
        this.player.setLocalZOrder(1000);

        // initialize input
        this.leftUp = false;
        this.rightUp = false;
        this.canStepLeft = false;
        this.canStepRight = false;

        //background
        this.game.background.setPosition(0,100);

    },

    startGame:function(){

        if(!this.running){
            this.running = true;
            this.checkNextSteps();
        }

    },

    stop:function(){
        this.running = false;
    },

    addHexagonRow: function(i){

        this.hexagonArray[i] = [];

        var columnLength = this.gridSizeX;

        if(i % 2 == 1 ){
            columnLength -=  1;
        }

        for(var j = 0; j < columnLength; j ++){

            var hexagonX = this.hexagonWidth * j + (this.hexagonWidth / 2) * (i % 2);
            var hexagonY = this.hexagonHeight * i / 4 * 3;

            var newHexagon = cc.instantiate(this.hexagon);
            newHexagon.getComponent('Hexagon').group = this;
            newHexagon.getComponent('Hexagon').row = i;
            newHexagon.getComponent('Hexagon').col = j;
            newHexagon.getComponent('Hexagon').setSpriteFrame(this.getFrameFromId(this.level_base[i][j]));
            newHexagon.getComponent('Hexagon').setOverlay(this.getFrameFromId(this.level_overlay[i][j]));

            newHexagon.setPosition(cc.p(hexagonX,hexagonY));
            newHexagon.setLocalZOrder(this.currentDepth);
            this.currentDepth -= 1;
            this.hexagonArray[i][j] = newHexagon;
            this.hexGroup.addChild(newHexagon);
        }

    },

    generateRandomRows:function(rows, columns){

        //building viable ground layer
        var rows_ground = [];
        var columns_ground = [];

        //building overlay layer
        var rows_overlay = [];
        var columns_overlay = [];

        var self = this;


        //Ground layer: distribution of normal and fatal tiles
        for(var i = 0; i<rows; i++){
            var columnLength = columns;

            if(i % 2 == 1 ){
                columnLength -=  1;
            }

            for(var j = 0; j < columnLength; j ++){

                if(i===0 || i===rows-1){
                    columns_ground[j] = 1;
                }
                else{
                    var r = Math.random();
                    columns_ground[j] = 1
                    if(r <= 0.2){
                        // columns_ground[j] = 2;
                    }else if(r > 0.2 && r <0.9){
                        columns_ground[j] = 1;
                    }else{
                        // columns_ground[j] = 9;
                    }
                }

            }
            rows_ground[i] = columns_ground;
            columns_ground = [];
        }

        //initialize overlays, some trees
        var maxTreesPerRow = 2; //2

        for(var k = 0; k<rows; k++){

            var columnLength = columns;
            if(k % 2 == 1 ){
                columnLength -=  1;
            }

            var treesPerRow = 0;

            for(var l = 0; l<columnLength; l++){


                columns_overlay[l] = 0;
                var rand = Math.random();
                if(rand < 0.4){
                    if(k > 0 && rows_ground[k][l] == 1 && treesPerRow < maxTreesPerRow){
                        if(l > 0 && l < columnLength){
                            if(columns_overlay[l-1] != 4){
                                // columns_overlay[l] = 4;
                                treesPerRow++;
                            }
                        } else{
                            // columns_overlay[l] = 4;
                            treesPerRow++;
                        }

                    }
                }
                //stars
                else if(rand >= 0.4 && rand < 0.85){
                    if(k > 0 && (rows_ground[k][l] == 1 || rows_ground[k][l] == 2)){
                        if(Math.random()<0.4){
                            // columns_overlay[l] = 5;
                        }
                    }
                }else{

                    if(k > 0 && rows_ground[k][l] != 0){
                        //flipped, trap, sticky...
                        var rand2 = Math.random();
                        if(rand2 <= 0.2){
                            // columns_overlay[l] = 6;
                        }else if(rand2 > 0.4 && rand2 <= 0.65){
                            // columns_overlay[l] = 7;
                        }else if(rand2 > 0.85){
                            columns_overlay[l] = 8;
                        }
                    }
                }

            }
            rows_overlay[k] = columns_overlay;
            columns_overlay = [];
        }

        if (this.spawnSlides) {
            //Water slides

            var length1 = this.getRandomArbitrary(2,7);

            var offsetX1 = this.getRandomArbitrary(1,3);
            var offsetY1 = this.getRandomArbitrary(1,13);

            for(var u = 0; u<length1;u++){
                if(u==length1-1){
                    rows_ground[offsetY1+u][offsetX1] = 1;
                    rows_overlay[offsetY1+u][offsetX1] = 3;
                }
                else if((offsetY1+u)%2 == 0){
                    rows_ground[offsetY1+u][offsetX1] = 1;
                    rows_overlay[offsetY1+u][offsetX1] = 32;
                }else {
                    rows_ground[offsetY1+u][offsetX1] = 1;
                    rows_overlay[offsetY1+u][offsetX1] = 31;
                }
            }
        }





        this.level_base = this.level_base.concat(rows_ground);
        this.level_overlay = this.level_overlay.concat(rows_overlay);

    },

    // Gibt eine Zufallszahl zwischen min (inklusive) und max (exklusive) zurück
    getRandomArbitrary: function(min, max) {
        return Math.round( Math.random() * (max - min) + min);
    },

    getFrameFromId: function(id){
        var result = "";
        switch(id){

            case 1:
            result = "isocube";
            break;
            case 2:
            result = "othercube";
            break;
            case 3:
            result = "waterplane";
            break;
            case 31:
            result = "waterplane_l";
            break;
            case 32:
            result = "waterplane_r";
            break;
            case 4:
            if(Math.random()>0.5){
                result = "tree2";
            }else{
                result = "tree";
            }
            break;
            case 5:
            result = "star";
            break;
            case 6:
            result= "flip";
            break;
            case 7:
            result= "sticky";
            break;
            case 8:
            result= "trap";
            break;
            case 9:
            result= "zacken";
            break;
            default:
            result = "none";
        }
        return result;

    },

    setInputControl: function () {

        var self = this;

        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,

            onTouchBegan: function(touch, event) {
                if(self.game.gameState !== self.game.GameState.Run){
                    return;
                }
                if(!self.running && !self.playerHasMoved){
                    self.startGame();
                }
                if (touch.getLocation().x < window.innerWidth/2) {
                    self.leftUp = true;
                    self.rightUp = false;
                    if(!self.playerHasMoved){
                        self.playerHasMoved = true;
                    }if(self.game.flipped){
                        self.leftUp = false;
                        self.rightUp = true;
                    }
                } else {
                    self.leftUp = false;
                    self.rightUp = true;
                    if(!self.playerHasMoved){
                        self.playerHasMoved = true;
                    }
                    if(self.game.flipped){
                        self.leftUp = true;
                        self.rightUp = false;
                    }
                }
                return true;
            },

            onTouchEnded: function(touch, event) {
                if (touch.getLocation().x < window.innerWidth/2) {
                    self.leftUp = false;
                    if(self.game.flipped){
                        self.rightUp = false;
                        self.game.flipped = false;
                    }
                } else {
                    self.rightUp = false;
                    if(self.game.flipped){
                        self.leftUp = false;
                        self.game.flipped = false;
                    }
                }
            },

            onKeyPressed: function(keyCode, event) {

                if(self.game.gameState !== self.game.GameState.Run){
                    return;
                }
                if(!self.running && !self.playerHasMoved){
                    self.startGame();
                }

                switch(keyCode) {
                    case cc.KEY.a:

                    self.leftUp = true;
                    self.rightUp = false;
                    if(!self.playerHasMoved){
                        self.playerHasMoved = true;
                    }if(self.game.flipped){
                        self.leftUp = false;
                        self.rightUp = true;
                    }
                    break;
                    case cc.KEY.d:

                    self.leftUp = false;
                    self.rightUp = true;
                    if(!self.playerHasMoved){
                        self.playerHasMoved = true;
                    }
                    if(self.game.flipped){
                        self.leftUp = true;
                        self.rightUp = false;
                    }
                    break;
                }
            },

            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    self.leftUp = false;
                    if(self.game.flipped){
                        self.rightUp = false;
                        self.game.flipped = false;
                    }
                    break;
                    case cc.KEY.d:
                    self.rightUp = false;
                    if(self.game.flipped){
                        self.leftUp = false;
                        self.game.flipped = false;
                    }
                    break;
                }
            }
        }, self.node);
    },

    checkNextSteps: function(){

        var posX = this.playerCol;
        var posY = this.playerRow;

        if(posY % 2 == 1){
            this.canStepLeft = this.hexagonArray[(posY+1)][posX].getComponent('Hexagon').canStepOverlay();
            this.canStepRight = this.hexagonArray[(posY+1)][posX+1].getComponent('Hexagon').canStepOverlay();
        }else{
            if(this.playerCol == 4){
                this.canStepRight = false;
                this.canStepLeft = this.hexagonArray[(posY+1)][(posX-1)].getComponent('Hexagon').canStepOverlay();
            }else if(this.playerCol == 0){
                this.canStepLeft = false;
                this.canStepRight = this.hexagonArray[(posY+1)][(posX)].getComponent('Hexagon').canStepOverlay();
            }else{
                this.canStepLeft = this.hexagonArray[(posY+1)][(posX-1)].getComponent('Hexagon').canStepOverlay();
                this.canStepRight = this.hexagonArray[(posY+1)][(posX)].getComponent('Hexagon').canStepOverlay();
            }
        }
    },

    placeMarker: function(posX, posY, left){
        this.playerMove = false;

        this.playerCol = posX;
        this.playerRow = posY;

        var nextX = (this.hexagonWidth * (2 * posX + 1 + posY % 2) / 2)  - this.hexagonWidth/2;
        var nextY = this.hexagonHeight * (3 * posY + 1) / 4  + 64/4; // + (80-57)/2;

        this.player.getComponent('Player').move(nextX, nextY, left);

    },

    moveFinished: function(){
        try {
            this.hexagonArray[this.playerRow][this.playerCol].getComponent('Hexagon').animateBounce();
            this.player.getComponent('Player').bounceWithCube();
            this.hexagonArray[this.playerRow][this.playerCol].getComponent('Hexagon').checkAction();
            this.playerMove = true;
            this.checkNextSteps();
        } catch (e) {
            this.player.getComponent('Player').dropToDeath();
            setTimeout(function (){
                this.game.gameOver();
            }, 400);
        }

        console.log(this.game.background.getPosition());
        console.log(this.game.background.getPosition().y);

        var backgroundPositionY = this.game.background.getPosition().y;
        backgroundPositionY -= 30;
        this.game.background.setPosition(0,backgroundPositionY);

    },

    checkPlayerStatus: function(row,col,event,spikeOut){


        switch(event){

            case 'explosion':
            if(this.playerRow == row && this.playerCol == col){
                //cc.log('Game Over');
                this.game.gameOver();
            }
            break;
            case 'trap':
            if(this.playerRow == row && this.playerCol == col){
                this.player.getComponent('Player').dropToDeath();
                this.game.gameOver();
            }
            break;
            case 'spike':
            if(this.playerRow == row && this.playerCol == col){
                if(spikeOut){
                    this.game.gameOver();
                }
            }
            break;
        }
    },



    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        if(!this.running){
            return;
        }


        if(this.playerMove && !this.game.sticky){
            var currentOverlay = this.level_overlay[this.playerRow][this.playerCol];
            //cc.log("Current Overlay: "+currentOverlay);

            if(currentOverlay == 3 || currentOverlay == 31 || currentOverlay == 32){

                this.playerSlide = true;
                var nextWaterTile = -1;
                var columnLength = this.gridSizeX;

                if(this.playerRow % 2 == 0 ){
                    columnLength -=  1;
                }

                for(var i = 0; i < columnLength; i++){
                    var nextRow = this.level_overlay[this.playerRow+1];
                    if(nextRow[i] == 3 || nextRow[i] == 31 || nextRow[i] == 32){
                        nextWaterTile = i;
                    }
                }

                if(nextWaterTile > -1){
                    var columnLength = this.gridSizeX;

                    if(this.playerRow % 2 == 0 ){
                        columnLength -=  1;
                    }

                    // if(this.leftUp && (this.playerCol > 0 || (this.playerRow % 2 == 1))) {
                    //     if(this.canStepLeft){
                    //         this.playerSlide = false;
                    //         this.placeMarker(this.playerCol - (1 - this.playerRow % 2), this.playerRow + 1, true);
                    //     }
                    // } else if (this.rightUp && this.playerCol < this.gridSizeX - 1) {
                    //     if(this.canStepRight){
                    //         this.playerSlide = false;
                    //         this.placeMarker(this.playerCol + (this.playerRow % 2), this.playerRow + 1, false);
                    //     }
                    // }

                    if(columnLength == this.gridSizeX){
                        if(nextWaterTile < this.playerCol){
                            this.placeMarker(nextWaterTile, this.playerRow + 1, false);
                        }
                        else{
                            this.placeMarker(nextWaterTile, this.playerRow + 1, true);
                        }
                    }else if(columnLength == this.gridSizeX-1){
                        if(nextWaterTile <= this.playerCol){
                            this.placeMarker(nextWaterTile, this.playerRow + 1, false);
                        }
                        else{
                            this.placeMarker(nextWaterTile, this.playerRow + 1, true);
                        }
                    }

                }else{
                    this.playerSlide = false;
                }

            }

            if(!this.playerSlide){
                var columnLength = this.gridSizeX;
                if(this.playerRow % 2 == 0 ){
                    columnLength -=  1;
                }
                if(this.leftUp && (this.playerCol > 0 || (this.playerRow % 2 == 1))){
                    if(this.canStepLeft){
                        this.placeMarker(this.playerCol - (1 - this.playerRow % 2), this.playerRow + 1, true);
                    }
                } else if (this.leftUp && (this.playerCol == 0 || (this.playerRow % 2 == 1))) {
                    this.placeMarker(this.playerCol - (1 - this.playerRow % 2), this.playerRow + 1, true);
                }
                if(this.rightUp && this.playerCol < this.gridSizeX - 1){
                    if(this.canStepRight){
                        this.placeMarker(this.playerCol + (this.playerRow % 2), this.playerRow + 1, false);
                    }
                } else if (this.rightUp && this.playerCol == columnLength) {
                    this.placeMarker(this.playerCol + (this.playerRow % 2), this.playerRow + 1, false);
                }
            }
        }

        var elapsed = 64 * dt;

        if(this.playerHasMoved){
            this.hexGroup.y -= elapsed;
        }

        if(this.hexGroup.convertToWorldSpace(this.player.getPosition()).y > 250){
            this.hexGroup.y -= (96 * dt);
        }

        if(this.hexGroup.convertToWorldSpace(this.player.getPosition()).y < 100){
            this.game.gameOver();
        }

        if(this.hexGroup.convertToWorldSpace(this.player.getPosition()).y < (480 - 240)){
            //To-Do
        }

        var destroyedRow = false;

        for(var i = this.minRow; i < this.gridSizeY; i ++){

            for(var j = 0; j < this.gridSizeX; j ++){
                if((i % 2 === 0 || j < this.gridSizeX - 1) && this.hexGroup.convertToWorldSpace(this.hexagonArray[i][j].getPosition()).y  < 100){

                    if(this.gridSizeY - this.playerRow < 13){
                        this.addHexagonRow(this.gridSizeY);
                        this.gridSizeY ++;
                    }

                    if(this.gridSizeY > 9 && (this.gridSizeY % 18) == 17){
                        this.generateRandomRows(this.gridSizeY*2, this.gridSizeX);
                    }

                    this.hexagonArray[i][j].runAction(cc.sequence(cc.fadeOut(0.5),cc.callFunc(this.onFadedOut.bind(this.hexagonArray[i][j]), this)));
                    destroyedRow = true;
                }
            }
        }

        if(destroyedRow){
            this.minRow ++;
        }

    },

    onFadedOut:function(node){
        node.getComponent('Hexagon').state = node.getComponent('Hexagon').State.Invisible;
        node.removeFromParent(true);
    },

    traceNextPos: function(overlay){

        var level = !overlay?this.level_base:this.level_overlay;

        if((this.playerRow % 2 == 1)){
            console.log("Next left:" + level[(this.playerRow+1) % 9][this.playerCol]);
            console.log("Next right:" + level[(this.playerRow+1) % 9][this.playerCol+1]);
        }else{
            console.log("Next left:" + level[(this.playerRow+1) % 9][this.playerCol-1]);
            console.log("Next right:" + level[(this.playerRow+1) % 9][this.playerCol]);
        }
    },
});
