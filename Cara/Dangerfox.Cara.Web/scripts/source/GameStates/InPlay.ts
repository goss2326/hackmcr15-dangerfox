module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private config: any;
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
                error: response1 =>
                {
                    alert("Unable to load config.");
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
                error: response1 =>
                {
                    alert("Unable to load knight data.");
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
                error: response1 =>
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
                error: response1 =>
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
                error: response1 =>
                {
                    alert("Unable to load dragon data.");
                }
            });

            this.map = new Components.Map(this.game);
            this.map.preload();

            this.player = new Components.Player(this.game);

            this.player.preload(
                this.mageData.spritesheet,
                this.mageData.spriteWidth,
                this.mageData.spriteHeight
            );

            this.enemies = new Array<Components.Enemy>(this.config.enemies.length);

            for (var i: number = 0; i < this.enemies.length; ++i)
            {
                var enemy = new Components.Enemy(this.game);

                var data: any;

                switch (this.config.enemies[i].type)
                {
                    case "firetroll":
                        data = this.firetrollData;
                        break;

                    case "icetroll":
                        data = this.icetrollData;
                        break;

                    case "dragon":
                        data = this.dragonData;
                        break;
                }

                enemy.preload(
                    data.spritesheet,
                    data.spriteWidth,
                    data.spriteHeight
                );

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
                this.config.player.movementSpeed,
                Support.Direction.Right,
                new Phaser.Point(
                    this.config.player.positionX,
                    this.config.player.positionY
                ),
                this.mageData
            );

            // create the enemies
            for (var i: number = 0; i < this.enemies.length; ++i)
            {
                var enemyData = this.config.enemies[i];

                this.enemies[i].create(
                    enemyData.health,
                    enemyData.movementSpeed,
                    Support.Direction.Right,
                    new Phaser.Point(
                        enemyData.positionX,
                        enemyData.positionY
                    ),
                    this.firetrollData
                );
            }
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
    }
}