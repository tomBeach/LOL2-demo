
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======

function initPages(items, targets) {
    console.log("initPages");

    // pageKey, pageText, SetupItems, GroupItems, GridItems, ActorItems, TargetItems, studioCanvas, monitorCanvas
    var pages = {};

    // ======= intro =======
    pages.page_0_0 = new Page (
        /* pageKey */ "0_0",
        /* pageText */ "The scenario begins like this: You've been hired as the grip for a big production, but the DP called in sick.  Now the job is yours and the crew is waiting.  Better know how to light up a set!  Keep reading.  If you don't know, you will soon!",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0 }
	);

    // ======= intensity =======
	pages.page_1_0 = new Page (
        /* pageKey */ "1_0",
        /* pageText */ "The first thing to know is <span class='hilight'>intensity</span>: how bright the light is.  There are many ways to control intensity.  Number 1: distance.  The closer your light is to the subject, the brighter it is.  <span class='hilight'>Drag the light icon</span> to see how brightness changes with distance.  What else happens as you move the light in and out?",
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
        /* pageText */ "Often, moving lights is not easy --  especially when its a 20k HMI lighting up a city block.  But if it's too bright you can drop a <span class='hilight'>scrim</span> into the <span class='hilight'>barn door frame</span> and cut it down a bit.  <span class='hilight'>Drag some scrims</span> towards the light and drop them into the barndoor frame.  Easy!",
        /* SetupItems */ [items.f650_0_2],
        /* GroupItems */ [],
        /* GridItems */ [items.scrim1_0, items.scrim2_0, items.scrim3_0],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:null, image:"st_int_power", startFrame:0, endFrame:4, initFrame:4, indexedFrames:[3, 2, 1] },
        /* monitor */ { folder:null, image:"mn_int_power", startFrame:0, endFrame:4, initFrame:4, indexedFrames:[3, 2, 1] }
	);
    pages.page_1_2 = new Page (
        /* pageKey */ "1_2",
        /* pageText */ "The power of lighting instruments is measured in watts -- from a tiny 150W to a monster 20,000W (or 20K).  Lights from a small lighting kit may range from 150 to 1,000 watts.  Try 'em.'",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [items.f150, items.f300, items.f650, items.f1000],
        /* ActorItems */ [],
        /* TargetItems */ [targets.stand],
        /* guides */ [],
        /* studio */ { folder:null, image:"st_int_power", startFrame:0, endFrame:4, initFrame:0, indexedFrames:[1, 2, 3, 4] },
        /* monitor */ { folder:null, image:"mn_int_power", startFrame:0, endFrame:4, initFrame:0, indexedFrames:[1, 2, 3, 4] }
	);

    // ======= quality =======
	pages.page_2_0 = new Page (
        /* pageKey */ "2_0",
        /* pageText */ "Light can be hard -- like direct sunlight -- or soft -- like a cloudy day.  Check out the difference between a 1K and a softbox light.  Hint: it's not only 'softness'.  What else changes with these lights?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [items.f1000, items.Softlight],
        /* ActorItems */ [],
        /* TargetItems */ [targets.stand],
        /* guides */ [],
        /* studio */ { folder:null, image:"st_qual", startFrame:0, endFrame:2, initFrame:0, indexedFrames:[1, 2] },
        /* monitor */ { folder:null, image:"mn_qual", startFrame:0, endFrame:2, initFrame:0, indexedFrames:[1, 2] }
	);
    pages.page_2_1 = new Page (
        /* pageKey */ "2_1",
        /* pageText */ "Movie lights almost always need some sort of diffusion material to make them more realistic.  Try these common diffusers.  They soften the light -- but also cut down on brightness.  That can mean swapping in a brighter light if the diffusion cuts the brightness too much.",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [items.opal, items.halfWhite, items.toughspun, items.toughWhite, items.rolux],
        /* ActorItems */ [],
        /* TargetItems */ [targets.stand],
        /* guides */ [],
        /* studio */ { folder:null, image:"st_qual_diff", startFrame:0, endFrame:6, initFrame:0, indexedFrames:[1, 2, 3, 4, 6] },
        /* monitor */ { folder:null, image:"mn_qual_diff", startFrame:0, endFrame:6, initFrame:0, indexedFrames:[1, 2, 3, 4, 6] }
	);
    pages.page_2_2 = new Page (
        /* pageKey */ "2_2",
        /* pageText */ "Diffuse light can be more 'natural' but it's also harder to control -- especially when a controller (like the floppy flag here) is close to the light.  Try moving the flag around with the <span class='hilight'>orange flag mover</span> to see how shadows work with <span class='hilight'>soft light</span>.",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_soft_near", image:"st_shadow_soft_near", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    pages.page_2_3 = new Page (
        /* pageKey */ "2_3",
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
    pages.page_2_4 = new Page (
        /* pageKey */ "2_4",
        /* pageText */ "Now try moving the flag with <span class='hilight'>hard light</span>.  Compare these hard shadows to the previous soft ones.  But it's not just shadow qualities that make a difference.  The distance of the flag to the light source also has an effect.  Check that out on the next page...",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_hard_near", image:"st_shadow_hard_near", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    pages.page_2_5 = new Page (
        /* pageKey */ "2_5",
        /* pageText */ "A hard light shadow gets even harder when the flag is farther from the light source -- but it's still too close to the subject.  How would you position a flag like this without blocking the subject or camera?  Stay tuned...",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.flagMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_shadow_hard_far", image:"st_shadow_hard_far", startFrame:0, endFrame:6, initFrame:0, matrix:"AB" },
        /* monitor */ { folder:null, image:null, startFrame:0, endFrame:6, initFrame:0, matrix:"AB" }
	);
    pages.page_3_0 = new Page (
        /* pageKey */ "3_0",
        /* pageText */ "Probably the toughest challenge in lighting is putting the light where it needs to be -- often where there's a plant or a beam or a wall in the way.  There are many ways to meet this challenge, but it starts with knowing what result you are trying to achieve.  A traditional place to start is 3-point lighting: Key, Back and Fill lights.  Try moving the <span class='hilight'>Key light</span> around to create different moods.  What do you notice about light hitting the background?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.keyMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_KBangles_K", image:"st_KBangles_K", startFrame:0, endFrame:6, initFrame:0, matrix:"AB", dir:"reverse" },
        /* monitor */ { folder:"mn_KBangles_K", image:"mn_KBangles_K", startFrame:0, endFrame:6, initFrame:0, matrix:"AB", dir:"reverse" }
	);
    pages.page_3_1 = new Page (
        /* pageKey */ "3_1",
        /* pageText */ "<span class='hilight'>Backlight</span> is something everyone notices -- especially when it's too much.  Try different positions for the backlight.  How does this affect the mood?.  Why are <span class='hilight'>framelines</span> (the line between in and out of frame) so important with backlights?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.keyMover],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { folder:"st_KBangles_B", image:"st_KBangles_B", startFrame:0, endFrame:6, initFrame:0, matrix:"AB", dir:"forward" },
        /* monitor */ { folder:"mn_KBangles_B", image:"mn_KBangles_B", startFrame:0, endFrame:6, initFrame:0, matrix:"AB", dir:"reverse" }
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
