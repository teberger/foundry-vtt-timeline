/* Set up imports */
import { Timeline } from "./entities/timeline.js"
import {register} from "./config/config.js"


/**
 * Setting up the main timeline, adding triggers, etc.
 */
Hooks.once('setup', () => {
  console.debug("Timeline | setting up")
  register();
  game.Timeline = new Timeline();
  // Find the timeline journal entry, if it exists
  // Set its location into Timeline object
  game.Timeline.journalEntry = null;
});

/**
 * Setting up the button so it is rendered and setting the click events for the button
 */
Hooks.on("renderJournalDirectory", (app, html, data) => {
  console.debug("Timeline | Adding button to journal sidebar");
  const button = $("<button class='timeline-button'><i class='fas fa-code-branch'></i>Open Timeline</button>");
  let footer = html.find(".directory-footer");
  if (footer.length === 0) {
    footer = $(`<footer class="directory-footer"></footer>`);
    html.append(footer);
  }
  footer.append(button);

  button.click(ev => {
    if (game.Timeline.journalEntry != null) {
      console.debug("Timeline | Rendering timeline entry")
    } else {
      console.debug("Timeline | Could not find timeline, creating initial version")
    }
  });
});
