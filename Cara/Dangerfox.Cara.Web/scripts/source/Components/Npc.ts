module Dangerfox.Cara.Components {
    export class Npc extends Character {
        public quests: Support.Collection<Quest>;

        constructor(game: Phaser.Game, spriteKey: string)
        {
            super(game, spriteKey);

            this.quests = new Support.Collection<Quest>();
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
            spriteData: any) {
            super.create(100000000, 0, 96, direction, startPosition, spriteData);
        }

        public addQuest(
            questId: number,
            type: string,
            name: string,
            description: string,
            previousQuestId: number,
            targetId: number,
            amount: number) {
            switch (type) {
                case "kill":
                    var quest1 = new KillQuest(this.game);
                    quest1.questId = questId;
                    quest1.name = name;
                    quest1.description = description;
                    quest1.previousQuestId = previousQuestId;
                    quest1.targetId = targetId;
                    quest1.amount = amount;
                    this.quests.Add(quest1);
                    break;

                case "loot":
                    var quest2 = new LootQuest(this.game);
                    quest2.questId = questId;
                    quest2.name = name;
                    quest2.description = description;
                    quest2.previousQuestId = previousQuestId;
                    quest2.itemId = targetId;
                    quest2.amount = amount;
                    this.quests.Add(quest2);
                    break;

                default:
                    break;
            }
        }

        public getNextQuest():Quest
        {
            if (this.quests.Count() > 0)
            {
                var quest = this.quests.GetItem(0);

                this.quests.Delete(0);

                return quest;
            }
            else
            {
                return null;
            }
        }
    }
}