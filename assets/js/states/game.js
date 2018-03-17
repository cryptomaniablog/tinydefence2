var tinydefence = tinydefence || {};

tinydefence.rungame = {

    preload: function() {
    },

    create: function() {
        // Set cavans background
        this.game.stage.backgroundColor = "#1e1a17";
        
        // Create a copy of the intial game settings
        this.model = {
            currentMapIndex: tinydefence.game.model.currentMapIndex,
            money: tinydefence.game.model.money,
            currentWave: tinydefence.game.model.currentWave,
            lives: tinydefence.game.model.lives,
        }
        
        this.gameEnd = false;
       
        this.createMap();

        this.model.currentWave = -1;
        this.nextWaveOrLevel();
        
        this.scoreText = this.game.add.bitmapText(
            4, this.game.height - 16,
            'font1', 
            "",
            16);
    },

    createMap() {
        // Load current map
        this.currentMap = tinydefence.maps[this.model.currentMapIndex];
        
        // Create tilemap
        this.map = this.game.add.tilemap(this.currentMap.key);
        this.map.addTilesetImage('Sprites', this.currentMap.key + '_sprites');
        this.layer = this.map.createLayer('Level');
        
        let mapdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[0].data;
        let waypointdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[1].data;

        this.defencegame = new DefenceGame(16, 16, 30, 15, mapdata, waypointdata, this.game, this.model);
    },

    nextWaveOrLevel() {

        this.model.currentWave += 1;

        // Next map if no next wave exists
        if(this.model.currentWave >= this.currentMap.waves.length 
            && this.model.currentMapIndex < tinydefence.maps.length) {

            // Next map/level
            this.model.currentMapIndex++;
            this.createMap();
            
            // Soft reset the game model for the next level            
            this.model.money += tinydefence.game.model.money; 
            this.model.lives = tinydefence.game.model.lives; 
            this.model.currentWave = 0; 
        }

        // Next wave if exists
        if(this.model.currentWave < this.currentMap.waves.length) {

            // Get current wave and create a clone
            this.wave = Object.assign({}, this.currentMap.waves[this.model.currentWave]);
    
            this.nextEnemy = this.game.time.now;
            this.wavestart = this.game.time.now + 5000;
        }
    },
    
    update: function() {
        
        // Go back to menu on click if the game is over
        if(this.gameEnd && (this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown)) {
            this.game.state.start("Menu");
        }

        // Get a small warm up phase
        if(this.game.time.now < this.wavestart) {
            console.log("start in " + Math.floor((this.wavestart - this.game.time.now)/1000));
            
        } else {
            // Drop new enemies?
            if(this.game.time.now > this.nextEnemy && this.wave.maxEnemies > 0) {
                this.wave.maxEnemies -= 1;
                this.defencegame.addEnemy(this.wave.enemyHealth, this.wave.enemySpeed, this.wave.points);
                this.nextEnemy = this.game.time.now + this.wave.dropInMillis;
            }
    
            // All enemies dead?
            if(this.defencegame.enemies.length === 0 && this.gameEnd === false) {
                // Give a little bonus to frugal players
                this.model.money += Math.round(this.model.money * 0.1);
                this.nextWaveOrLevel();
            }
        }
        
        this.defencegame.update();
        
        // Update score
        this.scoreText.setText(
            `Wave: ${this.model.currentWave+1}/${this.currentMap.waves.length}     $: ${this.model.money}     Lives: ${this.model.lives}`);
            
        if(this.model.currentWave > this.currentMap.waves.length) {
            this.scoreText.setText("You won the game");
            this.gameEnd = true;
        }
        
        // Is the player dead?
        if(this.model.lives <= 0) {
            this.scoreText.setText("You lost the game");
            this.gameEnd = true;
        }
    },
        
}