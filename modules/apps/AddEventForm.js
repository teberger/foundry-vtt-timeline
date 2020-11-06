import * as logger from "../logger.js"
import { constants as c, isNullOrUndefined } from "../utils.js"

export default class AddEventForm extends FormApplication {
    constructor(data = {}, parentUi) {
        super(data)
        this.activeTimelineApp = parentUi;
        this.parentTimelineFolder = data.parentTimelineFolder
        this.useAboutTime = game.settings.get(c.MODULE_NAME, c.CONFIG_USE_ABOUT_TIME_OPTION);
        this.eventClass = c.TIMELINE_ENTRY_EVENT_TYPES[0]
        this.data = {}
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "new-event-form",
            template: "modules/foundry-timeline/templates/new-event-form.html",
            title: "New Event",
            width: 600,
            height: 700,
            closeOnSubmit: false
        });
    }

    async _updateObject(event, formData, x) {
        logger.log(logger.DEBUG, "Adding journal entry to '", this.parentTimelineFolder.data.name, "'")

        if (event.type == "mcesave") {
            // skip this event... We'll pick it up when the event is added
            return
        }
        else {
            let playerVisible = formData.playerVisible || false;
            let time = isNullOrUndefined(formData.timeString) ?
                event.target.elements.timeString.getAttribute('defaultValue') :
                formData.timeString;

            this.data[c.TIMELINE_ENTRY_YEAR_KEY] = Number(isNullOrUndefined(formData.year) ?
                event.target.elements.year.getAttribute('defaultValue') : formData.year);
            this.data[c.TIMELINE_ENTRY_DAY_KEY] = Number(isNullOrUndefined(formData.day) ?
                event.target.elements.day.getAttribute('defaultValue') : formData.day);
            this.data[c.TIMELINE_ENTRY_MONTH_KEY] = Number(isNullOrUndefined(formData.month) ?
                event.target.elements.month.getAttribute('defaultValue') : formData.month);
            this.data[c.TIMELINE_ENTRY_HOUR_KEY] = Number(time.split(':')[0]);
            this.data[c.TIMELINE_ENTRY_MINUTES_KEY] = Number(time.split(':')[1]);
            this.data[c.TIMELINE_ENTRY_EVENT_CLASS_KEY] = this.eventClass;
            this.data[c.TIMELINE_ENTRY_EVENT_TITLE_KEY] = formData.eventTitle;
            this.data[c.TIMELINE_ENTRY_DESCRIPTION_KEY] = formData.mce_0;

            return JournalEntry.create({
                name: this.data.eventTitle,
                content: JSON.stringify(this.data),
                folder: this.parentTimelineFolder._id,
                permission: { default: playerVisible ? c.PERMISSION_OBSERVER : c.PERMISSION_NONE }
            }).then(() => {
                logger.log(logger.INFO, "Event created")
                this.activeTimelineApp.render(true)
                this.close()
            });

        }
    }

    async _onEditorSave(target, element, content) {
        this[target] = content;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.on("click", ".use-about-time-checkbox", () => {
            logger.log(logger.DEBUG, "Checkbox clicked, re-render")
            this.useAboutTime = !this.useAboutTime;
            this.render(true)
        });

        html.on('click', '.eventClass', (e) => {
            this.eventClass = e.target.value
            logger.log(logger.DEBUG, "clicky clicked", e.target.value)
        });
    }

    getData(options) {
        let datetime = this.useAboutTime ? game.Gametime.DTNow() : null;
        let years = datetime ? datetime.years : "";
        let months = datetime ? datetime.months + 1 : ""; // Damn, 0 based crap.
        let days = datetime ? datetime.days + 1 : ""; // Damn, 0 based crap
        let timeString = datetime ? ("00" + datetime.hours).slice(-2) + ":" + ("00" + datetime.minutes).slice(-2) : "00:00"

        return mergeObject(options, {
            aboutTimeEnabled: game.settings.get(c.MODULE_NAME, c.CONFIG_USE_ABOUT_TIME_OPTION),
            useAboutTime: this.useAboutTime,
            years: years,
            months: months,
            days: days,
            timeString: timeString,
            eventTypes: c.TIMELINE_ENTRY_EVENT_TYPES
        });
    }
}