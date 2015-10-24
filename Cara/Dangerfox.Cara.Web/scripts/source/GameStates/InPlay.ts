module Dangerfox.Cara.GameStates
{
    export class InPlay extends Phaser.State
    {
        private player: Components.Player;

        public preload()
        {
            this.player = new Components.Player(this.game);
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