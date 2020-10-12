import * as logger from "../logger.js"
import { timelineFolderId, constants, isNullOrUndefined } from "../utils.js"

/**
 * 
 */
export default class AddTimelineForm extends FormApplication {
    constructor(data, parent) {
        super(data)
        this.parent = parent
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'new-timeline-form',
            template: 'modules/foundry-timeline/templates/new-timeline-form.html',
            title: "New Timeline",
            width: 600,
            height: 640,
            closeOnSubmit: false
        });
    }

    async _onEditorSave(target, element, content) {
        this[target] = content;
    }

    async _updateObject(event, formData) {
        if (event.type == "mcesave") {
            // skip this event... We'll pick it up when the event is added
            return
        }
        let title = formData.title
        let playerVisible = formData.playerVisible;
        let era = isNullOrUndefined(formData.era) ? "" : formData.era
        let era_initials = isNullOrUndefined(formData.era_initials) ? "" : formData.era_initials;
        let htmlDescription = isNullOrUndefined(formData.description) ? constants.HTML_NO_DESCRIPTION : formData.description;

        logger.log(logger.DEBUG, "Creating new timeline titled ", title.toString());

        if (title === undefined) {
            logger.log(logger.ERR, "Timeline must be given a title")
            return;
        }

        let timelineExists = game.journal.directory.folders.find(f => f.name === title);
        if (timelineExists) {
            logger.log(logger.WARN, "Timeline '", title, "' already exists");
            return;
        }

        let data = {}
        data[constants.TIMEILNE_METADATA_PLAYER_VISIBLE] = playerVisible
        data[constants.TIMELINE_METADATA_ERA] = era;
        data[constants.TIMELINE_METADATA_ERA_INITIALS] = era_initials;
        data[constants.TIMELINE_METADATA_DESCRIPTION] = htmlDescription; // comes from _onEditorSave()

        return Folder.create({
            name: title,
            type: "JournalEntry",
            parent: timelineFolderId()
        }).then((entry) => {
            ui.notifications.info("New timeline '" + title + "' created");
            JournalEntry.create({
                name: constants.TIMELINE_METADATA_JOURNAL_ENTRY_NAME,
                content: JSON.stringify(data),
                folder: entry._id,
                permission: { default: constants.PERMISSION_OBSERVER }
            }).then(() => {
                logger.log(logger.INFO, "Metadata for ", title, " timeline created")
                this.parent.render(true);
            }, () => {
                logger.log(logger.WARN, "Metadata for ", title, " timeline could not be created! This could lead to undesireable affects")
            })
            this.close();
        });
    }
}