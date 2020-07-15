/* Set up imports */
import TimelineManagerClass from "./entities/TimelineManager.js"
import { TimelineEntry } from "./entities/TimelineEntry.js"
import { register } from "./config/config.js"
import TimelineManager from "./entities/TimelineManager.js"

/**
 * Preloads templates for partials
 */
let preloadTemplates = function() {
    let templates = [
        "templates/partials/timeline.html",
        "templates/partials/timeline-entry.html"
    ];

    templates = templates.map(t => `modules/foundry-timeline/${t}`);
    loadTemplates(templates);
}

Hooks.once('init', () => {
    console.debug("Timeline | initializing...")
    register();
    preloadTemplates()
})

/**
 * Setting up the main timeline, adding triggers, etc.
 */
Hooks.once('setup', () => {
    console.debug("Timeline | setting up")
        //window.TimelineManager = new TimelineManagerClass();
    game.timelineManager = new TimelineManager();
});

/**
 * Setting up the button so it is rendered and setting the click events for the button
 */
Hooks.on("renderJournalDirectory", (app, html, data) => {
    console.debug("Timeline | Adding button to journal sidebar");
    const button = $("<button class='timeline-button'><i class='fas fa-code-branch'></i>Manage Timelines</button>");
    let footer = html.find(".directory-footer");
    if (footer.length === 0) {
        footer = $(`<footer class="directory-footer"></footer>`);
        html.append(footer);
    }
    footer.append(button);

    button.click(ev => {
        console.debug("Timeline | Bringing up timeline management window")
        game.timelineManager.render(true);
    });
});