class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }

    preload() {
        this.load.image('backgroundforAll', 'assets/background/BG_ForAll.png');
        this.load.image('backButton', 'assets/ui_buttons/back_button.png');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'backgroundforAll').setOrigin(0).setDisplaySize(1905, 920);

        this.add.text(centerX, centerY - 200, 'Credits', {
            font: '64px Sans',
            fill: 'white'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'Game made by Rico Dayoc\n\nA224\n\nBachelor of Science in Entertainment and Multimedia Computing', {
            font: '32px Sans',
            fill: 'white',
            align: 'center'
        }).setOrigin(0.5);

        const backButton = this.add.image(centerX, 700, 'backButton').setInteractive().setScale(2);

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }

    update() {}
}