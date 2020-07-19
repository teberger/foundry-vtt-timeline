/**
 * 
 */
export default class NewTimelineForm extends FormApplication {
    static get defaultOptions() {
        return mergeObjects(
            super.defaultOptions, {
                id: 'new-timeline-form',
                template: 'modules'
            });
    }

}