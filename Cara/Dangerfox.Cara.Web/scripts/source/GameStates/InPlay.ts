module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private player: Components.Player;
        private enemies: Array<Components.Enemy>;
        private map: Components.Map;

        public preload()
        {
            this.game.load.json("knight-data", "../../assets/data/firetroll.json");

            this.map = new Components.Map(this.game);
            this.map.preload();

            this.player = new Components.Player(this.game);
            this.player.preload("../../assets/sprites/firetroll.png", 96, 96);

            this.enemies = new Array<Components.Enemy>(1);

            for (var i: number = 0; i < this.enemies.length; ++i)
            {
                var enemy = new Components.Enemy(this.game);
                enemy.preload("../../assets/sprites/firetroll.png", 96, 96);

                this.enemies[i] = enemy;
            }
        }

        public create()
        {
            // Setup the physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.map.create();

            // create the player
            var knightData = this.game.cache.getJSON("knight-data");
            this.player.create(knightData);

            // create the enemies
            for (var i: number = 0; i < this.enemies.length; ++i)
            {
                this.enemies[i].create(knightData, new Phaser.Point(500, 200));
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