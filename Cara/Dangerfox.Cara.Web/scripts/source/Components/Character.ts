module Dangerfox.Cara.Components
{
    export abstract class Character
    {
        protected direction: Support.Direction;
        protected sprite: Phaser.Sprite;

        constructor(protected game: Phaser.Game, private spriteKey: string, private movementSpeed: number)
        {
        }

        protected preload(spritesheetUrl: string, frameWidth: number, frameHeight: number)
        {
            // load spritesheet for character
            this.game.load.spritesheet(
                this.spriteKey,
                spritesheetUrl,
                frameWidth,
                frameHeight
            );
        }

        protected create(
            startPosition: Phaser.Point,
            spriteScale: Phaser.Point,
            direction: Support.Direction)
        {
            // create the sprite
            this.sprite = this.game.add.sprite(
                startPosition.x,
                startPosition.y,
                this.spriteKey
            );

            this.sprite.scale = spriteScale;
            this.direction = direction;

            // configure physics
            this.game.physics.enable(this.sprite);
            this.sprite.body.collideWorldBounds = true;
        }

        protected move(direction: Support.Direction)
        {
            var vector = new Phaser.Point();

            switch (direction)
            {
                case Support.Direction.Right:
                    this.sprite.animations.play("move-" + Support.Direction.Right.toString());

                    vector.x = this.movementSpeed;
                    break;

                //case Support.Direction.DownRight:
                //    this.sprite.animations.play(Support.Direction.DownRight.toString());

                //    vector.x = 1;
                //    vector.y = 1;
                //    vector.normalize();
                //    vector.setMagnitude(this.movementSpeed);
                //    break;

                case Support.Direction.Down:
                    this.sprite.animations.play("move-" + Support.Direction.Down.toString());

                    vector.y = this.movementSpeed;
                    break;

                //case Support.Direction.DownLeft:
                //    this.sprite.animations.play(Support.Direction.DownLeft.toString());

                //    vector.x = -1;
                //    vector.y = 1;
                //    vector.normalize();
                //    vector.setMagnitude(this.movementSpeed);
                //    break;

                case Support.Direction.Left:
                    this.sprite.animations.play("move-" + Support.Direction.Left.toString());

                    vector.x = -this.movementSpeed;
                    break;

                //case Support.Direction.UpLeft:
                //    this.sprite.animations.play(Support.Direction.UpLeft.toString());

                //    vector.x = -1;
                //    vector.y = -1;
                //    vector.normalize();
                //    vector.setMagnitude(this.movementSpeed);
                //    break;

                case Support.Direction.Up:
                    this.sprite.animations.play("move-" + Support.Direction.Up.toString());

                    vector.y = -this.movementSpeed;
                    break;

                //case Support.Direction.UpRight:
                //    this.sprite.animations.play(Support.Direction.UpRight.toString());

                //    vector.x = 1;
                //    vector.y = -1;
                //    vector.normalize();
                //    vector.setMagnitude(this.movementSpeed);
                //    break;
            }

            this.sprite.body.velocity.x = vector.x;
            this.sprite.body.velocity.y = vector.y;
        }

        protected idle(direction: Support.Direction)
        {
            switch (direction)
            {
                case Support.Direction.Right:
                    this.sprite.animations.play("idle-" + Support.Direction.Right.toString());
                    break;

                case Support.Direction.Down:
                    this.sprite.animations.play("idle-" + Support.Direction.Down.toString());
                    break;

                case Support.Direction.Left:
                    this.sprite.animations.play("idle-" + Support.Direction.Left.toString());
                    break;

                case Support.Direction.Up:
                    this.sprite.animations.play("idle-" + Support.Direction.Up.toString());
                    break;
            }

            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    }
}