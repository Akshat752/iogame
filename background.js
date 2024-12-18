export class Background {
    constructor() {
        this.container = new app.container();
        this.createSprites();
    }

    createSprites() {
        this.sprites = [];
        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = app.sprite("background.jpg")
        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }
}