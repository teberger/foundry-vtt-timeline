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
        this.reload();
    }

    reload() {
        this.folder.content.map(entry => {
            if (entry.name !== constants.TIMELINE_METADATA_JOURNAL_ENTRY_NAME) {
                this.entries.push(new TimelineEntry(JSON.parse(entry.data.content)));
            }
        });
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
            era_short: this.era_short,
            description: TextEditor.enrichHTML(this.htmlDescription),
            playerVisible: this.playerVisible,
            entries: this.entries
        };
    }
}