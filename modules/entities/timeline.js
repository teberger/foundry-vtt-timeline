export default class Timeline {
    constructor(data = {}, entry = null) {
        this._id = data.id || null;
        this.entry = entry;

        this._data = data
    }

    /**
     * A comparator for 
     * @param {Timeline} timeline1 
     * @param {Timeline} timeline2 
     * @returns
     */
    static comparator(timeline1, timeline2) {
        let years = timeline1.year - timeline2.year;
        let months = timeline1.month - timeline2.month;
        let days = timeline1.day - timeline2.day;
        let hours = timeline1.hours - timeline2.hours;
        let minutes = timeline1.minutes - timeline2.minutes;
        return (years != 0 ? years :
            months != 0 ? months :
            days != 0 ? days :
            hours != 0 ? hours :
            minutes);
    }

    /**
     * @returns an objects such that each entry has the following fields:
     *   playerVisible: boolean flag that determines whether the player can see the tab
     *   name: the name of the timeline, used to populate the side bar of the TimelineManger window
     *   entries: an array of TimelineEntry objects
     */
    static getAllTimelines() {
        //TODO [teb] should fetch all timeline entities wherever they are stored
        let currentTimelineEntries = [{
                year: 1974,
                era: "GD",
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
                era: "GDA",
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
                era: "GDA",
                day: 17,
                month: 9,
                hours: 21,
                minutes: 30,
                eventClass: "Era",
                eventType: "Gathering / Conference",
                eventTitle: "Loyer dies"
            }
        ];

        // inverse sort of all events to make sure they show the newest event first
        currentTimelineEntries.sort(function(e1, e2) {
            return -Timeline.comparator(e1, e2)
        });

        return {
            timeline1: {
                name: "Test Timeline",
                playerVisible: true,
                entries: currentTimelineEntries
            }
        };
    }
}