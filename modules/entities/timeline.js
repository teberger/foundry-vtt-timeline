import TimelineEntry from "./TimelineEntry.js"

export default class Timeline {
    constructor(data = {}, entry = null) {
        this._id = data._id;
        this.htmlDescription = data.htmlDescription || "<p>No description</p>";
        this.title = data.title || "New Timeline";
        this.shortName = this.title.length > 14 ? this.title.substring(0, 11) + "..." : this.title;
        this.entries = data.entries || [];
        this.playerVisible = data.playerVisible || false;
        this.era = data.era || "";

        // TODO delete this and load from disk instead
        this.entries = [{
                year: 1974,
                day: 16,
                month: 8,
                hours: 21,
                minutes: 30,
                eventClass: "Important Event",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer joined the party"
            },
            {
                year: 1975,
                day: 18,
                month: 9,
                hours: 21,
                minutes: 30,
                eventClass: "Era",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer afk"
            },
            {
                year: 1973,
                day: 17,
                month: 9,
                hours: 21,
                minutes: 30,
                eventClass: "Era",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer dies"
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