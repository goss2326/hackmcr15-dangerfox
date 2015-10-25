module Dangerfox.Cara.Components
{
    export class LootQuest extends Quest
    {
        public itemId: number;
        public amount: number;

        constructor(game: Phaser.Game)
        {
            super(game);
        }
    }
}