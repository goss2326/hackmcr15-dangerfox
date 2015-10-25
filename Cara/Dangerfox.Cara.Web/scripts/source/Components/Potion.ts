module Dangerfox.Cara.Components
{
    export class Potion extends Item
    {
        public heal: number;

        constructor(protected game: Phaser.Game)
        {
            super(game, "potion");
        }

        public preload(spritesheet: string)
        {
            super.preload(spritesheet);
        }

        public create(
            heal: number,
            startPosition: Phaser.Point) {
            super.create(heal, startPosition);
            this.heal = heal;
        }

    }
}