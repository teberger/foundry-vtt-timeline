/* Set up imports */
import { register } from "./config/config.js"
import TimelineManager from "./apps/TimelineManager.js"


/**
 * Preloads templates for partials
 */
let preloadTemplates = function() {
    let templates = [
        "templates/partials/timeline.html",
        "templates/partials/management.html",
        "templates/partials/timelineEntry.html"
    ];

    templates = templates.map(t => `modules/foundry-timeline/${t}`);
    loadTemplates(templates);
}

Hooks.once('setup', () => {
    console.debug("Timeline | seting up")
    game.timelineManager = {}
})
Hooks.once('init', () => {
    console.debug("Timeline | initializing...")
    register();
    preloadTemplates();

    Handlebars.registerHelper("renderTimelineBody", function(entries) {
        let template_function = Handlebars.partials['modules/foundry-timeline/templates/partials/timelineEntry.html']
        return entries.map(function(context, index) {
            let invert = index % 2 == 0 ? "timeline-entry-inverted" : "";
            context['invert'] = invert
            console.debug("Timeline | Rendering content")
            return template_function(context)
        }).join('\n');
    });
})

/**
 * Setting up the main timeline, adding triggers, etc.
 */
Hooks.once('ready', () => {
    console.debug("Timeline | ready...")
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

    // removing the folder from the display so accidents can't happen
    let folderId = game.timelineManager.timelineFolderId;
    console.debug("Timeline | game folder id: " + folderId);
    console.debug("Timeline | game folder id: " + folderId);
    folder.remove();
});