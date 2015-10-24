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
                Character.prototype.preload = function (spritesheetUrl, frameWidth, frameHeight) {
                    // load spritesheet for character
                    this.game.load.spritesheet(this.spriteKey, spritesheetUrl, frameWidth, frameHeight);
                };
                Character.prototype.create = function (startPosition, spriteScale, direction) {
                    // create the sprite
                    this.sprite = this.game.add.sprite(startPosition.x, startPosition.y, this.spriteKey);
                    this.sprite.scale = spriteScale;
                    this.direction = direction;
                    // configure physics
                    this.game.physics.enable(this.sprite);
                    this.sprite.body.collideWorldBounds = true;
                };
                Character.prototype.move = function (direction) {
                    var vector = new Phaser.Point();
                    switch (direction) {
                        case Cara.Support.Direction.Right:
                            vector.x = this.movementSpeed;
                            break;
                        //case Support.Direction.DownRight:
                        //    this.sprite.animations.play(Support.Direction.DownRight.toString());
                        //    vector.x = 1;
                        //    vector.y = 1;
                        //    vector.normalize();
                        //    vector.setMagnitude(this.movementSpeed);
                        //    break;
                        case Cara.Support.Direction.Down:
                            vector.y = this.movementSpeed;
                            break;
                        //case Support.Direction.DownLeft:
                        //    this.sprite.animations.play(Support.Direction.DownLeft.toString());
                        //    vector.x = -1;
                        //    vector.y = 1;
                        //    vector.normalize();
                        //    vector.setMagnitude(this.movementSpeed);
                        //    break;
                        case Cara.Support.Direction.Left:
                            vector.x = -this.movementSpeed;
                            break;
                        //case Support.Direction.UpLeft:
                        //    this.sprite.animations.play(Support.Direction.UpLeft.toString());
                        //    vector.x = -1;
                        //    vector.y = -1;
                        //    vector.normalize();
                        //    vector.setMagnitude(this.movementSpeed);
                        //    break;
                        case Cara.Support.Direction.Up:
                            vector.y = -this.movementSpeed;
                            break;
                    }
                    this.sprite.body.velocity.x = vector.x;
                    this.sprite.body.velocity.y = vector.y;
                };
                Character.prototype.idle = function (direction) {
                    switch (direction) {
                        case Cara.Support.Direction.Right:
                            this.sprite.animations.play("idle-" + Cara.Support.Direction.Right.toString());
                            break;
                        case Cara.Support.Direction.Down:
                            this.sprite.animations.play("idle-" + Cara.Support.Direction.Down.toString());
                            break;
                        case Cara.Support.Direction.Left:
                            this.sprite.animations.play("idle-" + Cara.Support.Direction.Left.toString());
                            break;
                        case Cara.Support.Direction.Up:
                            this.sprite.animations.play("idle-" + Cara.Support.Direction.Up.toString());
                            break;
                    }
                    this.sprite.body.velocity.x = 0;
                    this.sprite.body.velocity.y = 0;
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
        var Components;
        (function (Components) {
            var Player = (function (_super) {
                __extends(Player, _super);
                function Player(game, spriteDataKey) {
                    _super.call(this, game, "player", 32.0);
                    this.spriteDataKey = spriteDataKey;
                }
                Player.prototype.preload = function () {
                    _super.prototype.preload.call(this, "../../assets/sprites/knight.png", 96, 96);
                };
                Player.prototype.create = function () {
                    _super.prototype.create.call(this, new Phaser.Point(0, 0), new Phaser.Point(1, 1), Cara.Support.Direction.Right);
                    var data = JSON.parse(this.game.cache.getJSON(this.spriteDataKey));
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Right.toString(), [17, 18, 19, 20, 21, 22, 23], 7, true);
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Down.toString(), [49, 50, 51, 52, 53, 54, 55], 7, true);
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Left.toString(), [97, 98, 99, 100, 101, 102, 103], 7, true);
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Up.toString(), [0, 1, 2, 3, 4, 5, 6], 7, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Right.toString(), [118], 1, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Down.toString(), [112], 1, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Left.toString(), [114], 1, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Up.toString(), [116], 1, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Right.toString(), [384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396], 26, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Down.toString(), [448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460], 26, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Left.toString(), [496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508], 26, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Up.toString(), [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412], 26, true);
                    // play default
                    this.sprite.animations.play(Cara.Support.Direction.Down.toString());
                };
                Player.prototype.update = function () {
                    this.processInput();
                };
                Player.prototype.processInput = function () {
                    var input = false;
                    var attacking = false;
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        input = true;
                        attacking = true;
                    }
                    // process input to change player direction
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                        input = true;
                        this.direction = Cara.Support.Direction.Left;
                        this.move(this.direction);
                        if (!attacking) {
                            this.sprite.animations.play("move-" + Cara.Support.Direction.Left.toString());
                        }
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                        input = true;
                        this.direction = Cara.Support.Direction.Right;
                        this.move(this.direction);
                        if (!attacking) {
                            this.sprite.animations.play("move-" + Cara.Support.Direction.Right.toString());
                        }
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                        input = true;
                        this.direction = Cara.Support.Direction.Down;
                        this.move(this.direction);
                        if (!attacking) {
                            this.sprite.animations.play("move-" + Cara.Support.Direction.Down.toString());
                        }
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                        input = true;
                        this.direction = Cara.Support.Direction.Up;
                        this.move(this.direction);
                        if (!attacking) {
                            this.sprite.animations.play("move-" + Cara.Support.Direction.Up.toString());
                        }
                    }
                    if (attacking) {
                        switch (this.direction) {
                            case Cara.Support.Direction.Right:
                                this.sprite.animations.play("attack-" + Cara.Support.Direction.Right.toString());
                                break;
                            case Cara.Support.Direction.Down:
                                this.sprite.animations.play("attack-" + Cara.Support.Direction.Down.toString());
                                break;
                            case Cara.Support.Direction.Left:
                                this.sprite.animations.play("attack-" + Cara.Support.Direction.Left.toString());
                                break;
                            case Cara.Support.Direction.Up:
                                this.sprite.animations.play("attack-" + Cara.Support.Direction.Up.toString());
                                break;
                        }
                    }
                    if (!input) {
                        this.idle(this.direction);
                    }
                };
                return Player;
            })(Components.Character);
            Components.Player = Player;
        })(Components = Cara.Components || (Cara.Components = {}));
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
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
                    this.game.load.json("knight-data", "../../assets/data/knight.json");
                    this.player = new Cara.Components.Player(this.game, "knight-data");
                    this.player.preload();
                };
                InPlay.prototype.create = function () {
                    this.player.create();
                };
                InPlay.prototype.update = function () {
                    this.player.update();
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