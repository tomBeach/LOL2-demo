// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======

// var Actor_Data = initActors(this.pages);
// var Setup_Data = {};
// var Group_Data = {};
// var Menu_Data = {};
// var Target_Data = {};

var displayItems = {
    monitor: { itemName: "monitor", itemText: "Monitor", canvasName: "monitorCanvas", can:null, ctx:null, canL:740, canT:10, canW:384, canH:216 },
    // studio: { itemName: "studio", itemText: "Studio View", canvaNames: "studioCanvas", can:null, ctx:null, canL:10, canT:280, canW:720, canH:405 },
    studio: { itemName: "studio", itemText: "Studio View", canvaNames: "studioCanvas", can:null, ctx:null, canL:10, canT:280, canW:1440, canH:810 },
    shop: { itemName: "shop", itemText: "Shop Menu" },
    lessons: { itemName: "lessons", itemText: "Lesson Menu" },
    gridTop: 0,
    gridLeft: 0
}

var gearItems = {
    diffusion: { itemName:"diffusion", itemText:"diffusion", itemType:"gel", image:"diff1_0.png" },
    Fresnel150W: { itemName:"Fresnel 150W", itemText:"Fresnel150W", itemType:"light", image:"f150_0.png" },
    Fresnel300W: { itemName:"Fresnel 300W", itemText:"Fresnel300W", itemType:"light", image:"f300_0.png" },
    Fresnel650W: { itemName:"Fresnel 650W", itemText:"Fresnel650W", itemType:"light", image:"f650_0.png" },
    Fresnel1000W: { itemName:"Fresnel 1000W", itemText:"Fresnel1000W", itemType:"light", image:"f1000_0.png" },
    Floppy: { itemName:"Floppy", itemText:"Floppy", itemType:"controller", image:"floppy_0.png" },
    LEDLight: { itemName:"LED Light", itemText:"LEDLight", itemType:"light", image:"LED_0.png" },
    HalfStopScrim: { itemName:"Half Stop Scrim", itemText:"HalfStopScrim", itemType:"scrim", image:"scrim1_0.png" },
    FullStopScrim: { itemName:"Full Stop Scrim", itemText:"FullStopScrim", itemType:"scrim", image:"scrim2_0.png" },
    GraduatedScrim: { itemName:"Graduated Scrim", itemText:"GraduatedScrim", itemType:"scrim", image:"scrim3_0.png" },
    Softlight: { itemName:"Softlight", itemText:"Softlight", itemType:"light", image:"softlight_0.png" }
}

// ======= ======= ======= ======= ======= initialize ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= initialize ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= initialize ======= ======= ======= ======= =======

