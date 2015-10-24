module Dangerfox.Cara.Components
{
    export class Enemy extends Character
    {
        constructor(game: Phaser.Game, spriteKey: string)
        {
            super(game, spriteKey);
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

        public update(player: Components.Player)
        {
            this.processAi(player);

            this.collisionCheck(player);
        }

        private processAi(player: Components.Player)
        {
            var distance = this.sprite.position.distance(player.sprite.position);

            if (distance <= 300)
            {
                if (distance <= 50)
                {
                    this.attacking = true;
                }
                else
                {
                    this.attacking = false;
                }

                var angle = this.sprite.position.angle(player.sprite.position, true);

                if (angle < -135 || angle > 135)
                {
                    this.direction = Support.Direction.Left;
                }
                else if (angle > -135 && angle < -45)
                {
                    this.direction = Support.Direction.Up;
                }
                else if (angle > -45 && angle < 45)
                {
                    this.direction = Support.Direction.Right;
                }
                else if (angle > 45 && angle < 135)
                {
                    this.direction = Support.Direction.Down;
                }

                this.move(this.direction);
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
                else
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
            }
            else
            {
                this.attacking = false;
                this.idle(this.direction);
            }
        }

        private collisionCheck(player: Components.Player)
        {
            if (this.game.physics.arcade.overlap(player.sprite, this.sprite))
            {
                this.stopMovement();
                player.stopMovement();

                if (player.attacking)
                {
                    this.takeDamage(player.baseDamage / player.attackFps);
                }

                if (this.attacking)
                {
                    player.takeDamage(this.baseDamage / this.attackFps);
                }
            }

            this.game.physics.arcade.collide(player.sprite, this.sprite);
        }
    }
}