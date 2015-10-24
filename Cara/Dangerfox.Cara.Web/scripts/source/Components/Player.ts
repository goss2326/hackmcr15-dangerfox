module Dangerfox.Cara.Components
{
    export class Player extends Character
    {
        constructor(game: Phaser.Game, private spriteData: any)
        {
            super(game, "player", 32.0);
        }

        public preload()
        {
            //"../../assets/sprites/knight.png"
            super.preload(this.spriteData.spritesheet, 96, 96);
        }

        public create()
        {
            super.create(new Phaser.Point(0, 0), new Phaser.Point(1, 1), Support.Direction.Right);

            this.sprite.animations.add("move-" + Support.Direction.Right.toString(), [17, 18, 19, 20, 21, 22, 23], 7, true);
            this.sprite.animations.add("move-" + Support.Direction.Down.toString(), [49, 50, 51, 52, 53, 54, 55], 7, true);
            this.sprite.animations.add("move-" + Support.Direction.Left.toString(), [97, 98, 99, 100, 101, 102, 103], 7, true);
            this.sprite.animations.add("move-" + Support.Direction.Up.toString(), [0, 1, 2, 3, 4, 5, 6], 7, true);

            this.sprite.animations.add("idle-" + Support.Direction.Right.toString(), [118], 1, true);
            this.sprite.animations.add("idle-" + Support.Direction.Down.toString(), [112], 1, true);
            this.sprite.animations.add("idle-" + Support.Direction.Left.toString(), [114], 1, true);
            this.sprite.animations.add("idle-" + Support.Direction.Up.toString(), [116], 1, true);

            this.sprite.animations.add("attack-" + Support.Direction.Right.toString(), [384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396], 26, true);
            this.sprite.animations.add("attack-" + Support.Direction.Down.toString(), [448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460], 26, true);
            this.sprite.animations.add("attack-" + Support.Direction.Left.toString(), [496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508], 26, true);
            this.sprite.animations.add("attack-" + Support.Direction.Up.toString(), [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412], 26, true);

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