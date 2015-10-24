var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var Components;
        (function (Components) {
            var Character = (function () {
                function Character(game, spriteKey, movementSpeed) {
                    this.game = game;
                    this.spriteKey = spriteKey;
                    this.movementSpeed = movementSpeed;
                }
                Character.prototype.preload = function (spritesheetUrl, frameWidth, frameHeight, frameMax) {
                    // load spritesheet for character
                    this.game.load.spritesheet(this.spriteKey, spritesheetUrl, frameWidth, frameHeight, frameMax);
                };
                Character.prototype.create = function (startPosition, spriteScale, direction) {
                    // create the sprite
                    this.sprite = this.game.add.sprite(startPosition.x, startPosition.y, this.spriteKey);
                    this.sprite.scale = spriteScale;
                    this.direction = direction;
                    // TODO: set up animations
                    // configure physics
                    this.game.physics.enable(this.sprite);
                    this.sprite.body.collideWorldBounds = true;
                };
                Character.prototype.move = function (direction) {
                    var movementVector = this.getMovementVector(direction);
                    this.sprite.body.physics.velocity.x = movementVector.x;
                    this.sprite.body.physics.velocity.y = movementVector.y;
                };
                Character.prototype.getMovementVector = function (direction) {
                    var vector = new Phaser.Point();
                    switch (direction) {
                        case Dangerfox.Cara.Support.Direction.Right:
                            vector.x = this.movementSpeed;
                            break;
                        case Dangerfox.Cara.Support.Direction.DownRight:
                            vector.x = 1;
                            vector.y = 1;
                            vector.normalize();
                            vector.setMagnitude(this.movementSpeed);
                            break;
                        case Dangerfox.Cara.Support.Direction.Down:
                            vector.y = this.movementSpeed;
                            break;
                        case Dangerfox.Cara.Support.Direction.DownLeft:
                            vector.x = -1;
                            vector.y = 1;
                            vector.normalize();
                            vector.setMagnitude(this.movementSpeed);
                            break;
                        case Dangerfox.Cara.Support.Direction.Left:
                            vector.x = -this.movementSpeed;
                            break;
                        case Dangerfox.Cara.Support.Direction.UpLeft:
                            vector.x = -1;
                            vector.y = -1;
                            vector.normalize();
                            vector.setMagnitude(this.movementSpeed);
                            break;
                        case Dangerfox.Cara.Support.Direction.Up:
                            vector.y = -this.movementSpeed;
                            break;
                        case Dangerfox.Cara.Support.Direction.UpRight:
                            vector.x = 1;
                            vector.y = -1;
                            vector.normalize();
                            vector.setMagnitude(this.movementSpeed);
                            break;
                    }
                    return vector;
                };
                return Character;
            })();
            Components.Character = Character;
        })(Components = Cara.Components || (Cara.Components = {}));
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var GameStates;
        (function (GameStates) {
            var InPlay = (function (_super) {
                __extends(InPlay, _super);
                function InPlay() {
                    _super.apply(this, arguments);
                }
                InPlay.prototype.preload = function () {
                };
                InPlay.prototype.create = function () {
                };
                InPlay.prototype.update = function () {
                };
                return InPlay;
            })(Phaser.State);
            GameStates.InPlay = InPlay;
        })(GameStates = Cara.GameStates || (Cara.GameStates = {}));
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game(width, height, renderer, elementId) {
                _super.call(this, width, height, renderer, elementId, { preload: this.preload });
                this.state.add("InPlay", Cara.GameStates.InPlay, true);
            }
            Game.prototype.preload = function () {
                // for debugging
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
var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var Support;
        (function (Support) {
            (function (Direction) {
                Direction[Direction["Right"] = 0] = "Right";
                Direction[Direction["DownRight"] = 1] = "DownRight";
                Direction[Direction["Down"] = 2] = "Down";
                Direction[Direction["DownLeft"] = 3] = "DownLeft";
                Direction[Direction["Left"] = 4] = "Left";
                Direction[Direction["UpLeft"] = 5] = "UpLeft";
                Direction[Direction["Up"] = 6] = "Up";
                Direction[Direction["UpRight"] = 7] = "UpRight";
            })(Support.Direction || (Support.Direction = {}));
            var Direction = Support.Direction;
        })(Support = Cara.Support || (Cara.Support = {}));
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
//# sourceMappingURL=game.js.map