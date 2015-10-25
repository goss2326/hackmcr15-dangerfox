module Dangerfox.Cara.Components
{
    export class Item
    {
        public potion: String;
        constructor(protected game: Phaser.Game, private spriteKey: string)
        {

        }

        public preload(spritesheetUrl: string, frameWidth: number, frameHeight: number)
        {
            this.game.load.spritesheet(
                this.spriteKey,
                spritesheetUrl,
                frameWidth,
                frameHeight
            );
        }
    }
}
    