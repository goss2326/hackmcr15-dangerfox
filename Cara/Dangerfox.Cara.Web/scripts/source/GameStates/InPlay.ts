module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private player: Components.Player;
        private map: Components.Map;

        public preload()
        {
            this.game.load.json("knight-data", "../../assets/data/knight.json");

            this.player = new Components.Player(this.game, "knight-data");
            this.player.preload();

            this.map = new Components.Map(this.game);
            this.map.preload();
        }

        public create()
        {
            this.player.create();
            this.map.create();
        }

        public update()
        {
            this.player.update();
        }
    }
}