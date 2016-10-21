
// ======= ======= ======= INIT MOVE ======= ======= =======
// ======= ======= ======= INIT MOVE ======= ======= =======
// ======= ======= ======= INIT MOVE ======= ======= =======

// ======= initMove =======
Item.prototype.initMove = function(e) {
    console.log("initMove");

    var page = clientApp.activePage;

    // == get active item element
    var actor = clientApp.activeActor;
    var itemType = actor.itemType;
    actor.itemEl = $("#" + actor.itemId).eq(0);

    // == strip "px" suffix from left and top properties
    var locL = parseInt($(actor.itemEl).css('left').substring(0, $(actor.itemEl).css('left').length - 2));
    var locT = parseInt($(actor.itemEl).css('top').substring(0, $(actor.itemEl).css('top').length - 2));

    // == limit moves to LTWH (left/top/width/height) boundaries
    if (actor.bounds.W > (displayItems.studio.canW - actor.initLTWH.W)) {
        var itemBoundsW = displayItems.studio.canW - actor.initLTWH.W;
    } else {
        var itemBoundsW = actor.bounds.W;
    }
    if (actor.bounds.H > (displayItems.studio.canH - actor.initLTWH.H)) {
        var itemBoundsH = displayItems.studio.canH - actor.initLTWH.H;
    } else {
        var itemBoundsH = actor.bounds.H;
    }

    // ======= ======= ACTOR ======= =======
    // ======= ======= ACTOR ======= =======
    // ======= ======= ACTOR ======= =======

    // == set item/mouse locations and bounds (absolute position)
    actor.startXY.itemL = locL;
    actor.startXY.itemT = locT;
    actor.startXY.mouseX = e.clientX;
    actor.startXY.mouseY = e.clientY;
    actor.startXY.diffX = e.clientX - locL;
    actor.startXY.diffY = e.clientY - locT;
    actor.minMaxLT.minL = displayItems.studio.canL + actor.bounds.L;
    actor.minMaxLT.minT = displayItems.studio.canT + actor.bounds.T;
    actor.minMaxLT.maxL = displayItems.studio.canL + actor.bounds.L + itemBoundsW;
    actor.minMaxLT.maxT = displayItems.studio.canT + actor.bounds.T + itemBoundsH;

    // ======= ======= TARGETS ======= =======
    // ======= ======= TARGETS ======= =======
    // ======= ======= TARGETS ======= =======

    // == page has active targets
    if (page.pageTargets.length > 0) {
        var pageTargets = page.pageTargets;
        for (var i = 0; i < pageTargets.length; i++) {
            var target = pageTargets[i];
            target.absLoc.L = displayItems.studio.canL + target.initLTWH.L;
            target.absLoc.T = displayItems.studio.canT + target.initLTWH.T;
            target.absLoc.W = displayItems.studio.canL + target.initLTWH.L + target.initLTWH.W;
            target.absLoc.H = displayItems.studio.canT + target.initLTWH.T + target.initLTWH.H;
        }
    }

    // == setup item has active targets (and may have other non-active targets)
    if (page.SetupItem.targets.length > 0) {
        var setupItem = page.SetupItem.item;
        for (var i = 0; i < page.SetupItem.targets.length; i++) {
            var target = page.SetupItem.targets[i];
            target.absLoc.L = displayItems.studio.canL + setupItem.initLTWH.L + target.initLTWH.L;
            target.absLoc.T = displayItems.studio.canT + setupItem.initLTWH.T + target.initLTWH.T;
            target.absLoc.W = displayItems.studio.canL + setupItem.initLTWH.L + target.initLTWH.L + target.initLTWH.W;
            target.absLoc.H = displayItems.studio.canT + setupItem.initLTWH.T + target.initLTWH.T + target.initLTWH.H;
        }
    }

    // ======= ======= CONTROLS ======= =======
    // ======= ======= CONTROLS ======= =======
    // ======= ======= CONTROLS ======= =======

    // == over-ride previous bounds values for control actors (they do not move; swap frames only)
    if (page.SetupItem.controls.length > 0) {
        var setupItem = page.SetupItem.item;
        var control = page.SetupItem.controls[0];
        actor.minMaxLT.minL = displayItems.studio.canL + setupItem.initLTWH.L + control.initLTWH.L + actor.bounds.L;
        actor.minMaxLT.minT = displayItems.studio.canT + setupItem.initLTWH.T + control.initLTWH.T + actor.bounds.T;
        actor.minMaxLT.maxL = displayItems.studio.canL + setupItem.initLTWH.L + control.initLTWH.L + actor.bounds.L + itemBoundsW;
        actor.minMaxLT.maxT = displayItems.studio.canT + setupItem.initLTWH.T + control.initLTWH.T + actor.bounds.T + itemBoundsH;
    }

    window.addEventListener('mousemove', actor.moveItem, true);
    window.addEventListener('mouseup', actor.mouseUp, true);
}

// ======= ======= ======= MOUSE MOVE ======= ======= =======
// ======= ======= ======= MOUSE MOVE ======= ======= =======
// ======= ======= ======= MOUSE MOVE ======= ======= =======

