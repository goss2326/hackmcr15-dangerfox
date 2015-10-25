module Dangerfox.Cara.Components
{
    export class Item
    {
        public type: String;
        public heal: number;
        public sprite: Phaser.Sprite;

        constructor(protected game: Phaser.Game, private spriteKey: string)
        {
            this.type = spriteKey;
        }

        public preload(spritesheetUrl: string)
        {
            this.game.load.image(
                this.spriteKey,
                spritesheetUrl
            );
        }

        public create(
            heal: number,
            startPosition: Phaser.Point)
        {
            this.heal = heal;

            // create the sprite
            this.sprite = this.game.add.sprite(
                startPosition.x,
                startPosition.y,
                this.spriteKey
            );

            // configure physics
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.collideWorldBounds = true;
        }
    }
}
    