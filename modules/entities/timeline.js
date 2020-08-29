import TimelineEntry from "./TimelineEntry.js"
import { constants } from "../utils.js"

export default class Timeline {
    constructor(data = {}, entry = null) {
        this.folder = data.folder;
        this.htmlDescription = data.htmlDescription || constants.HTML_NO_DESCRIPTION;
        this.title = data.title || "New Timeline";
        this.shortName = this.title.length > constants.MAX_TAB_TITLE_LENGTH ? this.title.substring(0, constants.MAX_TAB_TITLE_LENGTH - 3) + "..." : this.title;
        this.entries = data.entries || []; // TODO read from this.folderId
        this.playerVisible = data.playerVisible || false;
        this.era = data.era || "";
        this.era_short = data.era_short || "";

        // TODO delete this and load from disk instead
        this.entries = [{
                year: 1975,
                day: 16,
                month: 8,
                hours: 21,
                minutes: 30,
                era_short: "GD",
                eventClass: "important",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer joined the party",
                htmlDescription: "<p>Loyer joins the party</p>"
            },
            {
                year: 1975,
                day: 18,
                month: 9,
                hours: 21,
                minutes: 30,
                era_short: "GD",
                eventClass: "Era",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer afk",
                htmlDescription: "<p>Loyer goes afk through every session and offers absolutely no input</p>"
            },
            {
                year: 1975,
                day: 17,
                month: 9,
                hours: 21,
                minutes: 30,
                era_short: "GD",
                eventClass: "Era",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer dies",
                htmlDescription: "<p>I get rid of a problem and destroy the stupid halfling</p>"
            }
        ];
    }

    reload() {
        //TODO read from disk using some ID
    }

    /**
     * @returns an objects such that each entry has the following fields:
     *   name: the name of the timeline, used to populate the side bar of the TimelineManger window
     *   description: an html description of of the timeline, used for displaying at the top of the div
     *   playerVisible: boolean flag that determines whether the player can see the tab
     *   entries: an array of TimelineEntry objects
     */
    asJson() {
        //resort to make sure we are displaying the most recent
        this.entries.sort(function(e1, e2) {
            return -TimelineEntry.comparator(e1, e2)
        });

        return {
            name: this.title,
            shortName: this.shortName,
            era: this.era,
            description: TextEditor.enrichHTML(this.htmlDescription),
            playerVisible: this.playerVisible,
            entries: this.entries
        };
    }
}