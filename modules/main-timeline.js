/* Set up imports */
import { register } from "./config/config.js"
import ActiveTimelinesApp from "./apps/ActiveTimelinesApp.js";
import { timelineFolderId } from "./utils.js"
import { preloadTemplates, renderTimelineBodyTmpl } from "./hbs-templates.js"


Hooks.once('setup', () => {
    console.debug("Timeline | seting up")
})

Hooks.once('init', () => {
    console.debug("Timeline | initializing...")
    register();
    preloadTemplates();
    Handlebars.registerHelper("renderTimelineBody", renderTimelineBodyTmpl);
})

/**
 * Setting up the main timeline, adding triggers, etc.
 */
Hooks.once('ready', () => {
    console.debug("Timeline | ready...")

    if (timelineFolderId()) {
        console.debug("Timeline | timeline folder found")
    }
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
        new ActiveTimelinesApp().render(true);
    });

    // removing the folder from the display so accidents can't happen
    folderId = timelineFolderId()
    let folder = html.find(`.folder[data-folder-id="${folderId}"]`)
    folder.remove();
    console.debug("Timeline | game folder id: " + folderId);
});