class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image("backgroundforAll", "assets/background/bG_ForAll.png");
        this.load.image("playButton", "assets/ui_buttons/play_button.png");
        this.load.image("creditButton", "assets/ui_buttons/credit_button.png");
        this.load.image("exitButton", "assets/ui_buttons/exit_button.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 1.1;

        this.add.image(0, 0, "backgroundforAll").setOrigin(0).setDisplaySize(1905, 920);

        const playButton = this.add.image(centerX - 50, centerY, "playButton").setOrigin(1).setScale(2).setInteractive();
        const creditButton = this.add.image(centerX, centerY, "creditButton").setOrigin(1).setScale(2).setInteractive();
        const exitButton = this.add.image(centerX + 50, centerY, "exitButton").setOrigin(1).setScale(2).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        creditButton.on('pointerdown', () => {
            this.scene.start('CreditsScene');
        });

        exitButton.on('pointerdown', () => {
            if (confirm('Are you sure you want to quit?')) {
                window.close();

                alert('I\'m sad now T-T');
            }
        });

    }
}