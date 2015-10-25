module Dangerfox.Cara.Components
{
    export class Player extends Character
    {
        private inventory: Inventory;
        private quests: Support.Collection<Quest>;

        constructor(game: Phaser.Game)
        {
            super(game, "player");
            this.inventory = new Inventory();

            this.quests = new Support.Collection<Quest>();
        }

        public preload(spritesheet: string, spriteWidth: number, spriteHeight: number)
        {
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
            super.create(health, baseDamage, movementSpeed, direction, startPosition, spriteData);
        }

        public update()
        {
            this.game.debug.text("Player Health: " + this.health, 25, 25, "#ffffff");

            if (this.quests.Count() > 0)
            {
                this.game.debug.text("Quest: " + this.quests.GetItem(0).description, 25, 50, "#ffffff");
            }

            this.processInput();
        }

        public receiveQuest(quest: Quest)
        {
            this.quests.Add(quest);
        }

        public pickUp(item: Item)
        {
            this.inventory.Add(item);
        }

        public usePotion(potion: Item)
        {
            if (this.health < 2000)
            {
                this.health += potion.heal;
                this.inventory.UseItem(potion);
            }
        }

        private processInput()
        {
            var input: boolean = false;
            this.attacking = false;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.R))
            {
                var potion = this.inventory.GetPotion();
                if (potion != null)
                {
                    this.usePotion(this.inventory.GetPotion());
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                input = true;
                this.attacking = true;
            }

            // process input to change player direction
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                input = true;

                this.direction = Support.Direction.Left;
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                input = true;

                this.direction = Support.Direction.Right;
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                input = true;

                this.direction = Support.Direction.Down;
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                input = true;

                this.direction = Support.Direction.Up;
                this.move(this.direction);
            }

            if (this.attacking)
            {
                switch (this.direction)
                {
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
            else if (input)
            {
                switch (this.direction)
                {
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

            if (!input)
            {
                this.idle(this.direction);
            }
        }


    }
}