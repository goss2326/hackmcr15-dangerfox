module Dangerfox.Cara.Components
{
    export class Map
    {
        protected map;
        protected layers: Array<Phaser.TilemapLayer>;
        protected cursors;

        constructor(protected game: Phaser.Game)
        {
        }

        public preload()
        {
            this.game.load.tilemap(
                'map',
                '../../assets/tilemaps/testmap.json',
                null,
                Phaser.Tilemap.TILED_JSON
            );

            this.game.load.image(
                'map_tiles',
                '../../assets/tilesets/map_tiles.png'
            );

            this.game.load.image(
                'logs_tile',
                '../../assets/tilesets/logs_tile.png'
            );

            this.layers = new Array<Phaser.TilemapLayer>(13);
        }

        public create()
        {
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

            for (var i: number = 0; i < this.layers.length; ++i)
            {
                this.layers[i].resizeWorld();
                this.layers[i].wrap = true;
            }
        }
    }
}