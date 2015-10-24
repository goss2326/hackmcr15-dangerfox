module Dangerfox.Cara.Components
{
    export abstract class Character
    {
        private direction: Dangerfox.Cara.Support.Direction;
        public sprite: Phaser.Sprite;

        constructor(private game: Phaser.Game, private spriteKey: string, private movementSpeed: number)
        {
        }

        public preload(spritesheetUrl: string, frameWidth: number, frameHeight: number, frameMax: number)
        {
            // load spritesheet for character
            this.game.load.spritesheet(
                this.spriteKey,
                spritesheetUrl,
                frameWidth,
                frameHeight,
                frameMax
            );
        }

        public create(
            startPosition: Phaser.Point,
            spriteScale: Phaser.Point,
            direction: Dangerfox.Cara.Support.Direction)
        {
            // create the sprite
            this.sprite = this.game.add.sprite(
                startPosition.x,
                startPosition.y,
                this.spriteKey
            );

            this.sprite.scale = spriteScale;
            this.direction = direction;

            // TODO: set up animations

            // configure physics
            this.game.physics.enable(this.sprite);
            this.sprite.body.collideWorldBounds = true;
        }

        protected move(direction: Dangerfox.Cara.Support.Direction)
        {
            var movementVector = this.getMovementVector(direction);

            this.sprite.body.physics.velocity.x = movementVector.x;
            this.sprite.body.physics.velocity.y = movementVector.y;
        }

        private getMovementVector(direction: Dangerfox.Cara.Support.Direction): Phaser.Point
        {
            var vector = new Phaser.Point();

            switch (direction)
            {
                case Dangerfox.Cara.Support.Direction.Right:
                    vector.x = this.movementSpeed;
                    break;

                case Dangerfox.Cara.Support.Direction.DownRight:
                    vector.x = 1;
                    vector.y = 1;
                    vector.normalize();
                    vector.setMagnitude(this.movementSpeed);
                    break;

                case Dangerfox.Cara.Support.Direction.Down:
                    vector.y = this.movementSpeed;
                    break;

                case Dangerfox.Cara.Support.Direction.DownLeft:
                    vector.x = -1;
                    vector.y = 1;
                    vector.normalize();
                    vector.setMagnitude(this.movementSpeed);
                    break;

                case Dangerfox.Cara.Support.Direction.Left:
                    vector.x = -this.movementSpeed;
                    break;

                case Dangerfox.Cara.Support.Direction.UpLeft:
                    vector.x = -1;
                    vector.y = -1;
                    vector.normalize();
                    vector.setMagnitude(this.movementSpeed);
                    break;

                case Dangerfox.Cara.Support.Direction.Up:
                    vector.y = -this.movementSpeed;
                    break;

                case Dangerfox.Cara.Support.Direction.UpRight:
                    vector.x = 1;
                    vector.y = -1;
                    vector.normalize();
                    vector.setMagnitude(this.movementSpeed);
                    break;
            }

            return vector;
        }
    }
}