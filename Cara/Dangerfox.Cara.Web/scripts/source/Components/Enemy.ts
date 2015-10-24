module Dangerfox.Cara.Components
{
    export class Enemy extends Character
    {
        constructor(game: Phaser.Game)
        {
            super(game, "enemy", 64.0, 300);
        }

        public preload(spritesheet: string, spriteWidth: number, spriteHeight: number)
        {
            super.preload(
                spritesheet,
                spriteWidth,
                spriteHeight
            );
        }

        public create(spriteData: any, startPosition: Phaser.Point)
        {
            super.create(startPosition, new Phaser.Point(1, 1), spriteData);
        }

        public update()
        {
            this.idle(this.direction);
        }
    }
}