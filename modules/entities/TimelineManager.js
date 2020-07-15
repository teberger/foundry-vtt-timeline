import Timeline from "./Timeline.js"

export default class TimelineManager extends Application {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "forien-quest-log",
            classes: ['forien-quest-log'],
            template: "modules/foundry-timeline/templates/all-timelines.html",
            width: 900,
            height: 680,
            minimizable: true,
            resizable: true,
            title: "Active Timelines",
            popOut: true
        });
    }

    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        // TODO [teb] change this if I see a need for additional buttons along the header bar (close, minimize, maximize)
        return buttons;
    }

    getData(options = {}) {
        // Return promise object containing info used during rendering a template
        return mergeObject(super.getData(), {
            options: options,
            isGm: game.user.isGM,
            timelines: Timeline.getAllTimelines()
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on("click", ".new-timeline-btn", () => {
            console.debug("Timeline | creating new timeline");
            // Render a new timeline from that will give it a title and start date
        });
    }
}