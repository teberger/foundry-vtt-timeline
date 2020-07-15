export default class Timeline {
    /**
     * @returns an objects such that each entry has the following fields:
     *   playerVisible: boolean flag that determines whether the player can see the tab
     *   name: the name of the timeline, used to populate the side bar of the TimelineManger window
     *   entries: an array of TimelineEntry objects
     */
    static getAllTimelines() {
        //TODO [teb] should fetch all timeline entities wherever they are stored
        return {
            timeline1: {
                name: "Test Timeline",
                playerVisible: true,
                entries: []
            }
        };
    }
}