
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======

// ======= initMove =======
Item.prototype.initMove = function(e) {
    console.log("initMove");

    // == get active item element
    var page = clientApp.activePage;
    var item = clientApp.activeActor;
    var itemType = item.itemType;
    item.itemEl = $("#" + item.itemId).eq(0);
    console.log("item.itemTargets:", item.itemTargets);

    // == strip "px" suffix from left and top properties
    var locL = parseInt($(item.itemEl).css('left').substring(0, $(item.itemEl).css('left').length - 2));
    var locT = parseInt($(item.itemEl).css('top').substring(0, $(item.itemEl).css('top').length - 2));
    $('#locXYWH').html("<p class='info-text'>left: " + locL + "</p><p class='info-text'>top: " + locT + "</p>");

    // == limit moves to max canvas boundaries
    if (item.bounds.W > (displayItems.studio.canW - item.initLTWH.W)) {
        var itemBoundsW = displayItems.studio.canW - item.initLTWH.W;
    } else {
        var itemBoundsW = item.bounds.W;
    }
    if (item.bounds.H > (displayItems.studio.canH - item.initLTWH.H)) {
        var itemBoundsH = displayItems.studio.canH - item.initLTWH.H;
    } else {
        var itemBoundsH = item.bounds.H;
    }

    // == set item/mouse locations and bounds (absolute position)
    item.startXY.itemL = locL;
    item.startXY.itemT = locT;
    item.startXY.mouseX = e.clientX;
    item.startXY.mouseY = e.clientY;
    item.startXY.diffX = e.clientX - locL;
    item.startXY.diffY = e.clientY - locT;
    item.minMaxLT.minL = displayItems.studio.canL + item.bounds.L;      // absolute
    item.minMaxLT.minT = displayItems.studio.canT + item.bounds.T;      // absolute
    item.minMaxLT.maxL = displayItems.studio.canL + item.bounds.L + itemBoundsW;      //  - item.initLTWH.W;
    item.minMaxLT.maxT = displayItems.studio.canT + item.bounds.T + itemBoundsH;      //  - item.initLTWH.H;

    // == set relative bounds to absolute bounds
    var target, setup;
    if ((item.itemTargets.length > 0) && (page.SetupItems.length > 0)) {
        setup = page.SetupItems[0];
        for (var i = 0; i < item.itemTargets.length; i++) {
            target = item.itemTargets[i];
            target.absLoc.L = target.initLTWH.L + setup.initLTWH.L + displayItems.studio.canL;
            target.absLoc.T = target.initLTWH.T + setup.initLTWH.T + displayItems.studio.canT;
            target.absLoc.W = target.initLTWH.L + setup.initLTWH.L + displayItems.studio.canL + target.initLTWH.W;
            target.absLoc.H = target.initLTWH.T + setup.initLTWH.T + displayItems.studio.canT + target.initLTWH.H;
        }
    }

    window.addEventListener('mousemove', item.moveItem, true);
    window.addEventListener('mouseup', item.mouseUp, true);
}