// ======= moveItem =======
Item.prototype.moveItem = function(e) {
    // console.log("moveItem");

    var page = clientApp.activePage;
    var actor = clientApp.activeActor;
    var itemMove = actor.itemMove;

    // == calculate change in mouse X/Y location in pixels
    var dX = parseInt(e.clientX - actor.startXY.mouseX);
    var dY = parseInt(e.clientY - actor.startXY.mouseY);

    // == calculate percentage of X/Y travel across item bounds area
    var deltaX = ((dX + actor.dropLTWH.L)/actor.bounds.W).toFixed(2);
    var deltaY = ((dY + actor.dropLTWH.T)/actor.bounds.H).toFixed(2);

    switch(itemMove) {
        case "control":
            var left = parseInt(actor.startXY.itemL + dX);
            var top = parseInt(actor.startXY.itemT + dY);
            var itemLT = getMoveBoundaries(left, top);
            getControlFrames(itemLT[0], itemLT[1], deltaX, deltaY);
            break;
        case "matrixAB":
            var left = parseInt(actor.startXY.itemL + dX);
            var top = parseInt(actor.startXY.itemT + dY);
            var itemLT = getMoveBoundaries(left, top);
            updateMatrixAB(itemLT[0], itemLT[1]);
            break;
        case "dragger":
            var left = parseInt(actor.startXY.itemL + dX);
            var top = parseInt(actor.startXY.itemT + dY);
            var itemLT = getMoveBoundaries(left, top);

            // == check for setup or page targets
            if (page.SetupItem.targets.length > 0) {
                checkItemTargets(itemLT[0], itemLT[1], "setup");
            } else if (page.pageTargets.length > 0) {
                checkItemTargets(itemLT[0], itemLT[1], "page");
            } else {
                updateItemLoc(itemLT[0], itemLT[1]);
            }
            break;
        case "slider":
            var left = parseInt(actor.startXY.itemL + dX);
            var top = parseInt(actor.startXY.itemT - actor.dropLTWH.T - (actor.bounds.H * deltaX));
            var itemLT = getMoveBoundaries(left, top);
            updateItemLoc(itemLT[0], itemLT[1]);
            break;
    }

    // ======= updateMatrixAB =======
    function updateMatrixAB(left, top) {
        // console.log("updateMatrixAB");

        // == calculate percent movement through frameset/limit frames to start/end
        var indexX = Math.round(-deltaX * page.studio.endFrame);
        if (indexX < 0) {
            indexX = 0;
        }
        if (indexX > page.studio.endFrame) {
            indexX = page.studio.endFrame;
        }
        var indexY = Math.round(deltaY * page.studio.endFrame);
        if (indexY < 0) {
            indexY = 0;
        }
        if (indexY > page.studio.endFrame) {
            indexY = page.studio.endFrame;
        }
        // console.log("indexX:", indexX);
        // console.log("indexY:", indexY);

        // == set real-time item loc based on slider position
        $(actor.itemEl).css('z-index', '10');
        $(actor.itemEl).css('top', top + 'px');
        $(actor.itemEl).css('left', left + 'px');
        actor.startXY.dragL = left;
        actor.startXY.dragT = top;

        // == set real-time canvas frame based on slider position
        clientApp.updateCanvasFrame(indexX, indexY);

        // == update locXY indicator
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");
    }

    // ======= checkItemTargets =======
    function checkItemTargets(left, top, targetType) {
        // console.log("checkItemTargets");

        if (targetType == "page") {
            var targetList = page.pageTargets;
        } else if (targetType == "setup") {
            var targetList = page.SetupItem.targets;
        }

        // == set real-time item loc and canvas frame based on slider position
        $(actor.itemEl).css('z-index', '10');
        $(actor.itemEl).css('top', top + 'px');
        $(actor.itemEl).css('left', left + 'px');
        actor.startXY.dragL = left;
        actor.startXY.dragT = top;

        // == init collision detector for target
        var target;
        var draggerL = left + actor.initLTWH.W/2;
        var draggerT = top + actor.initLTWH.H/2;

        // == search available targets for collision
        for (var i = 0; i < targetList.length; i++) {
            target = targetList[i];

            // == COLLISION with target
            if ((draggerL < target.absLoc.W) && (draggerT > target.absLoc.T) && (draggerL > target.absLoc.L) && (draggerT < target.absLoc.H)) {
                console.log("-- HIT -- HIT -- HIT --");

                // == locate dragged item at top/left of target
                $(actor.itemEl).off();
                $(actor.itemEl).css('top', target.absLoc.T + 'px');
                $(actor.itemEl).css('left', target.absLoc.L + 'px');
                $(actor.itemEl).css('background-size', target.initLTWH.W + 'px');
                $(actor.itemEl).css('background-repeat', 'no-repeat');
                $(actor.itemEl).css('width', target.initLTWH.W + 'px');
                $(actor.itemEl).css('height', target.initLTWH.H + 'px');

                clientApp.updateCanvasFrame(actor.indexedFrame, null);
                swapTargetOccupiers(target, actor);
                window.removeEventListener('mousemove', actor.moveItem, true);
                window.removeEventListener('mouseup', actor.mouseUp, true);
            }
        }
    }

    // ======= swapTargetOccupiers =======
    function swapTargetOccupiers(target, newOccupier) {
        console.log("swapTargetOccupiers");

        // == fade out new occupier
        $(newOccupier.itemEl).fadeOut(1000, function() {

            // == return target occupier to its original location
            var occupier = target.occupier;
            if (occupier) {
                $(occupier.itemEl).css('visibility', 'visible');
                $(occupier.itemEl).css('display', 'block');
                $(occupier.itemEl).css('width', target.occupier.initLTWH.W * 0.4);
                $(occupier.itemEl).css('height', target.occupier.initLTWH.H * 0.4);
                $(occupier.itemEl).css('z-index', '10');
                $(occupier.itemEl).css('background-size', '100%');
                $(occupier.itemEl).animate({
                    width: occupier.initLTWH.W,
                    height: occupier.initLTWH.H,
                    left: occupier.initLTWH.L,
                    top: occupier.initLTWH.T
                }, 500, function() {
                    console.log("itemReturned");

                    // == restore event listener on previous target occupier
                    $(occupier.itemEl).on('mousedown', function(e) {
                        console.log("\nmousedown");
                        window.removeEventListener('mouseup', actor.mouseUp, true);
                        var actor = clientApp.items[$(e.currentTarget).attr('id')];
                        var actorEl = $(e.currentTarget);
                        e.preventDefault();
                        clientApp.activeActor = actor;
                        actor.initMove(e, actorEl, actor);
                    });

                });
            }

            // == install newOccupier on target
            target.occupier = newOccupier;
        });
    }

    // ======= getControlFrames =======
    function getControlFrames(dX, dY, deltaX, deltaY) {
        // console.log("getControlFrames");
        // console.log("dX, dY, deltaX, deltaY:", dX, dY, deltaX, deltaY);

        // == calculate percent movement through frameset/limit frames to start/end
        var frameIndex = Math.round(-deltaX * actor.itemImage.endFrame);
        if (frameIndex < 0) {
            frameIndex = 0;
        }
        if (frameIndex > actor.itemImage.endFrame) {
            frameIndex = actor.itemImage.endFrame;
        }
        clientApp.updateControlFrame(frameIndex, null);
        clientApp.updateCanvasFrame(frameIndex, null);
    }

    // ======= updateItemLoc =======
    function updateItemLoc(left, top) {
        // console.log("updateItemLoc");

        // == calculate percent movement through frameset/limit frames to start/end
        var frameIndex = Math.round(-deltaX * clientApp.activePage.studio.endFrame);
        if (frameIndex < 0) {
            frameIndex = 0;
        }
        if (frameIndex > clientApp.activePage.studio.endFrame) {
            frameIndex = clientApp.activePage.studio.endFrame;
        }

        // == set real-time item loc based on slider position
        $(actor.itemEl).css('z-index', '10');
        $(actor.itemEl).css('top', top + 'px');
        $(actor.itemEl).css('left', left + 'px');
        actor.startXY.dragL = left;
        actor.startXY.dragT = top;

        // == update screen XY locator (for development)
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");

        // == set real-time canvas frame based on slider/dragger position
        clientApp.updateCanvasFrame(frameIndex, null);
    }

    // ======= ======= ======= MATH ======= ======= =======
    // ======= ======= ======= MATH ======= ======= =======
    // ======= ======= ======= MATH ======= ======= =======

    // ======= getMoveBoundaries =======
    function getMoveBoundaries(left, top) {
        // console.log("getMoveBoundaries");
        if (left < actor.minMaxLT.minL) {
            left = actor.minMaxLT.minL;
        }
        if (left > actor.minMaxLT.maxL) {
            left = actor.minMaxLT.maxL;
        }
        if (top < actor.minMaxLT.minT) {
            top = actor.minMaxLT.minT;
        }
        if (top > actor.minMaxLT.maxT) {
            top = actor.minMaxLT.maxT;
        }
        return [left, top];
    }
}

// ======= ======= ======= MOUSE UP ======= ======= =======
// ======= ======= ======= MOUSE UP ======= ======= =======
// ======= ======= ======= MOUSE UP ======= ======= =======

// ======= mouseUp =======
Item.prototype.mouseUp = function(e) {
    console.log("mouseUp");

    var actor = clientApp.activeActor;
    $(clientApp.activeActor.itemEl).off();
    window.removeEventListener('mousemove', actor.moveItem, true);

    // == store relative loc where item was dropped
    actor.dropLTWH.L = actor.startXY.dragL - (clientApp.displayItems.studio.canL + actor.bounds.L + actor.bounds.W);
    actor.dropLTWH.T = actor.startXY.dragT - (clientApp.displayItems.studio.canT + actor.bounds.T);
    actor.dropLTWH.W = null;
    actor.dropLTWH.H = null;

    // == reactivate item
    clientApp.activateLessonItems();
}
