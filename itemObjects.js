
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initItems(targets) {
    console.log("initItems");

    var items = {};
    var canvasS = clientApp.displayItems.studio;

    items.flagMover = new Item(
        /* itemId */ "flagMover",
        /* itemEl */ null,
        /* itemName */ "flagMover",
        /* itemText */ "click and drag flag icon to change position",
        /* itemType */ "actor",
        /* itemMove */ "matrixAB",
        /* itemImage */ "dragger1_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:620, T:30, W:60, H:60 },      // relative
        /* bounds */ { L:560, T:20, W:80, H:80 }      // relative
    );
    items.scrim1_0 = new Item(
        /* itemId */ "scrim1_0",
        /* itemEl */ null,
        /* itemName */ "half stop",
        /* itemText */ "half-stop scrim (minor brightness tweak)",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemImage */ "scrim1_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.scrim2_0 = new Item(
        /* itemId */ "scrim2_0",
        /* itemEl */ null,
        /* itemName */ "full stop",
        /* itemText */ "full-stop scrim (reduces brightness more)",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemImage */ "scrim2_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.scrim3_0 = new Item(
        /* itemId */ "scrim3_0",
        /* itemEl */ null,
        /* itemName */ "gradiated",
        /* itemText */ "gradiated scrim -- cuts light more at bottom of beam",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemImage */ "scrim3_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.f650_0_2 = new Item(
        /* itemId */ "f650_0_2",
        /* itemEl */ null,
        /* itemName */ "scrims_650",
        /* itemText */ "",
        /* itemType */ "setup",
        /* itemMove */ "none",
        /* itemImage */ "f650_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:400, T:80, W:350, H:270 },
        /* bounds */ { L:400, T:80, W:350, H:270 }
    );
    items.distance_0_1 = new Item(
        /* itemId */ "distance_0_1",
        /* itemEl */ null,
        /* itemName */ "distance_650",
        /* itemText */ "click and drag light icon to change position",
        /* itemType */ "actor",
        /* itemMove */ "slider",
        /* itemImage */ "f650_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:600, T:30, W:52, H:40 },      // relative
        /* bounds */ { L:290, T:20, W:340, H:110 }      // relative
    );
    return items;
}

function Item(itemId, itemEl, itemName, itemText, itemType, itemMove, itemImage, itemTargets, itemControls, startXY, minMaxLT, dropLTWH, initLTWH, bounds) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemText = itemText;
    this.itemType = itemType;
    this.itemMove = itemMove;
    this.itemImage = itemImage;
    this.itemTargets = itemTargets;
    this.itemControls = itemControls;
    this.startXY = startXY;
    this.minMaxLT = minMaxLT;
    this.initLTWH = initLTWH;
    this.dropLTWH = dropLTWH;
    this.bounds = bounds;
}
