import Timeline from "../entities/Timeline.js"

export default class TimelineManager extends Application {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "timeline-management",
            classes: ['forien-quest-log'],
            template: "modules/foundry-timeline/templates/all-timelines.html",
            width: 750,
            height: 580,
            minimizable: true,
            resizable: true,
            title: "Active Timelines",
            popOut: true,
            tabs: [{ navSelector: ".log-tabs", contentSelector: ".log-body", initial: "management" }]
        });
    }

    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        if (game.user.isGM) {
            buttons.unshift({
                label: "Event",
                class: "add-event",
                icon: "fas fa-plus",
                onclick: function() {
                    console.debug("Timeline | Add event");
                }
            });
        }
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
        // TODO add any other listeners here
    }
}