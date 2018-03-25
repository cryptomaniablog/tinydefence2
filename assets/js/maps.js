var tinydefence = tinydefence || {};

class Map {
    constructor(game, pathDirMap) {
        this.game = game

        this.pathDirMap = pathDirMap;

        this.name = null;
        this.tilemap = null;
        this.sprite = null;
    }

    preload() {
        this.keyTilemap = `map_${Map.count}`;
        let pathFileJSON = `${this.pathDirMap}\\map.json`;
        this.game.load.tilemap(this.keyTilemap, pathFileJSON, null, Phaser.Tilemap.TILED_JSON);

        this.keySprite = `tileset_${Map.count}`;
        let pathFileSprite = `${this.pathDirMap}\\map.png`;
        this.game.load.image(this.keySprite, pathFileSprite);

        Map.count += 1;
    }

    get width() {
        return this.tilemap.width;
    }

    get height() {
        return this.tilemap.height;
    }

    getTile(x, y, nameLayer) {
        let layer = this.tilemapLayers[nameLayer];

        return this.tilemap.getTile(x, y, layer);
    }

    setActive() {
        this.tilemap = this.game.add.tilemap(this.keyTilemap);

        this.tilemapLayers = {
            'Level': this.tilemap.createLayer('Level'),
            'Waypoints': this.tilemap.createLayer('Waypoints')
        };

        this.tilemapLayers.Waypoints.visible = false;
    
        //this.data = this.game.cache.getTilemapData(this.keyTilemap).data;

        let keyTileset = this.tilemap.tilesets[0].name;
        this.tilemap.addTilesetImage(keyTileset, this.keySprite);
    }
}
Map.count = 0;

tinydefence.Map = Map

tinydefence.maps = [
    
    {
        // Key for this map
        key: 'level1',
        // Path to map data
        data: 'assets/maps/Level1/map.json',
        // Path to map sprite
        sprite: 'assets/maps/Level1/map.png',
        // Readable name for this map/level
        name: 'Level 1',
        // Start point for the enemies
        start: {x: 0, y: 1},
        // End point for the enemies
        end: {x: 16, y: 14},
        // Waves
        waves: [
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 10, enemySpeed: 20, points: 5, type: 'enemy'},
            {dropInMillis: 1500, maxEnemies: 4,  enemyHealth: 20, enemySpeed: 40, points: 5, type: 'enemy'},
            {dropInMillis: 2000, maxEnemies: 6,  enemyHealth: 20, enemySpeed: 60, points: 5, type: 'enemy'},
            {dropInMillis: 1500, maxEnemies: 8,  enemyHealth: 20, enemySpeed: 60, points: 5, type: 'enemy'},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 20, enemySpeed: 60, points: 5, type: 'enemy'},
            {dropInMillis: 1000, maxEnemies: 15, enemyHealth: 20, enemySpeed: 60, points: 5, type: 'enemy'},
            {dropInMillis: 800,  maxEnemies: 20, enemyHealth: 20, enemySpeed: 60, points: 5, type: 'enemy'},
            // Add more waves here
        ]
    },
    {
        // Key for this map
        key: 'BeachDefense',
        // Path to map data
        data: 'assets/maps/BeachDefense/map.json',
        // Path to map sprite
        sprite: 'assets/maps/BeachDefense/map.png',
        // Readable name for this map/level
        name: 'Beach Defense',
        // Start point for the enemies
        start: {x: 1, y: 10},
        // End point for the enemies
        end: {x: 28, y: 10},
        // Waves
        waves: [
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 15,  enemySpeed: 30,  points: 10,  type: 'crab'},
            {dropInMillis: 2000, maxEnemies: 1,  enemyHealth: 100, enemySpeed: 40,  points: 30, type: 'crab'},
            {dropInMillis: 650,  maxEnemies: 30, enemyHealth: 5,   enemySpeed: 100, points: 2,  type: 'crab'},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 15,  enemySpeed: 60,  points: 5,  type: 'crab'},
            {dropInMillis: 1000, maxEnemies: 14, enemyHealth: 20,  enemySpeed: 60,  points: 5,  type: 'crab'},
            {dropInMillis: 800,  maxEnemies: 18, enemyHealth: 20,  enemySpeed: 60,  points: 5,  type: 'crab'},
            // Add more waves here
        ]
    },
];