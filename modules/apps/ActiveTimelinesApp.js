import Timeline from "../entities/Timeline.js"
import * as logger from "../logger.js"
import NewTimelineForm from "./NewTimelineForm.js";

let TITLE = "Active Timelines"

export default class ActiveTimelinesApp extends Application {
    allTimelines = [];
    constructor(data) {
        super(data);
        this.allTimelines = [new Timeline().asJson()];
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "timeline-management",
            classes: ['forien-quest-log'],
            template: "modules/foundry-timeline/templates/all-timelines.html",
            width: 750,
            height: 580,
            minimizable: true,
            resizable: true,
            title: TITLE,
            popOut: true,
            tabs: [{
                navSelector: ".log-tabs",
                contentSelector: ".log-body",
                initial: "management"
            }]
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
                    logger.log(logger.DEBUG, "Add event");
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
            timelines: this.allTimelines
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on("click", ".new-timeline-button", () => {
            new NewTimelineForm().render(true);
        });

        html.on('click', '.delete-timeline-button', () => {
            logger.log(logger.DEBUG, "Bringing up delete timeline page, TODO doens't do anything yet")
        });

        // TODO add any other listeners here, probably management buttons?
    }
}