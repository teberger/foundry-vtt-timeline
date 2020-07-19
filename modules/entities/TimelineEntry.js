export default class TimelineEntry {

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