var clientApp = {
    pages: null,
    lessons: null,
    activePage: null,
    activeActor: null,
    activeLesson: null,
    gearItems: gearItems,
    displayItems: displayItems,
    monitorImages: [],
    studioImages: [],

    // ======= initialize =======
    initialize: function() {
        console.log("initialize");
        this.targets = initTargets();
        this.items = initItems(this.targets);
        this.pages = initPages(this.items, this.targets);
        this.lessons = initLessons();
        this.activePage = this.pages.page_0_0;
        this.activeLesson = this.lessons.lesson_0;
        this.activeActor = null;
        this.makeLessonMenu(2);
        this.makeGearMenu();
        this.activatePrevNext();
        this.activateMenuItems("lessonMenu");
        this.activateDisplayItems();

    },

    // ======= makeLessonPage =======
    makeLessonPage: function(lessonEl) {
        console.log("\n ******* makeLessonPage *******");
        console.log("activeLesson:", clientApp.activeLesson.lessonIndex);
        console.log("activePage:  ", clientApp.activePage.pageKey);

        this.initLessonCanvases();
        this.clearLessonCanvases();
        this.clearPageElements();
        this.makeLessonCanvases();
        this.makeLessonItems();
        this.activateLessonItems();
        this.makeLessonText(lessonEl);
    },

    // ======= initLessonCanvases =======
    initLessonCanvases: function(lesson) {
        console.log("initLessonCanvases");

        if (!this.displayItems["studio"].can) {

            // == make canvas and context objects
            var canvases = ["studio", "monitor"];
            for (var i = 0; i < canvases.length; i++) {
                var can = document.getElementById(canvases[i] + "Canvas");
                var ctx = can.getContext("2d");
                var width = can.offsetWidth;
                var height = can.offsetHeight;
                var scaleFactor = backingScale(ctx);

                // == detect retina display
                if (scaleFactor > 1) {
                    var canW = width / scaleFactor;
                    var canH = height / scaleFactor;
                    var ctx = can.getContext('2d');
                } else {
                    var canW = width;
                    var canH = height;
                }
                console.log("can:", can);
                console.log("width:", width);
                console.log("height:", height);
                console.log("scaleFactor:", scaleFactor);
                console.log("canW:", canW);
                console.log("canH:", canH);

                // == store can/ctx on app object
                this.displayItems[canvases[i]].can = can;
                this.displayItems[canvases[i]].ctx = ctx;
                // this.displayItems[canvases[i]].canW = canW;
                // this.displayItems[canvases[i]].canH = canH;
            }

            // ======= backingScale =======
            function backingScale(context) {
                if ('devicePixelRatio' in window) {
                    if (window.devicePixelRatio > 1) {
                        return window.devicePixelRatio;
                    }
                }
                return 1;
            }
        }
    },

    // ======= makeLessonCanvases =======
    makeLessonCanvases: function(lesson) {
        console.log("makeLessonCanvases");

        clientApp.studioImages = [];
        clientApp.monitorImages = [];
        var page = clientApp.activePage;

        if (page.studio.image) {
            loadCanvasImages("studio");
        }
        if (page.monitor.image) {
            loadCanvasImages("monitor");
        }

        // ======= loadCanvasImages =======
        function loadCanvasImages(canvas) {
            console.log("loadCanvasImages");

            // == set start/end frame indexes
            if (page.studio.matrix) {
                var matrix = page.studio.matrix;
                var YfilesArray = [];
                var startFrameX = page[canvas].startFrame;
                var endFrameX = page[canvas].endFrame + 1;
                var startFrameY = page[canvas].startFrame;
                var endFrameY = page[canvas].endFrame + 1;
            } else {
                var matrix = null;
                var startFrameX = page[canvas].startFrame;
                var endFrameX = page[canvas].endFrame + 1;
            }

            // == get frameset and canvas params
            var folder = page[canvas].folder;
            var imageName = page[canvas].image;
            var initFrame = page[canvas].initFrame;
            var can = clientApp.displayItems[canvas].can;
            var ctx = clientApp.displayItems[canvas].ctx;
            var canW = clientApp.displayItems[canvas].canW;
            var canH = clientApp.displayItems[canvas].canH;

            // == start image load self-invoking iterative function
            loadNextImage(0, 0);

            // ======= loadNextImage =======
            function loadNextImage(Xindex, Yindex) {
                console.log("loadNextImage");

                // == make image elements; assure image loading via timeout
                if (Xindex < endFrameX) {
                    if (matrix) {
                        if (Yindex < endFrameY) {
                            var canvasImage = new Image();
                            canvasImage.id = imageName + "_" + Xindex + Yindex;
                            canvasImage.src = "images/" + folder + "/" + imageName + "_" + Xindex + Yindex + ".png";
                            canvasImage.onload = function() {
                                setTimeout(function(){
                                    YfilesArray.push(canvasImage);
                                    Yindex++;
                                    loadNextImage(Xindex, Yindex);
                                }, 10);
                            }
                        } else {
                            if (canvas == "studio") {
                                clientApp.studioImages.push(YfilesArray);
                            } else {
                                clientApp.monitorImages.push(YfilesArray);
                            }
                            Xindex++;
                            Yindex = 0;
                            YfilesArray = [];
                            loadNextImage(Xindex, Yindex);
                        }
                    } else {
                        var canvasImage = new Image();
                        canvasImage.id = imageName + "_" + Xindex;
                        canvasImage.src = "images/" + imageName + "_" + Xindex + ".png";
                        canvasImage.onload = function() {
                            setTimeout(function(){
                                if (canvas == "studio") {
                                    clientApp.studioImages.push(canvasImage);
                                } else {
                                    clientApp.monitorImages.push(canvasImage);
                                }
                                Xindex++;
                                loadNextImage(Xindex, Yindex);
                            }, 10);
                        }
                    }

                // == display init image (usually first in frameset)
                } else {

                    if (matrix) {
                        if (canvas == "studio") {
                            var initImage = clientApp.studioImages[initFrame][initFrame];
                        } else {
                            if (page.monitor.image) {
                                var initImage = clientApp.monitorImages[initFrame][initFrame];
                            }
                        }
                    } else {
                        if (canvas == "studio") {
                            var initImage = clientApp.studioImages[initFrame];
                        } else {
                            var initImage = clientApp.monitorImages[initFrame];
                        }
                    }
                    ctx.clearRect(0, 0, 720, 405);

                    // == context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
                    // console.log("clientApp.studioImages:", clientApp.studioImages);
                    if (initImage) {
                        ctx.drawImage(initImage, 0, 0, 720, 405, 0, 0, 300, 150);
                        ctx.save();
                    }
                }
            }
        }
    },

    // ======= makeLessonItems =======
    makeLessonItems: function() {
        console.log("makeLessonItems");

        var page = this.activePage;
        var setups = page.SetupItem;
        var actors = page.ActorItems;
        var groups = page.GroupItems;
        var guides = page.guides;
        var targets = page.pageTargets;
        var gridders = page.GridItems;
        // console.log("setups:", setups);
        // console.log("actors:", actors);
        // console.log("groups:", groups);
        // console.log("guides:", guides);
        // console.log("targets:", targets);
        // console.log("gridders:", gridders);

        var lessonItemsArray = [setups, groups, gridders, actors, targets];

        for (var i = 0; i < lessonItemsArray.length; i++) {
            if ((lessonItemsArray[i]) && (lessonItemsArray[i].length > 0)) {
                makeItemEls(lessonItemsArray[i]);
                if (guides.length > 0) {
                    this.makeItemGuides(lessonItemsArray[i]);
                }
            }
        }

        // ======= makeItemEls =======
        function makeItemEls(items) {
            console.log("makeItemEls");
            console.log("items:", items);
            var item, itemType, urlString, newDiv, target, gridStartL;
            clientApp.displayItems.gridLeft = clientApp.displayItems.studio.canL + 10;
            clientApp.displayItems.gridTop = clientApp.displayItems.studio.canT + 10;
            $('#grid').css('left', clientApp.displayItems.gridLeft + 'px');
            $('#grid').css('top', clientApp.displayItems.gridTop + 'px');

            for (var i = 0; i < items.length; i++) {
                item = items[i];
                itemType = item.itemType;
                console.log("itemType:", itemType);

                switch(itemType) {
                    case "target":
                        newDiv = makeItemHtml(item);
                        item.itemEl = newDiv;
                        locatePageTarget(item, newDiv);
                        break;
                    case "gridItem":
                        newDiv = makeItemHtml(item);
                        item.itemEl = newDiv;
                        locateGridItem(item, newDiv, i);
                        break;
                    case "actor":
                        newDiv = makeItemHtml(item);
                        item.itemEl = newDiv;
                        locateNewActor(item, newDiv);
                        break;
                    case "setup":
                        newDiv = makeItemHtml(item);
                        item.itemEl = newDiv;
                        locateNewSetup(item, newDiv);
                        if (item.itemTargets.length > 0) {
                            for (var j = 0; j < item.itemTargets.length; j++) {
                                target = item.itemTargets[j];
                                newDiv = makeTargetHtml(target);
                                target.itemEl = newDiv;
                                console.log("item:", item);
                                console.log("target:", target);
                                locateSetupTarget(target, item, newDiv);
                            }
                        }
                        break;
                }
            }

            // ======= locateGridItem =======
            function locateGridItem(item, newDiv, itemIndex) {
                console.log("locateGridItem");

                // == check vertical space for new item; move to right if not
                if (itemIndex == 0) {
                    var gridL = clientApp.displayItems.gridLeft;
                    var gridT = clientApp.displayItems.gridTop;
                } else {
                    var gridL = clientApp.displayItems.gridLeft;
                    var gridT = clientApp.displayItems.gridTop + item.initLTWH.H + 10;
                    clientApp.displayItems.gridTop = gridT;
                    if ((gridT + item.initLTWH.H + 10) > (clientApp.displayItems.studio.canT + clientApp.displayItems.studio.canH)) {
                        var gridL = clientApp.displayItems.gridLeft + item.initLTWH.W + 10;
                        var gridT = clientApp.displayItems.studio.canT + 10;
                        clientApp.displayItems.gridLeft = gridL;
                        clientApp.displayItems.gridTop = gridT;
                    }
                }

                // == locate item on new grid values
                newDiv.style.left = gridL + 'px';
                newDiv.style.top = gridT + 'px';
                newDiv.style.width = item.initLTWH.W + 'px';
                newDiv.style.height = item.initLTWH.H + 'px';
                newDiv.style.zIndex = 4;
                item.initLTWH.L = gridL;
                item.initLTWH.T = gridT;

                $('#grid').append(newDiv);
            }

            // ======= locatePageTarget =======
            function locatePageTarget(target, newDiv) {
                console.log("locatePageTarget");

                // == pageTarget initLTWH is absolute (page)
                newDiv.style.left = displayItems.studio.canL + target.initLTWH.L + 'px';
                newDiv.style.top = displayItems.studio.canT + target.initLTWH.T + 'px';
                newDiv.style.width = target.initLTWH.W + 'px';
                newDiv.style.height = target.initLTWH.H + 'px';
                newDiv.style.zIndex = 3;
                $('body').append(newDiv);
            }

            // ======= locateSetupTarget =======
            function locateSetupTarget(target, item, newDiv) {
                console.log("locateSetupTarget");

                // == setupTarget initLTWH is offset from setup item
                newDiv.style.left = item.initLTWH.L + displayItems.studio.canL + target.initLTWH.L + 'px';
                newDiv.style.top = item.initLTWH.T + displayItems.studio.canT + target.initLTWH.T + 'px';
                newDiv.style.width = target.initLTWH.W + 'px';
                newDiv.style.height = target.initLTWH.H + 'px';
                newDiv.style.zIndex = 3;
                $('body').append(newDiv);
            }

            // ======= locateNewActor =======
            function locateNewActor(item, newDiv) {
                console.log("locateNewActor");
                newDiv.style.left = item.initLTWH.L + displayItems.studio.canL + 'px';
                newDiv.style.top = item.initLTWH.T + displayItems.studio.canT + 'px';
                newDiv.style.width = item.initLTWH.W + 'px';
                newDiv.style.height = item.initLTWH.H + 'px';
                newDiv.style.zIndex = 4;
                $('#actors').append(newDiv);
            }

            // ======= locateNewSetup =======
            function locateNewSetup(item, newDiv) {
                console.log("locateNewSetup");
                newDiv.style.left = item.initLTWH.L + displayItems.studio.canL + 'px';
                newDiv.style.top = item.initLTWH.T + displayItems.studio.canT + 'px';
                newDiv.style.width = item.initLTWH.W + 'px';
                newDiv.style.height = item.initLTWH.H + 'px';
                newDiv.style.zIndex = 2;
                $('#setup').append(newDiv);
            }

            // ======= makeTargetHtml =======
            function makeTargetHtml(item) {
                console.log("makeTargetHtml");
                newDiv = document.createElement('div');
                newDiv.id = item.itemId;
                newDiv.classList.add(item.itemType);
                // newDiv.style.position = "relative";
                newDiv.style.position = "absolute";
                return newDiv;
            }

            // ======= makeItemHtml =======
            function makeItemHtml(item) {
                console.log("makeItemHtml");
                newDiv = document.createElement('div');
                newDiv.id = item.itemId;
                newDiv.classList.add(item.itemType);
                newDiv.style.position = "absolute";
                if (item.itemImage) {
                    urlString = "url('images/" + item.itemImage + ".png') 0 0";
                    newDiv.style.background = urlString;
                    newDiv.style.backgroundSize =  item.initLTWH.W + 'px ' + item.initLTWH.H + 'px';
                }
                return newDiv;
            }
        }
    },

    // ======= makeItemGuides =======
    makeItemGuides: function(items) {
        console.log("makeItemGuides");

        var item, itemId;
        var guides = this.activePage.guides;

        for (var i = 0; i < items.length; i++) {
            item = items[i];
            itemId = items[i].itemId;

            for (var i = 0; i < guides.length; i++) {
                var guideId = guides[i].itemId;
                if (guideId == itemId) {
                    makeItemGuide(item);
                }
            }

            // ======= makeItemGuide =======
            function makeItemGuide(item) {
                console.log("makeItemGuide");

                // == make svg guide elements
                var guidesEl = document.getElementById("guides");
                guidesEl.style.position = "absolute";
                guidesEl.style.left = (item.bounds.L + displayItems.studio.canL + 5) + 'px';
                guidesEl.style.top = (item.bounds.T + displayItems.studio.canT + 25) + 'px';
                guidesEl.style.width = item.bounds.W + 'px';
                guidesEl.style.height = item.bounds.H + 'px';
                guidesEl.style.zIndex = 1;

                var data = [[0, item.bounds.H], [item.bounds.W, 0]];
                var line = d3.line(data);
                var lineGenerator = d3.line();
                var pathString = lineGenerator(data);

                // == make svg line element
                var svgEl = d3.select(guidesEl)
                    .append("svg")
                        .attr("width", item.bounds.W)
                        .attr("height", item.bounds.H);
                svgEl.append("path");
                d3.select('path')
                	.attr('d', pathString)
                    .style("stroke", "red")
                    .style("stroke-weight", "2")
                    .style("fill", "none");
            }
        }
    },

    // ======= makeLessonMenu =======
    makeLessonMenu: function(pendingLesson) {
        console.log("\n******* makeLessonMenu");

        var index = -1;
        var menuHtml = "<ul id='lessonMenu'>";
        $.each(this.lessons, function(key, lesson) {
            index++;

            // == hide lessons not yet built (development)
            if (index > pendingLesson) {
                var menuState = "lessonItem inactive";
            } else {
                var menuState = "lessonItem active";
            }
            console.log("menuState:", menuState);

            menuHtml += "<li><div id='" + key + "' class='" + menuState + "'>";
            menuHtml += "<span class='menu_title_active'>" + lesson.lessonIndex + " - " + lesson.lessonTitle + "</span>"
            menuHtml += "<span class='menu_text_active'>" + lesson.lessonSubtitle + "</span>"
            menuHtml += "</div>";
        });
        menuHtml += "</ul>";
        $('#lessonMenuDisplay').html(menuHtml);
    },

    // ======= makeGearMenu =======
    makeGearMenu: function() {
        console.log("makeGearMenu");
        console.log("this.gearItems[0]:", this.gearItems[0]);

        var index = -1;
        var menuHtml = "<ul id='gearMenu'>";
        $.each(this.gearItems, function(key, item) {
            index++;
            menuHtml += "<li><div id='" + key + "_" + index + "' class='gearItem'>";
            menuHtml += "<div class='gearImage light' style='background-image:url(images/" + item.image + ");background-color:#ccc;background-repeat:no-repeat;background-size:100%;'></div>";
            menuHtml += "<div><span class='gear_label_active'>" + item.itemName + "</span>";
            menuHtml += "<span class='gear_text_active'>" + item.itemType + "</span></div>";
            menuHtml += "</li>";
        });
        menuHtml += "</ul>";
        $('#storeroomMenuDisplay').html(menuHtml);
    },

    // ======= updateLessonText =======
    updateLessonText: function(errorText) {
        console.log("updateLessonText");

        // == no page found... display msg
        if (errorText) {
            var lessonText = errorText;
        } else {
            var lessonText = clientApp.activePage.pageText;
        }

        // == remove previous lesson text
        if ($('#lessonText').children('p').html()) {
            $('#lessonText').animate({
                height: 0,
                opacity: 0
            }, 500, function() {
                console.log("collapsed");

                // == replace prev lesson text with new text
                $('#lessonText').children('p').html(lessonText);
                $('#lessonText').animate({
                    height: "200px",
                    opacity: 1.0
                }, 500, function() {
                    console.log("expanded");
                });
            });
        } else {

            // == replace lessons list with lesson text
            $('#lessonText').children('p').html(lessonText);
            $('#lessonText').removeClass('hide');
            $('#lessonText').css('display, block');
            $('#lessonText').animate({
                height: "200px",
                opacity: 1.0
            }, 500, function() {
                console.log("expanded");
            });
        }
    },

    // ======= makeLessonText =======
    makeLessonText: function(lessonEl) {
        console.log("makeLessonText");

        var lessonSelectedId = $(lessonEl).attr('id') + "_selected";
        var titleText = clientApp.activeLesson.lessonIndex + " - " + clientApp.activeLesson.lessonTitle;
        var subTitleText = clientApp.activeLesson.lessonSubtitle;

        $('#selectedLesson').children('span').eq(0).text(titleText);
        $('#selectedLesson').children('span').eq(1).text(subTitleText);

        $("#lessonTextDisplay").fadeIn("fast", function() {
            // console.log("MENU opacity 0");
        });
        $("#lessonMenuDisplay").fadeOut("fast", function() {
            // console.log("MENU opacity 0");
        });
        $("#storeroomMenuDisplay").fadeOut("fast", function() {
            // console.log("STOREROOM opacity 0");
        });

        // == update lesson text and activate prev/next
        this.updateLessonText();
    },

    // ======= selectSectionItem =======
    selectSectionItem: function(item) {
        console.log("selectSectionItem");
        var itemId = $(item).attr('id');

        switch (itemId) {
            case "lessons":
                deselectItem("shop");
                selectItem(itemId);
                $( "#storeroomMenuDisplay" ).fadeOut( "fast", function() {
                    // console.log("STOREROOM opacity 0");
                });
                $( "#lessonTextDisplay" ).fadeOut( "fast", function() {
                    // console.log("LESSON opacity 0");
                });
                $( "#lessonMenuDisplay" ).fadeIn( "fast", function() {
                    // console.log("MENU opacity 1.0");
                });
                break;
            case "shop":
                deselectItem("lessons");
                selectItem(itemId);
                $( "#lessonMenuDisplay" ).fadeOut( "fast", function() {
                    // console.log("MENU opacity 0");
                });
                $( "#lessonTextDisplay" ).fadeOut( "fast", function() {
                    // console.log("LESSON opacity 0");
                });
                $( "#storeroomMenuDisplay" ).fadeIn( "fast", function() {
                    // console.log("STOREROOM opacity 1.0");
                });
                break;
        }

        // == modify tab css between selected and active states
        function selectItem(itemId) {
            // console.log("selectItem");
            var itemParentId = $('#' + itemId).parent('div').attr('id');
            $('#' + itemParentId).removeClass('tab_box_active');
            $('#' + itemParentId).addClass('tab_box_selected');
            $('#' + itemId).removeClass('label_text_active');
            $('#' + itemId).addClass('label_text_selected');
        }

        function deselectItem(itemId) {
            // console.log("deselectItem");
            var itemParentId = $('#' + itemId).parent('div').attr('id');
            $('#' + itemParentId).removeClass('tab_box_selected');
            $('#' + itemParentId).addClass('tab_box_active');
            $('#' + itemId).removeClass('label_text_selected');
            $('#' + itemId).addClass('label_text_active');
        }
    },

    // ======= ======= ======= ACTIVATORS ======= ======= =======
    // ======= ======= ======= ACTIVATORS ======= ======= =======
    // ======= ======= ======= ACTIVATORS ======= ======= =======

    // ======= activatePrevNext =======
    activatePrevNext: function() {
        console.log("activatePrevNext");

        $('#navPanel').children('div').on('click', function(e) {
            console.log("\n -- click PREV/NEXT buttons");
            var lessonPage = clientApp.getNextPage(e.currentTarget.id);
            if ((lessonPage[0] != null) && (lessonPage[1] != null))   {
                var nextLessonName = "lesson_" + lessonPage[0];
                var nextPageName = "page_" + lessonPage[0] + "_" + lessonPage[1];
                if (clientApp.lessons[nextLessonName] && clientApp.pages[nextPageName]) {
                    clientApp.activeLesson = clientApp.lessons[nextLessonName];
                    clientApp.activePage = clientApp.pages[nextPageName];
                    if (clientApp.activeActor) {
                        clientApp.activeActor.dropLTWH = { L:0, T:0, W:0, H:0 };
                        clientApp.activeActor = null;
                    }
                    clientApp.makeLessonPage(e.currentTarget);
                } else {
                    clientApp.updateLessonText("Sorry... requested page is missing.  Click the <span class='hilight'>Lessons</span> tab to try again.");
                }
            } else {
                clientApp.updateLessonText("Sorry... requested page is missing.  Click the <span class='hilight'>Lessons</span> tab to try again.");
            }
        });
        $('#navPanel').children('div').on('mouseenter', function(e) {
            // console.log("-- mouseenter");
            clientApp.toggleHoverText(e.currentTarget, null);
        });
        $('#navPanel').children('div').on('mouseleave', function(e) {
            // console.log("-- mouseleave");
            clientApp.toggleHoverText(null, null);
        });
    },

    // ======= activateLessonItems =======
    activateLessonItems: function() {
        console.log("activateLessonItems");

        var page = this.activePage;
        var setups = page.SetupItem;
        var groups = page.GroupItems;
        var gridders = page.GridItems;
        var actors = page.ActorItems;
        var targets = page.pageTargets;
        var guides = page.guides;

        var setupItem, setupTargets, setupControls;
        var lessonItemsArray = [groups, gridders, actors, targets];
        console.log("gridders: ", gridders);

        // == activate page level items
        for (var i = 0; i < lessonItemsArray.length; i++) {
            for (var i = 0; i < lessonItemsArray.length; i++) {
                if ((lessonItemsArray[i]) && (lessonItemsArray[i].length > 0)) {
                    activatePageItems(lessonItemsArray[i]);
                }
            }
        }

        // == activate setup level items
        for (var i = 0; i < setups.length; i++) {
            setupItem = setups[i];
            if (setupItem.itemTargets.length > 0) {
                activatePageItems(setupItem.itemTargets);
            }
            if (setupItem.itemControls.length > 0) {
                activatePageItems(setupItem.itemControls);
            }
        }

        // == match grid items (gridders) to frame indexes
        for (var i = 0; i < gridders.length; i++) {
            gridders[i].indexedFrame = page.studio.indexedFrames[i];
        }

        // ======= activatePageItems =======
        function activatePageItems(items) {
            console.log("activatePageItems");

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                // ======= MOUSEDOWN =======
                $('#' + item.itemId).on('mousedown', function(e) {
                    console.log("\nmousedown");
                    var actor = clientApp.items[$(e.currentTarget).attr('id')];
                    var actorEl = $(e.currentTarget);
                    e.preventDefault();
                    clientApp.activeActor = actor;
                    actor.initMove(e, actorEl, actor);
                });

                // ======= MOUSEENTER/LEAVE =======
                $('#' + item.itemId).on('mouseenter', function(e) {
                    console.log("\nmouseenter");
                    console.log("e.currentTarget:", e.currentTarget);
                    clientApp.toggleHoverText(e.currentTarget, item.itemType);
                });
                $('#' + item.itemId).on('mouseleave', function(e) {
                    // console.log("\nmouseleave");
                    clientApp.toggleHoverText(null, null);
                });
            }
        }
    },

    // ======= activateMenuGrid =======
    activateMenuGrid: function() {
        console.log("activateMenuGrid");
    },

    // ======= activateDisplayItems =======
    activateDisplayItems: function() {
        console.log("activateDisplayItems");

        // == studio, shop, lesson select (CLICK)
        $(".label_text_selected, .label_text_active").on('click', function(e) {
            // console.log("\n-- click");
            e.stopPropagation();
            clientApp.selectSectionItem(e.currentTarget);
        });

        // == studio, shop, lesson hover text (ENTER/LEAVE)
        $(".label_text_selected, .label_text_active").on('mouseenter', function(e) {
            // console.log("\n-- mouseenter");
            clientApp.toggleHoverText(e.currentTarget, "display");
            e.stopPropagation();
        });
        $(".label_text_selected, .label_text_active").on('mouseleave', function(e) {
            // console.log("\n-- mouseleave");
            clientApp.toggleHoverText(null, null);
            e.stopPropagation();
        });

    },

    // ======= activateMenuItems =======
    activateMenuItems: function(menu) {
        console.log("activateMenuItems");

        switch(menu) {
            case "lessonMenu":

            // == select lesson (CLICK)
            $('#lessonMenu').children('li').children('div').on('click', function(e) {
                console.log("\n-- click LESSON menu");
                clientApp.activeLesson = clientApp.lessons[e.currentTarget.id];
                clientApp.activePage = clientApp.pages["page_" + clientApp.lessons[e.currentTarget.id].lessonIndex + "_" + "0"];
                clientApp.makeLessonPage(e.currentTarget);
                e.stopPropagation();
            });

            // == lesson menu hover text
            $('#lessonMenu').children('li').children('div').on('mouseenter', function(e) {
                // console.log("\n-- mouseenter");
                clientApp.activeLesson = e.currentTarget;
                clientApp.toggleHoverText(e.currentTarget, "lesson");
                e.stopPropagation();
            });
            $('#lessonMenu').children('li').children('div').on('mouseleave', function(e) {
                // console.log("\n-- mouseleave");
                clientApp.toggleHoverText(null, null);
                e.stopPropagation();
            });
            break;
        }
    },

    // ======= getNextPage =======
    getNextPage: function(prevOrNext) {
        console.log("getNextPage");
        console.log("prevOrNext:", prevOrNext);

        var lessonIndex = parseInt(clientApp.activeLesson.lessonIndex);
        var lessonCount = _.size(clientApp.lessons);
        var pageIndex = parseInt(clientApp.activePage.pageKey.split("_")[1]);
        var pageCount = clientApp.activeLesson.pageKeys.length;

        if (pageCount > 0) {

            // == loop through pages of active lesson
            for (var i = 0; i < pageCount; i++) {
                var checkLessonIndex = parseInt(clientApp.activeLesson.pageKeys[i].split("_")[0]);
                var checkPageIndex = parseInt(clientApp.activeLesson.pageKeys[i].split("_")[1]);

                // == current page found
                if ((lessonIndex == checkLessonIndex) && (pageIndex == checkPageIndex)) {
                    if (prevOrNext == "nextBtn") {
                        var nextPageIndex = parseInt(pageIndex + 1);
                        if (nextPageIndex >= pageCount) {
                            var nextLessonIndex = parseInt(lessonIndex + 1);
                            var nextPageIndex = 0;
                            if (nextLessonIndex == lessonCount) {
                                var nextLessonIndex = 0;
                            }
                        } else {
                            var nextLessonIndex = lessonIndex;
                        }
                    } else if (prevOrNext == "prevBtn") {
                        var nextPageIndex = parseInt(pageIndex - 1);
                        console.log("nextPageIndex:", nextPageIndex);
                        if (nextPageIndex < 0) {
                            var nextLessonIndex = parseInt(lessonIndex - 1);
                            console.log("nextLessonIndex:", nextLessonIndex);
                            if (nextLessonIndex >= 0) {
                                var lessonName = "lesson_" + nextLessonIndex;
                                console.log("lessonName:", lessonName);
                                var nextPageIndex = parseInt(clientApp.lessons[lessonName].pageKeys.length - 1);
                            } else {
                                var nextLessonIndex = 0;
                            }
                        } else {
                            var nextLessonIndex = lessonIndex;
                        }
                    }
                    return [nextLessonIndex, nextPageIndex]
                }
            }
        }
    },

    // ======= ======= ======= UTILITIES ======= ======= =======
    // ======= ======= ======= UTILITIES ======= ======= =======
    // ======= ======= ======= UTILITIES ======= ======= =======

    // ======= updateCanvasFrame =======
    updateCanvasFrame: function(frameIndexX, frameIndexY) {
        console.log("updateCanvasFrame");
        // console.log("frameIndexX/Y:", frameIndexX, frameIndexY);

        // == get frame from nested array matrix (left/right, up/down) based on XY dragger indexes
        if (clientApp.activePage.studio.matrix) {
            var studioImage = clientApp.studioImages[frameIndexX][frameIndexY];
        } else {
            var studioImage = clientApp.studioImages[frameIndexX];
        }

        // == all animations display on studio canvas
        var studioCan = this.displayItems["studio"].can;
        var studioCtx = this.displayItems["studio"].ctx;
        studioCtx.clearRect(0, 0, 720, 405);
        studioCtx.drawImage(studioImage, 0, 0, 720, 405, 0, 0, 300, 150);

        // == only some animations display on monitor canvas
        if (clientApp.activePage.studio.matrix) {
            var monitorImage = clientApp.monitorImages[frameIndexX, frameIndexY];
        } else {
            var monitorImage = clientApp.monitorImages[frameIndexX];
            var monitorCan = this.displayItems["monitor"].can;
            var monitorCtx = this.displayItems["monitor"].ctx;
            monitorCtx.clearRect(0, 0, 384, 180);
            monitorCtx.drawImage(monitorImage, 0, 0, 720, 405, 0, 0, 300, 150);
        }
    },

    // ======= clearPageElements =======
    clearPageElements: function() {
        console.log("clearPageElements");

        // <div id="grid"></div>
    	// <div id="group"></div>
    	// <div id="actors"></div>
        // <div id="guides"></div>
    	// <div id="setup"></div>
    	// <div id="targets"></div>
    	// <div id="controls"></div>
    	// <div id="trackpad"></div>
    	// <div id="tooltips"></div>
    	// <div id="titleText"></div>
    	// <div id="occupier"></div>

        // == removeActorsGuides
        $('#grid').empty();
        $('#actors').empty();
        $('#guides').empty();
        $('#setup').empty();
        $('#targets').empty();
        $('.gridItem').remove();
        $('.target').remove();
        $('.setupTarget').remove();
    },

    // ======= clearLessonCanvases =======
    clearLessonCanvases: function() {
        console.log("clearLessonCanvases");

        var canvases = ["studio", "monitor"];
        for (var i = 0; i < canvases.length; i++) {
            this.displayItems[canvases[i]].ctx.clearRect(0, 0, 720, 405);
        }
    },

    // ======= toggleHoverText =======
    toggleHoverText: function(item, itemType) {
        // console.log("toggleHoverText");
        // console.log("itemType:", itemType);
        if ($(item).attr('id')) {
            if (itemType == "display") {
                var itemText = clientApp.displayItems[$(item).attr('id')].itemText;
            } else if (itemType == "lesson") {
                var itemText = clientApp.lessons[$(item).attr('id')].itemText;
            } else if ((itemType == "actor") || (itemType == "gridItem")) {
                var itemText = clientApp.items[$(item).attr('id')].itemText;
            } else if (itemType == "setupTarget") {
                var target = clientApp.targets[$(item).attr('id')]
                var itemText = target.itemText + target.itemName;
            } else {
                var itemText = $(item).attr('id');
            }
            $('#hover_text').text(itemText);
        } else {
            $('#hover_text').text('');
        }
    }

};

// == error-box functions
$('#close-error, #close-message').on('click', function(e) {
    e.stopPropagation();
    $('#error-box, #message-box').css('display', 'none');
});


clientApp.initialize();
