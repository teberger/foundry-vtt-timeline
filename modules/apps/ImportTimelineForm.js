
import * as logger from "../logger.js"
import { timelineFolderId, constants, isNullOrUndefined } from "../utils.js"

/**
 * 
 */
export default class ImportTimelineForm extends FormApplication {
    constructor(data, parent, folderId) {
        super(data)
        this.parent = parent
        this.folderId = folderId
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'new-timeline-form',
            template: 'modules/foundry-timeline/templates/import-timeline-form.html',
            title: "Import Timeline",
            width: 200,
            height: 140,
            closeOnSubmit: false
        });
    }

    async _onEditorSave(target, element, content) {
        this[target] = content;
    }

    async _updateObject(event, formData) {
        let entryList = JSON.parse(formData['import-entries'].trim())

        let promiseList = [];

        for (let i = 0; i < entryList.length; i++) {
            promiseList.push(JournalEntry.create({
                name: entryList[i]['eventTitle'],
                content: JSON.stringify(entryList[i]),
                folder: this.folderId,
                permission: { default: constants.PERMISSION_OBSERVER }
            }));
        }

        Promise.all(promiseList).then(x => {
            this.close();
        });
    }
}