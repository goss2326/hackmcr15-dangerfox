module Dangerfox.Cara.Components
{
    export abstract class Quest
    {
        public questId: number;
        public name: string;
        public description: string;
        public npcId: number;
        public previousQuestId: number;
        public isActive: boolean;

        constructor(private game: Phaser.Game)
        {
            this.isActive = true;
        }
    }

    export class KillQuest extends Quest
    {
        public targetId: number;
        public amount: number;

        constructor(game: Phaser.Game)
        {
            super(game);
        }
    }

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