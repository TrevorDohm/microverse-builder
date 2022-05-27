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
        "car.js", "lights.js", "controller.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                layers: ["walk"],
                type: "3d",
                translation:[0, -1.7, 0],
                singleSided: true,
                shadow: true,
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],

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
        {
            card: {
                name:"racecarone",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [0, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "./assets/3D/porscheBlue.zip",
                behaviorModules: ["Rapier", "Drive"], 
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
                behaviorModules: ["Rapier", "Drive"],
                myScope: "B",
                color: 0xff0000
            }
        },
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
    ];
}