// ======= moveItem =======
Item.prototype.moveItem = function(e) {
    // console.log("moveItem");

    var item = clientApp.activeActor;
    var itemMove = item.itemMove;

    // == calculate change in mouse X/Y location in pixels
    var dX = parseInt(e.clientX - item.startXY.mouseX);
    var dY = parseInt(e.clientY - item.startXY.mouseY);
    var deltaX = ((dX + item.dropLTWH.L)/item.bounds.W).toFixed(2);
    var deltaY = ((dY + item.dropLTWH.T)/item.bounds.H).toFixed(2);

    switch(itemMove) {
        case "matrixAB":
            var left = parseInt(item.startXY.itemL + dX);
            var top = parseInt(item.startXY.itemT + dY);
            var itemLT = getMoveBoundaries(left, top);
            updateMatrixAB(itemLT[0], itemLT[1]);
            break;
        case "slider":
            var left = parseInt(item.startXY.itemL + dX);
            var top = parseInt(item.startXY.itemT - item.dropLTWH.T - (item.bounds.H * deltaX));
            var itemLT = getMoveBoundaries(left, top);
            updateItemLoc(itemLT[0], itemLT[1]);
            break;
        case "dragger":
            var left = parseInt(item.startXY.itemL + dX);
            var top = parseInt(item.startXY.itemT + dY);
            var itemLT = getMoveBoundaries(left, top);
            if (item.itemTargets.length > 0) {
                checkItemTargets(itemLT[0], itemLT[1]);
            } else {
                updateItemLoc(itemLT[0], itemLT[1]);
            }
        break;
    }

    // ======= updateMatrixAB =======
    function updateMatrixAB(left, top) {
        // console.log("updateMatrixAB");

        var item = clientApp.activeActor;

        // == calculate percent movement through frameset/limit frames to start/end
        indexX = Math.round(-deltaX * clientApp.activePage.studio.endFrame);
        if (indexX < 0) {
            indexX = 0;
        }
        if (indexX > clientApp.activePage.studio.endFrame) {
            indexX = clientApp.activePage.studio.endFrame;
        }
        indexY = Math.round(-deltaY * clientApp.activePage.studio.endFrame);
        if (indexY < 0) {
            indexY = 0;
        }
        if (indexY > clientApp.activePage.studio.endFrame) {
            indexY = clientApp.activePage.studio.endFrame;
        }

        // == set real-time item loc and canvas frame based on slider position
        $(item.itemEl).css('z-index', '10');
        $(item.itemEl).css('top', top + 'px');
        $(item.itemEl).css('left', left + 'px');
        item.startXY.dragL = left;
        item.startXY.dragT = top;
        clientApp.updateCanvasFrame(indexX, indexY);
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");
    }

    // ======= swapTargetOccupiers =======
    function swapTargetOccupiers(target, newOccupier) {
        console.log("swapTargetOccupiers");
        console.log("newOccupier.itemId:", newOccupier.itemId);

        // == return target occupier to original location
        var occupier = target.occupier;
        if (occupier) {
            $(occupier.itemEl).css('left', occupier.initLTWH.L);
            $(occupier.itemEl).css('top', occupier.initLTWH.T);
            $(occupier.itemEl).css('display', 'block');
        }
        target.occupier = newOccupier;
    }

    // ======= checkItemTargets =======
    function checkItemTargets(left, top) {
        // console.log("checkItemTargets");

        var item = clientApp.activeActor;

        // == set real-time item loc and canvas frame based on slider position
        $(item.itemEl).css('z-index', '10');
        $(item.itemEl).css('top', top + 'px');
        $(item.itemEl).css('left', left + 'px');
        item.startXY.dragL = left;
        item.startXY.dragT = top;

        // == collision detector for target
        var target;
        var overlap = 10;
        var draggerL = left + item.initLTWH.W/2;
        var draggerT = top + item.initLTWH.H/2;

        for (var i = 0; i < item.itemTargets.length; i++) {
            target = item.itemTargets[i];

            // == set real-time item loc and canvas frame based on slider position
            $(item.itemEl).css('top', top + 'px');
            $(item.itemEl).css('left', left + 'px');
            item.startXY.dragL = left;
            item.startXY.dragT = top;

            if ((draggerL < target.absLoc.W) && (draggerT > target.absLoc.T) && (draggerL > target.absLoc.L) && (draggerT < target.absLoc.H)) {
                console.log("-- HIT -- HIT -- HIT --");
                $(clientApp.activeActor.itemEl).off();
                $(clientApp.activeActor.itemEl).css('z-index', '2');
                $(clientApp.activeActor.itemEl).css('display', 'none');
                window.removeEventListener('mousemove', item.moveItem, true);
                clientApp.updateCanvasFrame(item.indexedFrame, null);
                swapTargetOccupiers(target, item);
                toggleHoverText(target, "target");
            }
        }
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");
    }

    // ======= updateItemLoc =======
    function updateItemLoc(left, top) {
        // console.log("updateItemLoc");

        var item = clientApp.activeActor;

        // == calculate percent movement through frameset/limit frames to start/end
        indexX = Math.round(-deltaX * clientApp.activePage.studio.endFrame);
        if (indexX < 0) {
            indexX = 0;
        }
        if (indexX > clientApp.activePage.studio.endFrame) {
            indexX = clientApp.activePage.studio.endFrame;
        }

        // == set real-time item loc and canvas frame based on slider position
        $(item.itemEl).css('z-index', '10');
        $(item.itemEl).css('top', top + 'px');
        $(item.itemEl).css('left', left + 'px');
        item.startXY.dragL = left;
        item.startXY.dragT = top;
        clientApp.updateCanvasFrame(indexX, null);
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");
    }

    // ======= ======= ======= MATH ======= ======= =======
    // ======= ======= ======= MATH ======= ======= =======
    // ======= ======= ======= MATH ======= ======= =======

    // ======= getMoveBoundaries =======
    function getMoveBoundaries(left, top) {
        // console.log("getMoveBoundaries");
        if (left < item.minMaxLT.minL) {
            left = item.minMaxLT.minL;
        }
        if (left > item.minMaxLT.maxL) {
            left = item.minMaxLT.maxL;
        }
        if (top < item.minMaxLT.minT) {
            top = item.minMaxLT.minT;
        }
        if (top > item.minMaxLT.maxT) {
            top = item.minMaxLT.maxT;
        }
        return [left, top];
    }
}

// ======= ======= ======= MOUSEUP ======= ======= =======
// ======= ======= ======= MOUSEUP ======= ======= =======
// ======= ======= ======= MOUSEUP ======= ======= =======

// ======= mouseUp =======
Item.prototype.mouseUp = function(e) {
    console.log("mouseUp");
    var item = clientApp.activeActor;
    $(clientApp.activeActor.itemEl).off();
    $(clientApp.activeActor.itemEl).css('z-index', '2');
    window.removeEventListener('mousemove', item.moveItem, true);

    // == store relative loc where item was dropped
    item.dropLTWH.L = item.startXY.dragL - (clientApp.displayItems.studio.canL + item.bounds.L + item.bounds.W);
    item.dropLTWH.T = item.startXY.dragT - (clientApp.displayItems.studio.canT + item.bounds.T);
    item.dropLTWH.W = null;
    item.dropLTWH.H = null;
    console.log("\n******* dropLTWH:", item.dropLTWH.L, item.dropLTWH.T);

    // == reactivate item
    clientApp.activateLessonItems();
}
