module Dangerfox.Cara.Components {
    export class Player extends Character {
        private experience = 0;

        private inventory: Inventory;
        private quests: Support.Collection<Quest>;

        constructor(game: Phaser.Game) {
            super(game, "player");

            this.inventory = new Inventory();
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
            super.create(health, baseDamage, movementSpeed, direction, startPosition, spriteData);
        }

        public update() {
            this.game.debug.text("Player Health: " + this.health, 25, 25, "#ffffff");
            this.game.debug.text("Experience Points: " + this.experience, 25, 50, "#ffffff");
          
            this.processInput();
        }

        public getCurrentQuestId(): number {
            if (this.quests.Count() > 0) {
                for (var i: number = 0; i < this.quests.Count(); i++) {
                    if (this.quests.GetItem(i).isActive) {
                        return this.quests.GetItem(i).questId;
                    }
                }
            }
            return -1;
        }

        public hasCompletedQuest(questId: number): boolean
        {
            for (var i = 0; i < this.quests.Count(); i++)
            {
                var quest = this.quests.GetItem(i);
                if (quest.questId === questId)
                {
                    return !quest.isActive;
                }
            }

            return false;
        }

        public updateQuestStatus(enemy: Enemy)
        {
            for (var i = 0; i < this.quests.Count(); i++)
            {
                var quest = this.quests.GetItem(i);
                if (!quest.isActive)
                {
                    continue;
                }
                
                if (quest.type === "kill")
                {
                    var killQuest = <KillQuest>quest;
                    if (killQuest.targetId === enemy.spriteKey)
                    {
                        killQuest.increaseKilled();
                    }
                }
            }
        }

        public setCurrentQuestComplete(id: number) {
            this.quests.GetItem(id).isActive = false;
            this.quests.GetItem(id).description = "Quest complete!";
        }

        public receiveQuest(quest: Quest) {
            if (this.quests.Count() === 0 || this.quests.GetItem(0).isActive === false) {
                this.quests.Add(quest);
            }
        }

        public pickUp(item: Item) {
            this.inventory.Add(item);
        }

        public usePotion(potion: Item) {
            if (this.health < this.maxHealth) {
                this.health += potion.heal;
                this.inventory.UseItem(potion);
            }
        }

        public addExperience(experience: number) {
            this.experience += experience;
        }

        private processInput() {
            var input: boolean = false;
            this.attacking = false;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                var potion = this.inventory.GetPotion();
                if (potion != null) {
                    this.usePotion(this.inventory.GetPotion());
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                input = true;
                this.attacking = true;
            }

            // process input to change player direction
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                input = true;

                this.direction = Support.Direction.Left;
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                input = true;

                this.direction = Support.Direction.Right;
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                input = true;

                this.direction = Support.Direction.Down;
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                input = true;

                this.direction = Support.Direction.Up;
                this.move(this.direction);
            }

            if (this.attacking) {
                switch (this.direction) {
                    case Support.Direction.Right:
                        this.sprite.animations.play("attack-" + Support.Direction.Right.toString());
                        break;

                    case Support.Direction.Down:
                        this.sprite.animations.play("attack-" + Support.Direction.Down.toString());
                        break;

                    case Support.Direction.Left:
                        this.sprite.animations.play("attack-" + Support.Direction.Left.toString());
                        break;

                    case Support.Direction.Up:
                        this.sprite.animations.play("attack-" + Support.Direction.Up.toString());
                        break;
                }
            }
            else if (input) {
                switch (this.direction) {
                    case Support.Direction.Right:
                        this.sprite.animations.play("move-" + Support.Direction.Right.toString());
                        break;

                    case Support.Direction.Down:
                        this.sprite.animations.play("move-" + Support.Direction.Down.toString());
                        break;

                    case Support.Direction.Left:
                        this.sprite.animations.play("move-" + Support.Direction.Left.toString());
                        break;

                    case Support.Direction.Up:
                        this.sprite.animations.play("move-" + Support.Direction.Up.toString());
                        break;
                }
            }

            if (!input) {
                this.idle(this.direction);
            }
        }
    }
}