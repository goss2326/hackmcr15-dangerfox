module Dangerfox.Cara.Components
{
    export abstract class Character
    {
        protected direction: Support.Direction;
        public sprite: Phaser.Sprite;
        public attacking: boolean;

        constructor(protected game: Phaser.Game, private spriteKey: string, private movementSpeed: number, private health: number)
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
            spriteData: any)
        {
            // create the sprite
            this.sprite = this.game.add.sprite(
                startPosition.x,
                startPosition.y,
                this.spriteKey
            );

            this.sprite.scale = spriteScale;

            // animations
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
            this.sprite.animations.play("idle-" + Support.Direction.Down.toString());

            // configure physics
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.collideWorldBounds = true;

            // setup bounding box
            var physics = spriteData.physics;
            var boundingBox = physics.boundingBox;

            this.sprite.body.setSize(
                boundingBox.width,
                boundingBox.height,
                boundingBox.offsetX,
                boundingBox.offsetY
            );
        }

        protected move(direction: Support.Direction)
        {
            var vector = new Phaser.Point();

            switch (direction)
            {
                case Support.Direction.Right:
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

        public takeDamage(damage: number)
        {
            this.health = this.health - damage;

            if (this.health <= 0)
            {
                this.sprite.kill();
            }
        }
    }
}