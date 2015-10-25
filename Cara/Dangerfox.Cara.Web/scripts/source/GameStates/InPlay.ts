module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private config: any;
        private playerData: any;

        private knightData: any;
        private mageData: any;

        private firetrollData: any;
        private icetrollData: any;
        private dragonData: any;

        private player: Components.Player;
        private enemies: Array<Components.Enemy>;
        private map: Components.Map;

        public preload()
        {
            this.loadJsonData();

            this.map = new Components.Map(this.game);
            this.map.preload();

            // change this for different player
            this.playerData = this.knightData;

            this.player = new Components.Player(this.game);

            this.player.preload(
                this.playerData.spritesheet,
                this.playerData.spriteWidth,
                this.playerData.spriteHeight
            );

            this.enemies = new Array<Components.Enemy>(this.config.enemies.length);
            
            for (var i: number = 0; i < this.enemies.length; i++)
            {
                var enemy: Components.Enemy;

                switch (this.config.enemies[i].type)
                {
                    case "firetroll":
                        enemy = new Components.Enemy(this.game, this.config.enemies[i].type);

                        enemy.preload(
                            this.firetrollData.spritesheet,
                            this.firetrollData.spriteWidth,
                            this.firetrollData.spriteHeight
                        );
                        break;

                    case "icetroll":
                        enemy = new Components.Enemy(this.game, this.config.enemies[i].type);

                        enemy.preload(
                            this.icetrollData.spritesheet,
                            this.icetrollData.spriteWidth,
                            this.icetrollData.spriteHeight
                        );
                        break;

                    case "dragon":
                        enemy = new Components.Enemy(this.game, this.config.enemies[i].type);

                        enemy.preload(
                            this.dragonData.spritesheet,
                            this.dragonData.spriteWidth,
                            this.dragonData.spriteHeight
                        );
                        break;
                }

                this.enemies[i] = enemy;
            }
        }

        public create()
        {
            // Setup the physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.map.create();

            // create the player
            this.player.create(
                this.config.player.health,
                this.config.player.baseDamage,
                this.config.player.movementSpeed,
                Support.Direction.Right,
                new Phaser.Point(
                    this.config.player.positionX,
                    this.config.player.positionY
                ),
                this.playerData
            );

            // create the enemies
            for (var i: number = 0; i < this.enemies.length; i++)
            {
                var enemyData = this.config.enemies[i];
                switch (enemyData.type)
                {
                    case "firetroll":
                        this.enemies[i].create(
                            enemyData.health,
                            enemyData.baseDamage,
                            enemyData.movementSpeed,
                            Support.Direction.Right,
                            new Phaser.Point(
                                enemyData.positionX,
                                enemyData.positionY
                            ),
                            this.firetrollData
                        );
                        break;

                    case "icetroll":
                        this.enemies[i].create(
                            enemyData.health,
                            enemyData.baseDamage,
                            enemyData.movementSpeed,
                            Support.Direction.Right,
                            new Phaser.Point(
                                enemyData.positionX,
                                enemyData.positionY
                            ),
                            this.icetrollData
                        );
                        break;

                    case "dragon":
                        this.enemies[i].create(
                            enemyData.health,
                            enemyData.baseDamage,
                            enemyData.movementSpeed,
                            Support.Direction.Right,
                            new Phaser.Point(
                                enemyData.positionX,
                                enemyData.positionY
                            ),
                            this.dragonData
                        );
                        break;
                }
            }

            this.game.camera.follow(this.player.sprite);
        }

        public update()
        {
            this.player.update();

            for (var i: number = 0; i < this.enemies.length; ++i)
            {
                var enemy = this.enemies[i];

                enemy.update(this.player);
            }
        }

        public render()
        {
            this.player.render();

            for (var i: number = 0; i < this.enemies.length; ++i)
            {
                var enemy = this.enemies[i];

                enemy.render();
            }
        }

        private loadJsonData()
        {
            $.ajax({
                method: "GET",
                url: "../../assets/data/config.json",
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: response =>
                {
                    this.config = response;
                },
                error: () =>
                {
                    alert("Unable to load config.");
                }
            });

            $.ajax({
                method: "GET",
                url: this.config.knightData,
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: response =>
                {
                    this.knightData = response;
                },
                error: () =>
                {
                    alert("Unable to load knight data.");
                }
            });

            $.ajax({
                method: "GET",
                url: this.config.mageData,
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: response =>
                {
                    this.mageData = response;
                },
                error: () =>
                {
                    alert("Unable to load mage data.");
                }
            });

            $.ajax({
                method: "GET",
                url: this.config.firetrollData,
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: response =>
                {
                    this.firetrollData = response;
                },
                error: () =>
                {
                    alert("Unable to load firetroll data.");
                }
            });

            $.ajax({
                method: "GET",
                url: this.config.icetrollData,
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: response =>
                {
                    this.icetrollData = response;
                },
                error: () =>
                {
                    alert("Unable to load icetroll data.");
                }
            });

            $.ajax({
                method: "GET",
                url: this.config.dragonData,
                dataType: "json",
                async: false,
                contentType: "application/json",
                success: response =>
                {
                    this.dragonData = response;
                },
                error: () =>
                {
                    alert("Unable to load dragon data.");
                }
            });
        }

        private sendText(phoneNumber: string, from: string, message: string)
        {
            $.ajax({
                method: "POST",
                url: "/send-text",
                data: JSON.stringify({
                    "PhoneNumber": phoneNumber,
                    "From": from,
                    "Message": message
                }),
                dataType: "json",
                async: true,
                contentType: "application/json",
                success: response =>
                {
                    //alert(response.Message);
                },
                error: () =>
                {
                    alert("Unable to send text data.");
                }
            });
        }
    }
}