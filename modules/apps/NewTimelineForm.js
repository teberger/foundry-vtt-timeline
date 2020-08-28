import * as logger from "../logger.js"
/**
 * 
 */
export default class NewTimelineForm extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'new-timeline-form',
            template: 'modules/foundry-timeline/templates/new-timeline-form.html',
            title: "New Timeline",
            width: 600,
            height: 640,
            closeOnSubmit: true
        });
    }

    async _onEditorSave(target, element, content) {
        this[target] = content;
    }

    async _updateObject(event, formData) {
        logger.log(logger.DEBUG, "Creating new timeline, TODO does nothing right now")
            // TODO [teb]
    }

    async getData(options = {}) {

    }
}