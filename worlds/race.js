// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js", "stickyNote.js", "rapier.js", "avatar.js"
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
                layers: ["walk"],
                type: "3d",
                translation:[0, -1.7, 0],
                singleSided: true,
                shadow: true,
            /*    placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],*/
                behaviorModules: ["Rapier", "Cascade"],
                rapierSize: [400, 0.1, 400],
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
                dataRotation: [-Math.PI / 2, -Math.PI / 2, 0],
                translation: [0, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "3Rph2fVNkc0jhp42pQF7jVIX5t2yeugm3T6CFPV1F4c4OiYmIiFofX00Oz43IXwnIXwxID0jJzcmfDs9fSd9BB4aNghrYWMwFDEIFidjEzsGZSYcOxAmajgYYH07PXwxID0jJzcmfD87MSA9JDcgITd9EyUlJhYaBj8oOzFnOTocMCEwNjZ_OgZiATQGOgE_OD0BZgU9ZR4iAjoIOX02MyYzfTwzaio-MyE7NA07NT8KFQVrNWATYAA7GRllYWMFEBhiJQskIj8xfyM9ZmI",
                behaviorModules: ["Rapier", "Drive", "Cascade"], 
                myScope: "A",
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"racecartwo",
                dataRotation: [-Math.PI / 2, -Math.PI / 2, 0],
                translation: [5, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "3Rph2fVNkc0jhp42pQF7jVIX5t2yeugm3T6CFPV1F4c4OiYmIiFofX00Oz43IXwnIXwxID0jJzcmfDs9fSd9BB4aNghrYWMwFDEIFidjEzsGZSYcOxAmajgYYH07PXwxID0jJzcmfD87MSA9JDcgITd9EyUlJhYaBj8oOzFnOTocMCEwNjZ_OgZiATQGOgE_OD0BZgU9ZR4iAjoIOX02MyYzfTwzaio-MyE7NA07NT8KFQVrNWATYAA7GRllYWMFEBhiJQskIj8xfyM9ZmI",
                behaviorModules: ["Rapier", "Drive", "Cascade"],
                myScope: "B",
                color: 0xff0000
            }
        },*/
        {
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
        },
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
                name:"block3",
                type: "3d",
                translation: [5, 0, -15],
                behaviorModules: ["Rapier", "Cascade", "Drive"],
                layers: ["walk", "pointer"],
                rapierSize: [2, 1, 2],
                rapierShape: "cuboid",
                rapierType: "dynamic",
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
