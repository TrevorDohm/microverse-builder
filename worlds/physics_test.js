// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js", "stickyNote.js", "rapier.js", "avatarEvents.js"
    ];

    Constants.UserBehaviorDirectory = "behaviors/race";
    Constants.UserBehaviorModules = [
        "car.js", "lights.js", "controller.js", "cascade.js"
    ];

    Constants.UseRapier = true;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
            //    dataScale: [18, 18, 18],
                layers: ["walk"],
                type: "3d",
            //    dataLocation: "./assets/3D/tsukuba2.glb.zip",
                translation: [0, -1.7, 0], /*[1.6, -3.95, 8.6],*/
                singleSided: true,
                shadow: true,
                fullBright: true,
            /*    placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],*/
                behaviorModules: ["Rapier", "Cascade"],
                rapierSize: [200, 0.1, 200],
                rapierShape: "cuboid",
                rapierType: "static",
                color: 0x808080,

            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/night_sky_4k.jpg",
                dataType: "jpg",
            }
        },
/*        {
            card: {
                name:"racecarone",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [0, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "./assets/3D/porscheBlue.zip",
                behaviorModules: ["Rapier", "Drive", "Cascade"], 
                myScope: "A",
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"racecartwo",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [5, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "./assets/3D/porscheRed.zip",
                behaviorModules: ["Rapier", "Drive", "Cascade"],
                myScope: "B",
                color: 0xff0000
            }
        },*/
    /*    {
            card: {
                name:"controllerone",
                type: "3d",
                translation: [-5, 0.4, -10],
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A",
                multiuser: false,
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"controllertwo",
                type: "3d",
                translation: [10, 0.4, -10],
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0xff0000
            }
        },*/
        {
            card: {
                name:"block1",
                type: "3d",
                translation: [10, 10, -15],
                behaviorModules: ["Rapier", "Cascade"],
                layers: ["walk"],
                rapierSize: [2, 2, 2],
                rapierShape: "cuboid",
                rapierType: "dynamic",
                color: 0x000077,


            }
        },
        {
            card: {
                name:"block2",
                type: "3d",
                translation: [10, -0.7, -15],
                behaviorModules: ["Rapier", "Cascade"],
                layers: ["walk"],
                rapierSize: [2, 2, 2],
                rapierShape: "cuboid",
                rapierType: "static",
                color: 0x007700,


            }
        },
        {
            card: {
                name:"block3", //drivable
                type: "3d",
                translation: [5, 2, -15],
                behaviorModules: ["Rapier", "Cascade", "Drive"],
                layers: ["walk", "pointer"],
                rapierSize: [2, 1, 2],
                rapierShape: "cuboid",
                rapierType: "dynamic",
                rapierRotation: ["true", "true", "true"], //TODO
                color: 0x770000,


            }
        },
        {
            card: {
                name:"block4",
                type: "3d",
                translation: [5, 2, -20],
                behaviorModules: ["Rapier", "Cascade"],
                layers: ["walk"],
                rapierSize: [2, 2, 2],
                rapierShape: "cuboid",
                rapierType: "dynamic",
                color: 0x000077,


            }
        },
    ];
}