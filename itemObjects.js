
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initItems(targets) {
    console.log("initItems");

    var items = {};
    var canvasS = clientApp.displayItems.studio;

    items.Softlight = new Item(
        /* itemId */ "Softlight",
        /* itemEl */ null,
        /* itemName */ "Softlight",
        /* itemText */ "Mole Richardson 1K Softbox",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "softlight_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:20, T:80, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:720, H:405 }      // relative
    );
    items.opal = new Item(
        /* itemId */ "opal",
        /* itemEl */ null,
        /* itemName */ "opal",
        /* itemText */ "opal -- lighter diffusion material",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "diff1_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.halfWhite = new Item(
        /* itemId */ "halfWhite",
        /* itemEl */ null,
        /* itemName */ "halfWhite",
        /* itemText */ "halfWhite -- partial diffusion",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "diff2_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.rolux = new Item(
        /* itemId */ "rolux",
        /* itemEl */ null,
        /* itemName */ "rolux",
        /* itemText */ "rolux -- moderate diffusion",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "diff3_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.toughWhite = new Item(
        /* itemId */ "toughWhite",
        /* itemEl */ null,
        /* itemName */ "toughWhite",
        /* itemText */ "toughWhite -- heavy diffuser",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "diff4_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.toughspun = new Item(
        /* itemId */ "toughspun",
        /* itemEl */ null,
        /* itemName */ "toughspun",
        /* itemText */ "toughWhite -- a common multi-purpose diffuser",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "diff5_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.f150 = new Item(
        /* itemId */ "f150",
        /* itemEl */ null,
        /* itemName */ "f150",
        /* itemText */ "Arri 150 Watt fresnel light",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "f150_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:20, T:80, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:720, H:405 }      // relative
    );
    items.f300 = new Item(
        /* itemId */ "f300",
        /* itemEl */ null,
        /* itemName */ "f300",
        /* itemText */ "Arri 300 Watt fresnel light",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "f300_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:20, T:80, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:720, H:405 }      // relative
    );
    items.f650 = new Item(
        /* itemId */ "f650",
        /* itemEl */ null,
        /* itemName */ "f650",
        /* itemText */ "Arri 650 Watt fresnel light",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "f650_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:20, T:80, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:720, H:405 }      // relative
    );
    items.f1000 = new Item(
        /* itemId */ "f1000",
        /* itemEl */ null,
        /* itemName */ "f1000",
        /* itemText */ "Arri 1K (1000W) fresnel light",
        /* itemType */ "gridItem",
        /* itemMove */ "dragger",
        /* itemImage */ "f1000_0",
        /* itemTargets */ [],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLTWH */ { L:0, T:0, W:0, H:0 },
        /* initLTWH */ { L:20, T:80, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:720, H:405 }      // relative
    );
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
        /* itemType */ "gridItem",
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
        /* itemType */ "gridItem",
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
        /* itemType */ "gridItem",
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
