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
        this.playerJumping = false;

        this.speed = 64;

        this.hexagonArray = [];
        this.hexagonWidth = 64;
        this.hexagonHeight = 64;
        this.minRow = 0;

        this.lastMove = 'left';

        this.currentDepth = 0;

        this.node.removeChild(this.player);
        //initialize hexagons
        this.hexGroup = new cc.Node();
        this.hexGroup.setAnchorPoint(cc.p(0,1))
        this.hexGroup.setPosition(cc.p(0,0));
        this.node.addChild(this.hexGroup);
        this.hexGroup.x += this.hexagonWidth/2 + (480 - this.gridSizeX*this.hexagonWidth)/2 ;
        this.hexGroup.y -= this.hexagonHeight + 320 ;

        // this.generateRandomRows(this.gridSizeY*2, this.gridSizeX);
        this.generatePredefinedRows(this.gridSizeY, this.gridSizeX, 2);
        this.generatePredefinedRows(this.gridSizeY, this.gridSizeX, 1);

        for(var i = 0; i < this.gridSizeY; i ++){
            this.addHexagonRow(i);
        }
        this.hexGroup.addChild(this.player);

        // initialize player
        this.player.getComponent('Player').group = this;
        var markerX = (this.hexagonWidth * (2 * this.playerCol + 1 + this.playerRow % 2) / 2) - this.hexagonWidth / 2;
        var markerY = (this.hexagonHeight * (3 * - this.playerRow + 1) / 4) + 128/4;
        this.markerStartPosition = cc.p(markerX, markerY);
        this.player.setPosition(this.markerStartPosition);
        this.player.setLocalZOrder(1000);
        this.playerState = "neutral";

        // initialize input
        this.leftUp = false;
        this.rightUp = false;
        this.canStepLeft = false;
        this.canStepRight = false;

        //background
        this.game.background.setPosition(0,1190);

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

    generatePredefinedRows:function(rows, columns, style) {
        //building viable ground layer
        var rows_ground = [];
        var columns_ground = [];

        //building overlay layer
        var rows_overlay = [];
        var columns_overlay = [];

        var self = this;

        switch (style){
            case 1:
            rows_ground = [[1,1,11,1,44],[1,13,13,1],[44,1,1,13,1],[1,1,43,1],[44,32,13,1,44],[32,1,10,1],[31,1,41,10,1],[31,41,10,1],[1,31,41,10,7],[7,1,10,42],[1,1,1,1,44],[1,43,1,44]];
            break;
            case 2:
			rows_ground = [[44,1,1,1,44],[99,99,8,99],[99,99,11,99,99],[99,8,41,99],[99,8,99,7,99],[8,41,99,41],[41,99,13,99,7],[41,8,99,8],[99,41,99,41,99],[99,99,8,99],[99,1,42,1,99],[44,1,1,44]];
			break;
        }
        var tempGroundArray = [];
        for (var i=0; i < rows_ground.length; i++) {
            var innerArray = [];
            for (var j=0; j < rows_ground[i].length; j++) {
                switch (rows_ground[i][j]) {
                    case 41:
                    innerArray.push(1);
                    break;
                    case 42:
                    innerArray.push(1);
                    break;
                    case 43:
                    innerArray.push(1);
                    break;
                    case 44:
                    innerArray.push(1);
                    break;
                    default:
                    innerArray.push(rows_ground[i][j]);
                }
            }
            tempGroundArray.push(innerArray);
        }
        this.level_base = this.level_base.concat(tempGroundArray);
        var tempOverlayArray = [];
        for (var i=0; i < rows_ground.length; i++) {
            var innerArray = [];
            for (var j=0; j < rows_ground[i].length; j++) {
                switch (rows_ground[i][j]) {
                    case 41:
                    innerArray.push(5);
                    break;
                    case 42:
                    innerArray.push(12);
                    break;
                    case 43:
                    innerArray.push(6);
                    break;
                    case 44:
                    innerArray.push(4);
                    break;
                    default:
                    innerArray.push(0);
                }
            }
            tempOverlayArray.push(innerArray);
        }
        this.level_overlay = this.level_overlay.concat(tempOverlayArray);
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

            var trapsPerRow = 0;

            if(i % 2 == 1 ){
                columnLength -=  1;
            }

            for(var j = 0; j < columnLength; j ++){

                if(i===0 || i===rows-1){
                    columns_ground[j] = 1;
                } else if (trapsPerRow <= 1){
                    var r = Math.random();
                    columns_ground[j] = 1
                    if(r <= 0.1){
                        columns_ground[j] = 8;
                        trapsPerRow += 1;
                    }else if(r > 0.1 && r <0.2){
                        columns_ground[j] = 7;
                        trapsPerRow += 1;
                    }else if(r > 0.2 && r <0.3){
                        columns_ground[j] = 10;
                        trapsPerRow += 1;
                    }else if(r > 0.3 && r <0.4){
                        columns_ground[j] = 11;
                        trapsPerRow += 1;
                    }
                } else {
                    columns_ground[j] = 1;
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
                if(rand < 0.2){
                    if(k > 0 && rows_ground[k][l] == 1 && treesPerRow < maxTreesPerRow){
                        if(l > 0 && l < columnLength){
                            if(columns_overlay[l-1] != 4){
                                columns_overlay[l] = 4;
                                treesPerRow++;
                            }
                        } else{
                            columns_overlay[l] = 4;
                            treesPerRow++;
                        }

                    }
                }
                //stars
                else if(rand >= 0.4 && rand < 0.85){
                    if(k > 0 && (rows_ground[k][l] == 1 || rows_ground[k][l] == 2)){
                        if(Math.random()<0.4){
                            columns_overlay[l] = 5;
                        }
                    }
                }else{

                    if(k > 0 && rows_ground[k][l] != 0 && rows_ground[k][l] != 10){
                        //flipped, trap, sticky...
                        var rand2 = Math.random();
                        if(rand2 <= 0.2){
                            columns_overlay[l] = 6;
                        }else if(rand2 > 0.4 && rand2 <= 0.65){
                            columns_overlay[l] = 12;
                        }else if(rand2 > 0.85){
                            // columns_overlay[l] = 8;
                        }
                    }
                }

            }
            rows_overlay[k] = columns_overlay;
            columns_overlay = [];
        }

        if (this.spawnSlides) {
            //Water slides

            var length1 = this.getRandomArbitrary(3,7);

            var offsetX1 = this.getRandomArbitrary(1,3);
            var offsetY1 = this.getRandomArbitrary(1,13);

            var currentOffset = offsetX1;

            for(var u = 0; u<length1;u++){
                var r = Math.random();
                if(u==length1-1){
                    // rows_ground[offsetY1+u][offsetX1] = 1;
                    // rows_overlay[offsetY1+u][offsetX1] = 3;
                } else if ((offsetY1+u)%2 == 0){   //(offsetY1+u)%2 == 0
                    if (r < 0.51) {
                        rows_ground[offsetY1+u][currentOffset] = 32;
                        rows_overlay[offsetY1+u][currentOffset] = 98;
                    } else {
                        rows_ground[offsetY1+u][currentOffset+1] = 31;
                        rows_overlay[offsetY1+u][currentOffset+1] = 98;
                        currentOffset += 1;
                    }
                } else {
                    if(r < 0.51) {
                        rows_ground[offsetY1+u][currentOffset-1] = 32;
                        rows_overlay[offsetY1+u][currentOffset-1] = 98;
                        currentOffset -= 1;
                    } else {
                        rows_ground[offsetY1+u][currentOffset] = 31;
                        rows_overlay[offsetY1+u][currentOffset] = 98;
                    }
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
            case 10:
            result= "lava";
            break;
            case 11:
            result= "posion";
            break;
            case 12:
            result= "potion";
            break;
            case 13:
            result= "treejump";
            break;
            case 99:
            result= "missing";
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
                    }
                } else {
                    self.rightUp = false;
                    if(self.game.flipped){
                        self.leftUp = false;
                    }
                }
            },
        }, self.node);

        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: function(keyCode, event) {
                if(self.game.gameState !== self.game.GameState.Run){
                    return;
                }
                if(!self.running && !self.playerHasMoved){
                    self.startGame();
                }
                if(this.playerJumping){return;}

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
                    }
                    break;
                    case cc.KEY.d:
                    self.rightUp = false;
                    if(self.game.flipped){
                        self.leftUp = false;
                    }
                    break;
                    case cc.KEY.x:
                        self.game.displayMenu();
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
            var nextY = this.hexagonHeight * (3 * posY + 1) / 4  + 128/4; // + (80-57)/2;

            this.player.getComponent('Player').move(nextX, nextY, left, false);

    },
    jumpMarker: function(posX, posY, left){
            this.playerJumping = true;

            this.playerCol = posX;
            this.playerRow = posY;

            var nextX = (this.hexagonWidth * (2 * posX + 1 + posY % 2) / 2)  - this.hexagonWidth/2;
            var nextY = this.hexagonHeight * (3 * posY + 1) / 4  + 128/4; // + (80-57)/2;

            this.player.getComponent('Player').move(nextX, nextY, left, true);
    },

    moveFinished: function(){
        try {
            this.game.flipped = false;
            this.hexagonArray[this.playerRow][this.playerCol].getComponent('Hexagon').animateBounce();
            this.player.getComponent('Player').bounceWithCube();
            this.hexagonArray[this.playerRow][this.playerCol].getComponent('Hexagon').checkAction();
            this.playerMove = true;
            this.speed += 0.5;
            this.checkNextSteps();
        } catch (e) {
            this.player.getComponent('Player').dropToDeath();
        }

    },
    jumpFinished: function(){
        try {
            this.game.flipped = false;
            this.hexagonArray[this.playerRow][this.playerCol].getComponent('Hexagon').animateBounce();
            this.player.getComponent('Player').bounceWithCube();
            this.playerJumping = false;
            this.hexagonArray[this.playerRow][this.playerCol].getComponent('Hexagon').checkAction();

            this.speed += 0.5;
            this.checkNextSteps();
        } catch (e) {
            this.player.getComponent('Player').dropToDeath();
        }

    },

    checkPlayerStatus: function(row,col,event,spikeOut){

        var self = this;

        switch(event){

            case 'explosion':
            if(this.playerRow == row && this.playerCol == col){
                self.game.gameOver();
            }
            break;
            case 'trap':
            if(this.playerRow == row && this.playerCol == col){
                this.player.getComponent('Player').dropToDeath();
            }
            break;
            case 'poison':
            self.playerState = "poisoned";
            self.player.getComponent("Player").player.spriteFrame = self.player.getComponent("Player").atlas.getSpriteFrame('player_poisoned');
            setTimeout(function (){
                if(self.playerState == "poisoned") {
                    self.game.gameOver();
                }
            }, 7000);
            break;
            case 'antipoison':
            self.playerState = "neutral";
            self.player.getComponent("Player").player.spriteFrame = self.player.getComponent("Player").atlas.getSpriteFrame('player');
            break;
            case 'missing':
            this.player.getComponent('Player').dropToDeath();
            break;
            case 'spike':
            if(this.playerRow == row && this.playerCol == col){
                if(spikeOut){
                    self.game.gameOver();
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
            var currentBase = this.level_base[this.playerRow][this.playerCol];

            if(currentBase == 3 || currentBase == 31 || currentBase == 32){

                this.playerSlide = true;
                var nextWaterTile = -1;
                var columnLength = this.gridSizeX;

                if(this.playerRow % 2 == 0 ){
                    columnLength -=  1;
                }

                for(var i = 0; i < columnLength; i++){
                    var nextRow = this.level_base[this.playerRow+1];
                    if(nextRow[i] == 3 || nextRow[i] == 31 || nextRow[i] == 32){
                        nextWaterTile = i;
                    }
                }

                if(nextWaterTile > -1){
                    var columnLength = this.gridSizeX;

                    if(this.playerRow % 2 == 0 ){
                        columnLength -=  1;
                    }

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

            if(this.playerMove && !this.playerSlide && !this.playerJumping){
                var columnLength = this.gridSizeX;
                if(this.playerRow % 2 == 0 ){
                    columnLength -=  1;
                }
                if(this.leftUp && (this.playerCol > 0 || (this.playerRow % 2 == 1))){
                    if(this.canStepLeft){
                        this.lastMove = 'left';
                        this.placeMarker(this.playerCol - (1 - this.playerRow % 2), this.playerRow + 1, true);
                    }
                } else if (this.leftUp && (this.playerCol == 0 || (this.playerRow % 2 == 1))) {
                    this.placeMarker(this.playerCol - (1 - this.playerRow % 2), this.playerRow + 1, true);
                }
                if(this.rightUp && this.playerCol < this.gridSizeX - 1){
                    if(this.canStepRight){
                        this.lastMove = 'right';
                        this.placeMarker(this.playerCol + (this.playerRow % 2), this.playerRow + 1, false);
                    }
                } else if (this.rightUp && this.playerCol == columnLength) {
                    this.placeMarker(this.playerCol + (this.playerRow % 2), this.playerRow + 1, false);
                }
            }
        }

        var elapsed = this.speed * dt;

        if(this.playerHasMoved){
            this.hexGroup.y -= elapsed;
            //Scroll BG
            var backgroundPositionY = this.game.background.getPosition().y;
            backgroundPositionY -= 1;
            this.game.background.setPosition(0,backgroundPositionY);
        }

        if(this.hexGroup.convertToWorldSpace(this.player.getPosition()).y > 250){
            this.hexGroup.y -= ((32 + this.speed) * dt);
            //Scroll BG
            var backgroundPositionY = this.game.background.getPosition().y;
            backgroundPositionY -= 2;
            this.game.background.setPosition(0,backgroundPositionY);
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
                        // this.generatePredefinedRows(this.gridSizeY, this.gridSizeX, this.getRandomArbitrary(1,50));
                        // this.generatePredefinedRows(this.gridSizeY, this.gridSizeX, this.getRandomArbitrary(1,50));
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
