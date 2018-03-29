var tinydefence = tinydefence || {};

tinydefence.preload = function(game) {};

tinydefence.preload.prototype = {

	preload: function() {
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'assets/images/enemyCrab.png', 16, 16);
<<<<<<< HEAD
		this.game.load.spritesheet('buttonCoverage', 'assets/images/ui/buttonCoverage.png', 32, 18);
		
		this.game.load.image('buildmenu', 'assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('Cannon_0_tower', 'assets/towers/Cannon/tower_1.png', 16, 16);
		this.game.load.image('Cannon_0_shot', 'assets/towers/Cannon/bullet_1.png');

		tinydefence.towers.forEach(tower => {
			this.game.load.json(tower.key + '_json', 'assets/towers/' + tower.key + '/properties.json');
		});
=======
		this.game.load.spritesheet('buttonCoverage', 'assets/images/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'assets/images/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'assets/images/buttonMenuNav.png', 20, 18);
>>>>>>> 165eea34a6e5193ead17b88143ace6017529fcad

		this.game.load.bitmapFont('font_white', 
			'assets/fonts/font.png',
			'assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green', 
			'assets/fonts/font_green.png',
			'assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red', 
			'assets/fonts/font_red.png',
			'assets/fonts/font_red.fnt');

		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {
			this.game.load.tilemap(map.key, map.data, null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image(map.key + '_sprites', map.sprite);
		});

		// Load all tower assets
		tinydefence.towerManager.load();
	},
	
	create: function() {
		this.game.state.start("Menu");
	}
}