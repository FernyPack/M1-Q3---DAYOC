class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    preload() {
        this.load.image("backgroundforAll", "assets/background/bG_ForAll.png");
        this.load.image("replayButton", "assets/ui_buttons/replay_button.png");
        this.load.image("menuButton", "assets/ui_buttons/menu_button.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, "backgroundforAll").setOrigin(0).setDisplaySize(1905, 920);

        this.add.text(centerX, centerY - 100, 'YOU WIN!', {
            font: "60px Sans",
            fill: "White"
            }).setOrigin(0.5);

        this.add.image(centerX - 25, centerY + 20, 'replayButton')
            .setInteractive()
            .setScale(2)
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });

        this.add.image(centerX + 25, centerY + 20, 'menuButton')
            .setInteractive()
            .setScale(2)
            .on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
    }
}