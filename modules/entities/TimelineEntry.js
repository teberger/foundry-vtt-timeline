import { constants } from "../utils.js";

export default class TimelineEntry {
    constructor(data = {}) {
        this.year = Number(data[constants.TIMELINE_ENTRY_YEAR_KEY] || 0);
        this.month = Number(data[constants.TIMELINE_ENTRY_MONTH_KEY] || 0);
        this.day = Number(data[constants.TIMELINE_ENTRY_DAY_KEY] || 0);
        this.hours = Number(data[constants.TIMELINE_ENTRY_HOUR_KEY] || 0);
        this.minutes = Number(data[constants.TIMELINE_ENTRY_MINUTES_KEY] || 0);
        this.eventClass = data[constants.TIMELINE_ENTRY_EVENT_CLASS_KEY];
        this.eventType = data[constants.TIMELINE_ENTRY_EVENT_TYPE_KEY];
        this.eventTitle = data[constants.TIMELINE_ENTRY_EVENT_TITLE_KEY];
        this.htmlDescription = data[constants.TIMELINE_ENTRY_DESCRIPTION_KEY];
    }

    /**
     * A comparator for 
     * @param {Timeline} entry1 
     * @param {Timeline} entry2 
     * @returns
     */
    static comparator(entry1, entry2) {
        let years = entry1.year - entry2.year;
        let months = entry1.month - entry2.month;
        let days = entry1.day - entry2.day;
        let hours = entry1.hours - entry2.hours;
        let minutes = entry1.minutes - entry2.minutes;
        return (years != 0 ? years :
            months != 0 ? months :
            days != 0 ? days :
            hours != 0 ? hours :
            minutes);
    }
}