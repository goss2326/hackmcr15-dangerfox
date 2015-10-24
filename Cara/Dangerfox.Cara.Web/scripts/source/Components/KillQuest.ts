module Dangerfox.Cara.Components
{
    export class KillQuest extends Quest
    {
        public targetId: number;
        public amount: number;

        constructor(game: Phaser.Game)
        {
            super(game);
        }
    }
}