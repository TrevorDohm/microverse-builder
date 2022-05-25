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
        "car.js", "lights.js", "spin.js"
    ];

    // const frameColor = 0x888888;

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
                dataRotation: [-Math.PI / 2, 0, 0],
                translation: [10, -1.672, 10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "3Rph2fVNkc0jhp42pQF7jVIX5t2yeugm3T6CFPV1F4c4OiYmIiFofX00Oz43IXwnIXwxID0jJzcmfDs9fSd9BB4aNghrYWMwFDEIFidjEzsGZSYcOxAmajgYYH07PXwxID0jJzcmfD87MSA9JDcgITd9EyUlJhYaBj8oOzFnOTocMCEwNjZ_OgZiATQGOgE_OD0BZgU9ZR4iAjoIOX02MyYzfTwzaio-MyE7NA07NT8KFQVrNWATYAA7GRllYWMFEBhiJQskIj8xfyM9ZmI",
                behaviorModules: ["Drive"], 
                myScope: "A"
            }
        },
        {
            card: {
                name:"racecartwo",
                dataRotation: [-Math.PI / 2, 0, 0],
                translation: [10, -1.672, 15],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "3Rph2fVNkc0jhp42pQF7jVIX5t2yeugm3T6CFPV1F4c4OiYmIiFofX00Oz43IXwnIXwxID0jJzcmfDs9fSd9BB4aNghrYWMwFDEIFidjEzsGZSYcOxAmajgYYH07PXwxID0jJzcmfD87MSA9JDcgITd9EyUlJhYaBj8oOzFnOTocMCEwNjZ_OgZiATQGOgE_OD0BZgU9ZR4iAjoIOX02MyYzfTwzaio-MyE7NA07NT8KFQVrNWATYAA7GRllYWMFEBhiJQskIj8xfyM9ZmI",
                behaviorModules: ["Drive"],
                myScope: "B"
            }
        },
        {
            card: {
                name:"controllerone",
                type: "3d",
                translation: [10, 0.4, 5],
                dataScale:[1, 1, 1],
                dataLocation: "./assets/3D/testcube_1m.glb.zip",
                behaviorModules: ["Spin"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A"
                // multiuser: true,
                // color: 0xaaaaaa
            }
        },
        {
            card: {
                name:"controllertwo",
                type: "3d",
                translation: [10, 0.4, 20],
                dataScale:[1, 1, 1],
                dataLocation: "./assets/3D/testcube_1m.glb.zip",
                behaviorModules: ["Spin"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B"
                // multiuser: true,
                // color: 0xaaaaaa
            }
        },
    ];
}
