const config = {
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
    scene: [MainMenu, GameScene, WinScene, CreditsScene]
};

const game = new Phaser.Game(config);