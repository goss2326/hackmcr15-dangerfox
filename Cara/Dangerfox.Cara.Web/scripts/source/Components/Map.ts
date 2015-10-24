module Dangerfox.Cara.Components
{
    export class Map
    {
        protected map;
        protected layerBase;
        //protected layerPaths;
        //protected layerTrees;
        //protected layerTower;
        //protected layerInnerTs;
        //protected layerBuildings;
        //protected layerBuildingTs;
        //protected layerItemsTs;
        //protected layerSigns;
        //protected layerWall1A;
        //protected layerWall1B;
        //protected layerWall2;
        //protected layerWall3;
        //protected layerWall4;

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
        }

        public create()
        {
            this.game.stage.backgroundColor = '#000000';

            this.map = this.game.add.tilemap('map');

            this.map.addTilesetImage('MapTiles', 'map_tiles');

            this.layerBase = this.map.createLayer('Base');
            //this.layerPaths = this.map.createLayer('Paths');
            //this.layerTrees = this.map.createLayer('Trees');
            //this.layerTower = this.map.createLayer('Tower');
            //this.layerInnerTs = this.map.createLayer('InnerTs');
            //this.layerBuildings = this.map.createLayer('Buildings');
            //this.layerBuildingTs = this.map.createLayer('BuildingTs');
            //this.layerItemsTs = this.map.createLayer('ItemTs');
            //this.layerSigns = this.map.createLayer('Signs');
            //this.layerWall1A = this.map.createLayer('Wall1A');
            //this.layerWall1B = this.map.createLayer('Wall1B');
            //this.layerWall2 = this.map.createLayer('Wall2');
            //this.layerWall3 = this.map.createLayer('Wall3');
            //this.layerWall4 = this.map.createLayer('Wall4');

            this.layerBase.resizeWorld();

        }
    }
}