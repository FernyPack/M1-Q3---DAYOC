let config = {
    type: Phaser.AUTO,
    width: 1905,
    height: 920,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

// VARIABLES

let player, enemy, cursors, textScore, score, ground;

// ASSETS
function preload() {
    // Background
    this.load.image("background", "assets/background/Background.png");

    // Player Animations
    this.load.spritesheet("player", "assets/player/_Idle.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("player_fall", "assets/player/_Fall.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("player_run", "assets/player/_Run.png", { frameWidth: 120, frameHeight: 80 });
    this.load.spritesheet("player_jump", "assets/player/_Jump.png", { frameWidth: 120, frameHeight: 80 });

    // Enemy Animations
    this.load.spritesheet("enemy", "assets/enemy/Skeleton enemy.png", { frameWidth: 64, frameHeight: 58 });

    // Replay Button
    this.load.image("replayButton", "assets/ui_buttons/replay_button.png");

}

function create() {
    // Background
    this.add.image(0, 0, "background").setOrigin(0).setDisplaySize(1905, 920);

    // Ground (Invisible Platform)
    ground = this.physics.add.staticGroup();
    ground.create(950, 850, null).setDisplaySize(1905, 5).setOrigin(0.5).setVisible(false).refreshBody();

    // Player Setup
    player = this.physics.add.sprite(80, 700, "player");
    player.setCollideWorldBounds(true);
    player.setScale(2);
    player.body.setSize(20, 37);
    player.body.setOffset(45, 43);

    // Enemy Setup
    enemy = this.physics.add.sprite(1000, 700, "enemy");
    enemy.setCollideWorldBounds(true);
    enemy.setScale(3);
    enemy.body.setSize(38, 33);
    enemy.body.setOffset(5, 25);
    enemy.setVelocityX(50); // Walks away player (right)

    // Collisions
    this.physics.add.collider(player, ground);
    this.physics.add.collider(enemy, ground);

    // Score
    score = 0;
    let style = { font: "30px Sans", fill: "White" };
    textScore = this.add.text(20, 20, "Score: " + score, style);

    cursors = setupControls(this);

    setupAnimations(this);

    this.physics.add.overlap(player, enemy, collectEnemy, null, this);
}

function update() {
    handlePlayerMovement(player, cursors);
    moveEnemy();
}

// Player Movement
function handlePlayerMovement(player, keys) {
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

// ENEMY MOVEMENT
function moveEnemy() {
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

// ENEMY AND PLAYER COLLISION
function collectEnemy(player, enemy) {
    enemy.disableBody(true, true);
    score += 100;
    textScore.setText('Score: ' + score);

    // Win Message
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.text(centerX, centerY, 'YOU WIN!', {
        font: "60px Sans",
        fill: "White"
    }).setOrigin(0.5);

    const replayButton = this.add.image(centerX, centerY + 100, 'replayButton')
        .setInteractive()
        .setScale(2.5) // optional: adjust size
        .on('pointerdown', () => {
            this.scene.restart(); // 🔁 restarts the scene
        });
}

// INPUTS
function setupControls(scene) {
    return scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        jump: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
}

// ANIMATIONS
function setupAnimations(scene) {
    // Idle
    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    // Run
    scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNumbers('player_run', { start: 0, end: 9 }),
        frameRate: 14,
        repeat: -1
    });

    // Jump
    scene.anims.create({
        key: 'jump',
        frames: scene.anims.generateFrameNumbers('player_jump', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });

    // Fall
    scene.anims.create({
        key: 'fall',
        frames: scene.anims.generateFrameNumbers('player_fall', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    // Enemy Walk
    scene.anims.create({
        key: 'enemy_Walk',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
}