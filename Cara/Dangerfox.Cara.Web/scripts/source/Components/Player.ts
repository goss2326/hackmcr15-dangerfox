module Dangerfox.Cara.Components
{
    export class Player extends Character
    {
        constructor(game: Phaser.Game)
        {
            super(game, "player", 32.0);
        }

        public preload(spritesheet: string, spriteWidth: number, spriteHeight: number)
        {
            super.preload(
                spritesheet,
                spriteWidth,
                spriteHeight
            );
        }

        public create(spriteData: any)
        {
            super.create(new Phaser.Point(0, 0), new Phaser.Point(1, 1), Support.Direction.Right);

            var animations = spriteData.animations;

            this.sprite.animations.add("move-" + Support.Direction.Right.toString(), animations.moveRight, animations.moveFps, true);
            this.sprite.animations.add("move-" + Support.Direction.Down.toString(), animations.moveDown, animations.moveFps, true);
            this.sprite.animations.add("move-" + Support.Direction.Left.toString(), animations.moveLeft, animations.moveFps, true);
            this.sprite.animations.add("move-" + Support.Direction.Up.toString(), animations.moveUp, animations.moveFps, true);

            this.sprite.animations.add("idle-" + Support.Direction.Right.toString(), animations.idleRight, animations.idleFps, true);
            this.sprite.animations.add("idle-" + Support.Direction.Down.toString(), animations.idleDown, animations.idleFps, true);
            this.sprite.animations.add("idle-" + Support.Direction.Left.toString(), animations.idleLeft, animations.idleFps, true);
            this.sprite.animations.add("idle-" + Support.Direction.Up.toString(), animations.idleUp, animations.idleFps, true);

            this.sprite.animations.add("attack-" + Support.Direction.Right.toString(), animations.attackRight, animations.attackFps, true);
            this.sprite.animations.add("attack-" + Support.Direction.Down.toString(), animations.attackDown, animations.attackFps, true);
            this.sprite.animations.add("attack-" + Support.Direction.Left.toString(), animations.attackLeft, animations.attackFps, true);
            this.sprite.animations.add("attack-" + Support.Direction.Up.toString(), animations.attackUp, animations.attackFps, true);

            // play default
            this.sprite.animations.play(Support.Direction.Down.toString());
        }

        public update()
        {
            this.processInput();
        }

        private processInput()
        {
            var input: boolean = false;
            var attacking: boolean = false;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                input = true;
                attacking = true;
            }

            // process input to change player direction
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                input = true;

                this.direction = Support.Direction.Left;
                this.move(this.direction);

                if (!attacking)
                {
                    this.sprite.animations.play("move-" + Support.Direction.Left.toString());
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                input = true;

                this.direction = Support.Direction.Right;
                this.move(this.direction);

                if (!attacking)
                {
                    this.sprite.animations.play("move-" + Support.Direction.Right.toString());
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                input = true;

                this.direction = Support.Direction.Down;
                this.move(this.direction);

                if (!attacking)
                {
                    this.sprite.animations.play("move-" + Support.Direction.Down.toString());
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                input = true;

                this.direction = Support.Direction.Up;
                this.move(this.direction);

                if (!attacking)
                {
                    this.sprite.animations.play("move-" + Support.Direction.Up.toString());
                }
            }

            if (attacking)
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

            if (!input)
            {
                this.idle(this.direction);
            }
        }
    }
}