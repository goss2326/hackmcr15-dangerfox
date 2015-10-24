module Dangerfox.Cara.Components
{
    export class Player extends Character
    {
        constructor(game: Phaser.Game)
        {
            super(game, "player", 32.0);
        }

        public preload()
        {
            super.preload("../../assets/sprites/knight.png", 96, 96);
        }

        public create()
        {
            super.create(new Phaser.Point(0, 0), new Phaser.Point(1, 1), Support.Direction.Right);

            this.sprite.animations.add("move-" + Support.Direction.Right.toString(), [17, 18, 19, 20, 21, 22, 23], 7, true);
            //this.sprite.animations.add(Support.Direction.DownRight.toString(), [65, 66, 67, 68, 69, 70, 71], 7, true);
            this.sprite.animations.add("move-" + Support.Direction.Down.toString(), [49, 50, 51, 52, 53, 54, 55], 7, true);
            //this.sprite.animations.add(Support.Direction.DownLeft.toString(), [81, 82, 83, 84, 85, 86, 87], 7, true);
            this.sprite.animations.add("move-" + Support.Direction.Left.toString(), [97, 98, 99, 100, 101, 102, 103], 7, true);
            //this.sprite.animations.add(Support.Direction.UpLeft.toString(), [33, 34, 35, 36, 37, 38, 39], 7, true);
            this.sprite.animations.add("move-" + Support.Direction.Up.toString(), [0, 1, 2, 3, 4, 5, 6], 7, true);
            //this.sprite.animations.add(Support.Direction.UpRight.toString(), [0, 1, 2, 3, 4, 5, 6], 7, true);

            this.sprite.animations.add("idle-" + Support.Direction.Right.toString(), [118], 1, true);
            this.sprite.animations.add("idle-" + Support.Direction.Down.toString(), [112], 1, true);
            this.sprite.animations.add("idle-" + Support.Direction.Left.toString(), [114], 1, true);
            this.sprite.animations.add("idle-" + Support.Direction.Up.toString(), [116], 1, true);

            // play default
            this.sprite.animations.play(Support.Direction.Down.toString());
        }

        public update()
        {
            this.processInput();
        }

        private processInput()
        {
            // process input to change player direction
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                this.direction = Support.Direction.Left;
                this.sprite.animations.play(Support.Direction.Left.toString());
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.direction = Support.Direction.Right;
                this.sprite.animations.play(Support.Direction.Right.toString());
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                this.direction = Support.Direction.Down;
                this.sprite.animations.play(Support.Direction.Down.toString());
                this.move(this.direction);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                this.direction = Support.Direction.Up;
                this.sprite.animations.play(Support.Direction.Up.toString());
                this.move(this.direction);
            }
            else
            {
                this.idle(this.direction);
            }
        }
    }
}