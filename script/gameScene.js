class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image("background", "assets/background/Game_Background.png");

    this.load.spritesheet("player", "assets/player/_Idle.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("player_fall", "assets/player/_Fall.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("player_run", "assets/player/_Run.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("player_jump", "assets/player/_Jump.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("enemy", "assets/enemy/Skeleton enemy.png", { frameWidth: 64, frameHeight: 58 });
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0).setDisplaySize(1905, 920);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(950, 850, null).setDisplaySize(1905, 5).setOrigin(0.5).setVisible(false).refreshBody();

    this.player = this.physics.add.sprite(80, 700, "player");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(2);
    this.player.body.setSize(20, 37);
    this.player.body.setOffset(45, 43);

    this.enemy = this.physics.add.sprite(1000, 700, "enemy");
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setScale(3);
    this.enemy.body.setSize(38, 33);
    this.enemy.body.setOffset(5, 25);
    this.enemy.setVelocityX(50);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy, this.ground);

    this.score = 0;
    let style = { font: "30px Sans", fill: "White" };
    this.textScore = this.add.text(20, 20, "Score: " + this.score, style);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    this.physics.add.overlap(this.player, this.enemy, this.collectEnemy, null, this);
    this.setupAnimations();
  }

  update() {
    this.handlePlayerMovement();
    this.moveEnemy();
  }

  handlePlayerMovement() {
    const keys = this.cursors;
    const player = this.player;

    if (keys.left.isDown) {
      player.setVelocityX(-300);
      player.anims.play('run', true);
      player.flipX = true;
      player.body.setOffset(55, 43);
    } else if (keys.right.isDown) {
      player.setVelocityX(300);
      player.anims.play('run', true);
      player.flipX = false;
      player.body.setOffset(45, 43);
    } else {
      player.setVelocityX(0);
      player.anims.play('idle', true);
    }

    if ((keys.up.isDown || keys.jump.isDown) && player.body.touching.down) {
      player.setVelocityY(-400);
    } else if (!player.body.touching.down) {
      player.anims.play('jump', true);
    }

    if (player.body.velocity.y > -100 && !player.body.touching.down) {
      player.anims.play('fall', true);
    }
  }

  moveEnemy() {
    const enemy = this.enemy;

    if (enemy.body.velocity.x > 0 && enemy.x >= 1500) {
      enemy.setVelocityX(-50);
      enemy.flipX = true;
      enemy.body.setOffset(21, 25);
    } else if (enemy.body.velocity.x < 0 && enemy.x <= 100) {
      enemy.setVelocityX(50);
      enemy.flipX = false;
      enemy.body.setOffset(5, 25);
    }

    enemy.anims.play('enemy_Walk', true);
  }

  collectEnemy(player, enemy) {
    enemy.disableBody(true, true);
    this.score += 100;
    this.textScore.setText('Score: ' + this.score);

    this.scene.start('WinScene');
  }

  setupAnimations() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 9 }),
      frameRate: 14,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player_jump', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('player_fall', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'enemy_Walk',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }
}
