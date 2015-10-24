module Dangerfox.Cara
{
    export class Game extends Phaser.Game
    {
        constructor(width: number, height: number, renderer: number, elementId: string)
        {
            super(width, height, renderer, elementId, { preload: this.preload });

            this.state.add("InPlay", GameStates.InPlay, true);
        }

        public preload()
        {
            // for debugging
            this.stage.backgroundColor = 0xff0000;
        }
    }
}

window.onload = () =>
{
    // this is where the magic happens
    var game = new Dangerfox.Cara.Game(800, 640, Phaser.AUTO, "game-content");
};