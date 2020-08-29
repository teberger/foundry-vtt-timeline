import { constants, timelineFolder } from "../utils.js"
import * as logger from "../logger.js"

export default class DeleteTimelineForm extends Application {
    allTimelines = [];

    constructor(options = {}, parent) {
        super(options);
        this.parent = parent;
        this.refreshData();
    }

    refreshData() {
        this.allTimelines = [];
        timelineFolder().children.map(entry => {
            this.allTimelines.push({
                id: entry._id,
                name: entry.data.name
            })
        });
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "delete-timeline-form",
            template: "modules/foundry-timeline/templates/delete-timelines.html",
            title: "Delete Timelines",
            width: 400,
            height: 560,
        });
    }

    getData(options = {}) {
        return mergeObject(super.getData(), {
            options: options,
            timelines: this.allTimelines
        })
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on("click", '.del-btn', (event) => {
            //TODO remove folder
            let folderId = event.currentTarget.attributes['target'].value;
            new Dialog({
                title: "Are you sure?",
                content: "<h3>Deleting the timeline will also delete all entries in the timeline, are you sure?</h3>",
                buttons: {
                    yes: {
                        icon: `<i class="far fa-trash-alt"></i>`,
                        label: "Yes, delete",
                        callback: () => {
                            let folder = game.journal.directory.folders.find(f => f._id === folderId);
                            logger.log(logger.ERR, "Deleting folder id", folderId);
                            logger.log(logger.DEBUG, folder.collection);

                            for (let x = 0; x < folder.content.length; x++) {
                                folder.content[x].delete()
                            }
                            folder.delete().then(() => {
                                this.refreshData();
                                this.parent.render(true)
                                this.render(true)
                            });
                        }
                    },
                    no: {
                        icon: `<i class="far fa-undo"></i>`,
                        label: "Wait!"
                    }
                }
            }).render(true)
        });
    }

    render(force, options) {
        this.refreshData();
        super.render(force, options);
    }

};