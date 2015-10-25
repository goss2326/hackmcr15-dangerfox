module Dangerfox.Cara.Components
{
    export abstract class Quest
    {
        public questId: number;
        public name: string;
        public description: string;
        public completeMessage: string;
        public npcId: number;
        public previousQuestId: number;
        public isActive: boolean;
        public type: string;

        constructor(private game: Phaser.Game)
        {
            this.isActive = true;
        }
    }

    export class KillQuest extends Quest
    {
        public targetId: string;
        public amount: number;

        private killed: number = 0;

        constructor(game: Phaser.Game)
        {
            super(game);

            this.type = "kill";
        }

        public increaseKilled()
        {
            this.killed++;

            if (this.killed >= this.amount)
            {
                this.isActive = false;
                Support.SmsHelper.sendText(this.completeMessage);
            }
        }
    }

    export class LootQuest extends Quest
    {
        public itemId: string;
        public amount: number;

        constructor(game: Phaser.Game)
        {
            super(game);

            this.type = "loot";
        }
    }
}