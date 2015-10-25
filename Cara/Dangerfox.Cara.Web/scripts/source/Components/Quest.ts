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

        constructor(protected game: Phaser.Game)
        {
            this.isActive = true;
        }
    }
}