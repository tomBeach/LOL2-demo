
// ======= ======= ======= TARGETS OBJECTS ======= ======= =======
// ======= ======= ======= TARGETS OBJECTS ======= ======= =======
// ======= ======= ======= TARGETS OBJECTS ======= ======= =======

function initTargets() {
    console.log("initTargets");

    var studioCanvas = clientApp.displayItems.studio;
    var targets = {};

    targets.stand = new Target(
        /* itemId */ "stand",
        /* itemEl */ null,
        /* itemName */ "stand",
        /* itemType */ "target",
        /* itemText */ "drag lights to the ",
        /* itemImage */ { folder:null, image:null, startFrame:0, endFrame:0, initFrame:0 },
        /* initLTWH */ { L:560, T:45, W:75, H:80 },
        /* absLoc */ { L:20, T:20, W:700, H:300 },
        /* occupier */ null
    );
    targets.barndoorFrame = new Target(
        /* itemId */ "barndoorFrame",
        /* itemEl */ null,
        /* itemName */ "barndoorFrame",
        /* itemType */ "setupTarget",
        /* itemText */ "drag items to the ",
        /* itemImage */ { folder:null, image:null, startFrame:0, endFrame:0, initFrame:0 },
        /* initLTWH */ { L:70, T:10, W:120, H:200 },
        /* absLoc */ { L:0, T:0, W:0, H:0 },
        /* occupier */ null
    );
    return targets;
}

function Target(itemId, itemEl, itemName, itemType, itemText, itemImage, initLTWH, absLoc, occupier) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemText = itemText;
    this.itemImage = itemImage;
    this.initLTWH = initLTWH;
    this.absLoc = absLoc;
    this.occupier = occupier;
}
