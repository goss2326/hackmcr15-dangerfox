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
                Character.prototype.create = function (startPosition, spriteScale, spriteData) {
                    // create the sprite
                    this.sprite = this.game.add.sprite(startPosition.x, startPosition.y, this.spriteKey);
                    this.sprite.scale = spriteScale;
                    // animations
                    var animations = spriteData.animations;
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Right.toString(), animations.moveRight, animations.moveFps, true);
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Down.toString(), animations.moveDown, animations.moveFps, true);
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Left.toString(), animations.moveLeft, animations.moveFps, true);
                    this.sprite.animations.add("move-" + Cara.Support.Direction.Up.toString(), animations.moveUp, animations.moveFps, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Right.toString(), animations.idleRight, animations.idleFps, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Down.toString(), animations.idleDown, animations.idleFps, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Left.toString(), animations.idleLeft, animations.idleFps, true);
                    this.sprite.animations.add("idle-" + Cara.Support.Direction.Up.toString(), animations.idleUp, animations.idleFps, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Right.toString(), animations.attackRight, animations.attackFps, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Down.toString(), animations.attackDown, animations.attackFps, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Left.toString(), animations.attackLeft, animations.attackFps, true);
                    this.sprite.animations.add("attack-" + Cara.Support.Direction.Up.toString(), animations.attackUp, animations.attackFps, true);
                    // play default
                    this.sprite.animations.play("idle-" + Cara.Support.Direction.Down.toString());
                    // configure physics
                    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
                    this.sprite.body.collideWorldBounds = true;
                    // setup bounding box
                    var physics = spriteData.physics;
                    var boundingBox = physics.boundingBox;
                    this.sprite.body.setSize(boundingBox.width, boundingBox.height, boundingBox.offsetX, boundingBox.offsetY);
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
            var Enemy = (function (_super) {
                __extends(Enemy, _super);
                function Enemy(game) {
                    _super.call(this, game, "enemy", 32.0);
                }
                Enemy.prototype.preload = function (spritesheet, spriteWidth, spriteHeight) {
                    _super.prototype.preload.call(this, spritesheet, spriteWidth, spriteHeight);
                };
                Enemy.prototype.create = function (spriteData, startPosition) {
                    _super.prototype.create.call(this, startPosition, new Phaser.Point(1, 1), spriteData);
                };
                Enemy.prototype.update = function () {
                    this.idle(this.direction);
                };
                return Enemy;
            })(Components.Character);
            Components.Enemy = Enemy;
        })(Components = Cara.Components || (Cara.Components = {}));
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var Components;
        (function (Components) {
            var Map = (function () {
                function Map(game) {
                    this.game = game;
                }
                Map.prototype.preload = function () {
                    this.game.load.tilemap('map', '../../assets/tilemaps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
                    this.game.load.image('map_tiles', '../../assets/tilesets/map_tiles.png');
                    this.game.load.image('logs_tile', '../../assets/tilesets/logs_tile.png');
                    this.layers = new Array(13);
                };
                Map.prototype.create = function () {
                    this.game.stage.backgroundColor = '#000000';
                    this.map = this.game.add.tilemap('map');
                    this.map.addTilesetImage('MapTiles', 'map_tiles');
                    this.map.addTilesetImage('Logs', 'logs_tile');
                    this.layers[0] = this.map.createLayer('Base');
                    this.layers[1] = this.map.createLayer('Paths');
                    this.layers[2] = this.map.createLayer('Trees');
                    this.layers[3] = this.map.createLayer('Tower');
                    this.layers[4] = this.map.createLayer('Inner-Ts');
                    this.layers[5] = this.map.createLayer('Buildings');
                    this.layers[6] = this.map.createLayer('Building-Ts');
                    this.layers[7] = this.map.createLayer('Item-Ts');
                    this.layers[8] = this.map.createLayer('Signs');
                    this.layers[9] = this.map.createLayer('Wall-1');
                    this.layers[10] = this.map.createLayer('Wall-2');
                    this.layers[11] = this.map.createLayer('Wall-3');
                    this.layers[12] = this.map.createLayer('Wall-4');
                    for (var i = 0; i < this.layers.length; ++i) {
                        this.layers[i].resizeWorld();
                        this.layers[i].wrap = true;
                    }
                };
                return Map;
            })();
            Components.Map = Map;
        })(Components = Cara.Components || (Cara.Components = {}));
    })(Cara = Dangerfox.Cara || (Dangerfox.Cara = {}));
})(Dangerfox || (Dangerfox = {}));
var Dangerfox;
(function (Dangerfox) {
    var Cara;
    (function (Cara) {
        var Components;
        (function (Components) {
            var Player = (function (_super) {
                __extends(Player, _super);
                function Player(game) {
                    _super.call(this, game, "player", 32.0);
                }
                Player.prototype.preload = function (spritesheet, spriteWidth, spriteHeight) {
                    _super.prototype.preload.call(this, spritesheet, spriteWidth, spriteHeight);
                };
                Player.prototype.create = function (spriteData) {
                    _super.prototype.create.call(this, new Phaser.Point(0, 0), new Phaser.Point(1, 1), spriteData);
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
                    this.map = new Cara.Components.Map(this.game);
                    this.map.preload();
                    this.player = new Cara.Components.Player(this.game);
                    this.player.preload("../../assets/sprites/knight.png", 96, 96);
                    this.enemies = new Array(1);
                    for (var i = 0; i < this.enemies.length; ++i) {
                        var enemy = new Cara.Components.Enemy(this.game);
                        enemy.preload("../../assets/sprites/knight.png", 96, 96);
                        this.enemies[i] = enemy;
                    }
                };
                InPlay.prototype.create = function () {
                    // Setup the physics system
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    this.map.create();
                    // create the player
                    var knightData = this.game.cache.getJSON("knight-data");
                    this.player.create(knightData);
                    // create the enemies
                    for (var i = 0; i < this.enemies.length; ++i) {
                        this.enemies[i].create(knightData, new Phaser.Point(100, 100));
                    }
                };
                InPlay.prototype.update = function () {
                    this.player.update();
                    for (var i = 0; i < this.enemies.length; ++i) {
                        var enemy = this.enemies[i];
                        enemy.update();
                        this.game.physics.arcade.collide(this.player.sprite, enemy.sprite);
                    }
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