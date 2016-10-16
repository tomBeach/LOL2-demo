
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======

function initPages(items, targets) {
    console.log("initPages");

    // pageKey, pageText, SetupItems, GroupItems, GridItems, ActorItems, TargetItems, studioCanvas, monitorCanvas
    var pages = {};

    // ======= demo items =======
    pages.page_0_0 = new Page (
        /* pageKey */ "0_0",
        /* pageText */ "You were hired as the grip for a big production but the DP called in.  Now the job is yours and the crew is waiting.  Better know how to light up a set!  Keep reading.  If you don't know, you will soon!",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0 }
	);
	pages.page_1_0 = new Page (
        /* pageKey */ "1_0",
        /* pageText */ "The first thing to know is intensity: how bright the light is.  There are many ways to control intensity.  Number 1: distance.  The closer your light is to the subject, the brighter it is.  Drag the light icon to see how brightness changes with distance.  What else happens as you move the light in and out?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.distance_0_1],
        /* TargetItems */ [],
        /* guides */ [{ itemId:"distance_0_1", L:260, T:20, W:300, H:100 }],
        /* studio */ { folder:null, image:"st_int_distance", startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { folder:null, image:"mn_int_distance", startFrame:0, endFrame:6, initFrame:0 }
	);
    pages.page_1_1 = new Page (
        /* pageKey */ "1_1",
        /* pageText */ "Often, moving lights is not easy --  especially when its a 20k HMI lighting up a city block.  But if it's too bright you can drop a scrim into the barn door frame and cut it down a bit.  Drag some scrims towards the light and drop them into the barndoor frame.  Easy!",
        /* SetupItems */ [items.f650_0_2],
        /* GroupItems */ [],
        /* GridItems */ [items.scrim1_0, items.scrim2_0, items.scrim3_0],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:null, image:"st_int_power", startFrame:0, endFrame:4, initFrame:4, indexedFrames:[3, 2, 1] },
        /* monitor */ { folder:null, image:"mn_int_power", startFrame:0, endFrame:4, initFrame:4, indexedFrames:[3, 2, 1] }
	);
	pages.page_2_0 = new Page (
        /* pageKey */ "2_0",
        /* pageText */ "Light can be hard -- like direct sunlight -- or soft -- like a cloudy day.  Try moving the flag around to see how shadows work with soft light.",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_soft_near", image:"st_shadow_soft_near", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    pages.page_2_1 = new Page (
        /* pageKey */ "2_1",
        /* pageText */ "Now try moving the flag with hard light.  Compare these hard shadows to the previous soft ones.  But it's not just shadow qualities that make a difference.  The distance of the flag to the light source also has an effect.  Check that out on the next page...",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_hard_near", image:"st_shadow_hard_near", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    pages.page_2_2 = new Page (
        /* pageKey */ "2_2",
        /* pageText */ "Softlight shadows can be placed more accurately when the flag is farther from the light.  But now the flag is probably in the shot!  Check out similar positioning with hard light...",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_soft_far", image:"st_shadow_soft_far", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    pages.page_2_3 = new Page (
        /* pageKey */ "2_3",
        /* pageText */ "A hard light shadow gets even harder when the flag is farther from the light source -- but it's still too close to the subject.  How would you position a flag like this without blocking the subjecy or camera?  Stay tuned...",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_hard_far", image:"st_shadow_hard_far", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    return pages;
}

function Page (pageKey, pageText, SetupItems, GroupItems, GridItems, ActorItems, TargetItems, guides, studio, monitor) {
    // console.log(' Page');
    this.pageKey = pageKey;
    this.pageText = pageText;
    this.SetupItems = SetupItems;
    this.GroupItems = GroupItems;
    this.GridItems = GridItems;
    this.ActorItems = ActorItems;
    this.TargetItems = TargetItems;
    this.guides = guides;
    this.studio = studio;
    this.monitor = monitor;
}
