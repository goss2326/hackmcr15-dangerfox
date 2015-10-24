module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private player: Components.Player;

        public preload()
        {
            this.game.load.json("knight-data", "../../assets/data/knight.json");

            this.player = new Components.Player(this.game, this.game.cache.getJSON("knight-data"));
            this.player.preload();
        }

        public create()
        {
            this.player.create();
        }

        public update()
        {
            this.player.update();
        }
    }
}