module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private player: Components.Player;

        public preload()
        {
            this.game.load.json("knight-data", "../../assets/data/knight.json");

            this.player = new Components.Player(this.game);
            this.player.preload("../../assets/sprites/knight.png", 96, 96);
        }

        public create()
        {
            var knightData = this.game.cache.getJSON("knight-data");

            this.player.create(knightData);
        }

        public update()
        {
            this.player.update();
        }
    }
}