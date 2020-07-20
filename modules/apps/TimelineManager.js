import Timeline from "../entities/Timeline.js"
import constants from "../constants.js";

export default class TimelineManager extends Application {

    constructor(data = {}, entry = null) {
        super(data, null);
        this._timelineFolderId = null;
        this.allTimelines = [];
        this.initData(true);
    }

    initData(refresh = false) {
        // To load from disk, we need to find  the right journal entry
        if (this._timelineFolderId === null) {
            let gameFolder = game.journal.directory.folders.find(f => f.name === constants.timelineFolderName);
            if (gameFolder === undefined) {
                Folder.create({
                    name: constants.timelineFolderName,
                    type: "JournalEntry",
                    parent: null
                });
                gameFolder = game.journal.directory.folders.find(f => f.name === constants.timelineFolderName);
            }
            this._timelineFolderId = gameFolder._id;
        }
        //TODO read from disk
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
            title: "Active Timelines",
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
            timelines: this.allTimelines
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        // TODO add any other listeners here, probably management buttons?
    }
}