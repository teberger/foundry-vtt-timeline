import Timeline from "../entities/timeline.js"
import * as logger from "../logger.js"
import AddTimelineForm from "./AddTimelineForm.js";
import AddEventForm from "./AddEventForm.js";
import { constants, isNullOrUndefined, timelineFolder } from "../utils.js"

let TITLE = "Active Timelines"

export default class ActiveTimelinesApp extends Application {
    allTimelines = [];
    constructor(data) {
        super(data);
        this.refreshData()
    }

    /**
     * TODO could be a performance issue to access all these different files at the same time. Maybe refactor here
     */
    refreshData() {
        this.allTimelines = timelineFolder().children.map(entry => {
            logger.log(logger.DEBUG, "Reading timeline data for ", entry.data.name);
            // get _metadata journal entry
            let metadataJournal = entry.content.find(e => {
                return e.name === constants.TIMELINE_METADATA_JOURNAL_ENTRY_NAME
            })

            // read the content
            let data = JSON.parse(metadataJournal.data.content)

            // use it to instantiate the Timeline
            return new Timeline(mergeObject(data, {
                title: entry.data.name,
                htmlDescription: data.htmlDescription,
                era: data.era,
                era_short: data.era_short,
                folder: entry
            }))
        })
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
                label: "Delete Timeline",
                class: "delete-timeline",
                parent: this,
                icon: "fas fa-calendar-times",
                onclick: function() {
                    let timelineName = this.parent._tabs[0].active;
                    let folder = game.journal.directory.folders.find(f => f.name === timelineName)
                    let folderId = folder._id;
                    new Dialog({
                        title: "Are you sure?",
                        content: "<h3>Deleting the timeline will also delete all entries in the timeline, are you sure?</h3>",
                        buttons: {
                            yes: {
                                icon: `<i class="far fa-trash-alt"></i>`,
                                label: "Yes, delete",
                                callback: () => {
                                    let folder = game.journal.directory.folders.find(f => f._id === folderId);
                                    logger.log(logger.DEBUG, "Deleting folder id", folderId);

                                    let rootDelete = folder.delete();
                                    folder.content.reduce((prev, next) => {
                                        return prev.then(() => {
                                            return next.delete();
                                        })
                                    }, rootDelete);

                                    rootDelete.then(() => {
                                        this.parent.render(true)
                                    });
                                }
                            },
                            no: {
                                icon: `<i class="fas fa-undo"></i>`,
                                label: "Wait!"
                            }
                        }
                    }).render(true)
                    this.parent.render(true)
                }
            });
            buttons.unshift({
                label: "New Timeline",
                class: "add-timeline",
                parent: this,
                icon: "fas fa-calendar-plus",
                onclick: function() {
                    new AddTimelineForm({}, this.parent).render(true);
                }
            });
            buttons.unshift({
                label: "Event",
                class: "add-event",
                parent: this,
                icon: "fas fa-plus",
                onclick: function() {
                    let timelineName = this.parent._tabs[0].active;
                    let folder = game.journal.directory.folders.find(f => f.name === timelineName)

                    if (!isNullOrUndefined(folder)) {
                        new AddEventForm({ parentTimelineFolder: folder }, this.parent).render(true)
                    } else {
                        logger.log(logger.ERR, "Could not find timeline folder? Something bad has happened in " + constants.TIMELINE_FOLDER_NAME);
                    }
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
            timelines: this.allTimelines.reduce((prev, e) => { return prev.concat(e.asJson()) }, [])
        });


    }

    render(force, options) {
        this.refreshData()
        super.render(force, options)
    }
}