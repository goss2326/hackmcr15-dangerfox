var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game(width, height, renderer, elementId) {
                _super.call(this, width, height, renderer, elementId, { preload: this.preload });
            }
            Game.prototype.preload = function () {
                this.stage.backgroundColor = 0xff0000;
            };
            return Game;
        })(Phaser.Game);
        Cara.Game = Game;
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
window.onload = function () {
    // this is where the magic happens
    var game = new Dangerfox.Cara.Game(800, 640, Phaser.AUTO, "game-content");
};
//# sourceMappingURL=game.js.map