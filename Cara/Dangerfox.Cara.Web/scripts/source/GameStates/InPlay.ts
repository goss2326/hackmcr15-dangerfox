module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private player: Components.Player;
        private map: Components.Map;

        public preload()
        {
            this.game.load.json("knight-data", "../../assets/data/knight.json");

            this.map = new Components.Map(this.game);
            this.map.preload();

            this.player = new Components.Player(this.game);
            this.player.preload("../../assets/sprites/knight.png", 96, 96);
        }

        public create()
        {
            var knightData = this.game.cache.getJSON("knight-data");

            this.map.create();
            this.player.create(knightData);
        }

        public update()
        {
            this.player.update();
        }
    }
}