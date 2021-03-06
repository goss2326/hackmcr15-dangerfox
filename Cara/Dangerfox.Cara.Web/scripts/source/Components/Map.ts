﻿module Dangerfox.Cara.Components {
    export class Map {
        protected map;
        public layerBase;
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

        constructor(protected game: Phaser.Game) {
        }

        public preload() {
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

        public create() {
            this.game.stage.backgroundColor = '#000000';

            this.map = this.game.add.tilemap('map');

            this.map.addTilesetImage('MapTiles', 'map_tiles');

            this.map.setCollision(18);
            this.map.setCollision(19);
            this.map.setCollision(50);
            this.map.setCollision(51);
            this.map.setCollision(82);
            this.map.setCollision(83);
            this.map.setCollision(482);
            this.map.setCollision(483);
            this.map.setCollision(520);
            this.map.setCollision(521);
            this.map.setCollision(522);
            this.map.setCollision(546);
            this.map.setCollision(547);
            this.map.setCollision(552);
            this.map.setCollision(553);
            this.map.setCollision(554);
            this.map.setCollision(584);
            this.map.setCollision(585);
            this.map.setCollision(586);
            this.map.setCollision(590);
            this.map.setCollision(591);
            this.map.setCollision(616);
            this.map.setCollision(617);
            this.map.setCollision(618);
            this.map.setCollision(622);
            this.map.setCollision(623);
            this.map.setCollision(624);
            this.map.setCollision(625);
            this.map.setCollision(648);
            this.map.setCollision(649);
            this.map.setCollision(650);
            this.map.setCollision(654);
            this.map.setCollision(655);
            this.map.setCollision(656);
            this.map.setCollision(657);
            this.map.setCollision(686);
            this.map.setCollision(687);
            this.map.setCollision(1029);
            this.map.setCollision(1030);
            this.map.setCollision(1032);
            this.map.setCollision(1033);
            this.map.setCollision(1034);
            this.map.setCollision(1035);
            this.map.setCollision(1036);
            this.map.setCollision(1037);
            this.map.setCollision(1038);
            this.map.setCollision(1039);
            this.map.setCollision(1052);
            this.map.setCollision(1053);
            this.map.setCollision(1061);
            this.map.setCollision(1064);
            this.map.setCollision(1065);
            this.map.setCollision(1066);
            this.map.setCollision(1067);
            this.map.setCollision(1068);
            this.map.setCollision(1069);
            this.map.setCollision(1070);
            this.map.setCollision(1071);
            this.map.setCollision(1084);
            this.map.setCollision(1085);
            this.map.setCollision(1236);
            this.map.setCollision(1237);
            this.map.setCollision(1238);
            this.map.setCollision(1239);
            this.map.setCollision(1268);
            this.map.setCollision(1269);
            this.map.setCollision(1270);
            this.map.setCollision(1271);
            this.map.setCollision(1300);
            this.map.setCollision(1301);
            this.map.setCollision(1302);
            this.map.setCollision(1322);
            this.map.setCollision(1332);
            this.map.setCollision(1333);
            this.map.setCollision(1334);
            this.map.setCollision(1350);
            this.map.setCollision(1351);
            this.map.setCollision(1364);
            this.map.setCollision(1365);
            this.map.setCollision(1366);
            this.map.setCollision(1367);
            this.map.setCollision(1376);
            this.map.setCollision(1382);
            this.map.setCollision(1383);
            this.map.setCollision(1396);
            this.map.setCollision(1397);
            this.map.setCollision(1398);
            this.map.setCollision(1399);
            this.map.setCollision(1414);
            this.map.setCollision(1415);
            this.map.setCollision(1428);
            this.map.setCollision(1446);
            this.map.setCollision(1447);
            this.map.setCollision(1429);
            this.map.setCollision(1430);
            this.map.setCollision(1431);
            this.map.setCollision(1440);
            this.map.setCollision(1441);
            this.map.setCollision(1460);
            this.map.setCollision(1461);
            this.map.setCollision(1462);
            this.map.setCollision(1463);
            this.map.setCollision(1472);
            this.map.setCollision(1473);
            this.map.setCollision(1492);
            this.map.setCollision(1493);
            this.map.setCollision(1494);
            this.map.setCollision(1495);
            this.map.setCollision(1538);
            this.map.setCollision(1539);
            this.map.setCollision(1570);
            this.map.setCollision(1571);
            this.map.setCollision(1602);
            this.map.setCollision(1603);
            this.map.setCollision(1891);
            this.map.setCollision(1923);
            this.map.setCollision(1955);
            this.map.setCollision(1987);


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