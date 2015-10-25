module Dangerfox.Cara.Components
{
    export abstract class Character
    {
        public maxHealth: number;
        public health: number;
        public baseDamage: number;
        public attackFps: number;
        public movementSpeed: number;
        public direction: Support.Direction;

        public sprite: Phaser.Sprite;
        public attacking: boolean;

        constructor(protected game: Phaser.Game, public spriteKey: string)
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
            health: number,
            baseDamage: number,
            movementSpeed: number,
            direction: Support.Direction,
            startPosition: Phaser.Point,
            spriteData: any)
        {
            this.maxHealth = health;
            this.health = health;
            this.baseDamage = baseDamage;
            this.attackFps = spriteData.animations.attackFps;
            this.movementSpeed = movementSpeed;
            this.direction = direction;

            // create the sprite
            this.sprite = this.game.add.sprite(
                startPosition.x,
                startPosition.y,
                this.spriteKey
            );

            //this.sprite.anchor = new Phaser.Point(0.5, 0.5);

            // animations
            var animations = spriteData.animations;

            this.sprite.animations.add("move-" + Support.Direction.Right.toString(), animations.moveRight, animations.moveFps, false);
            this.sprite.animations.add("move-" + Support.Direction.Down.toString(), animations.moveDown, animations.moveFps, false);
            this.sprite.animations.add("move-" + Support.Direction.Left.toString(), animations.moveLeft, animations.moveFps, false);
            this.sprite.animations.add("move-" + Support.Direction.Up.toString(), animations.moveUp, animations.moveFps, false);

            this.sprite.animations.add("idle-" + Support.Direction.Right.toString(), animations.idleRight, animations.idleFps, false);
            this.sprite.animations.add("idle-" + Support.Direction.Down.toString(), animations.idleDown, animations.idleFps, false);
            this.sprite.animations.add("idle-" + Support.Direction.Left.toString(), animations.idleLeft, animations.idleFps, false);
            this.sprite.animations.add("idle-" + Support.Direction.Up.toString(), animations.idleUp, animations.idleFps, false);

            this.sprite.animations.add("attack-" + Support.Direction.Right.toString(), animations.attackRight, animations.attackFps, false);
            this.sprite.animations.add("attack-" + Support.Direction.Down.toString(), animations.attackDown, animations.attackFps, false);
            this.sprite.animations.add("attack-" + Support.Direction.Left.toString(), animations.attackLeft, animations.attackFps, false);
            this.sprite.animations.add("attack-" + Support.Direction.Up.toString(), animations.attackUp, animations.attackFps, false);

            // play default
            this.sprite.animations.play("idle-" + Support.Direction.Down.toString()); 

            // configure physics
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.collideWorldBounds = true;
            //this.sprite.body.immovable = true;

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

        public render()
        {
            //this.game.debug.body(this.sprite);
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

            this.stopMovement();
        }

        public takeDamage(damage: number)
        {
            this.health = this.health - damage;

            if (this.health <= 0)
            {
                this.sprite.kill();
            }
        }

        public stopMovement()
        {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    }
}