module Dangerfox.Cara.Components
{
    export class Map
    {
        protected map;
        protected layer;
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
        }

        public create()
        {
            this.game.stage.backgroundColor = '#000000';

            this.map = this.game.add.tilemap('map');

            this.map.addTilesetImage('MapTiles', 'map_tiles');
            this.map.addTilesetImage('Logs', 'logs_tile');

            this.layer = this.map.createLayer('Base');
            //this.layer = this.map.createLayer('Paths');
            //this.layer = this.map.createLayer('Trees');
            //this.layer = this.map.createLayer('Tower');
            //this.layer = this.map.createLayer('Inner-Ts');
            //this.layer = this.map.createLayer('Buildings');
            //this.layer = this.map.createLayer('Building-Ts');
            //this.layer = this.map.createLayer('Item-Ts');
            //this.layer = this.map.createLayer('Signs');
            //this.layer = this.map.createLayer('Wall-1');
            //this.layer = this.map.createLayer('Wall-2');
            //this.layer = this.map.createLayer('Wall-3');
            //this.layer = this.map.createLayer('Wall-4');

            this.layer.resizeWorld();

            this.layer.wrap = true;
        }
    }
}