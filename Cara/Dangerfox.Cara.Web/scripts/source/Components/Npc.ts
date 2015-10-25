module Dangerfox.Cara.Components
{
    export class Npc extends Character
    {
        public quest: Quest;

        constructor(game: Phaser.Game, spriteKey: string)
        {
            super(game, spriteKey);
        }

        public preload(spritesheet: string, spriteWidth: number, spriteHeight: number) {
            super.preload(
                spritesheet,
                spriteWidth,
                spriteHeight
            );
        }

        public create(
            health: number,
            baseDamage: number,
            movementSpeed: number,
            direction: Support.Direction,
            startPosition: Phaser.Point,
            spriteData: any)
        {
            super.create(100000000, 0, 96, direction, startPosition, spriteData);
        }
    }
}