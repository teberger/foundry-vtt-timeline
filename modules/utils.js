export let constants = {
    DEBUG_MODE: true,
    PERMISSION_NONE: 0,
    PERMISSION_OBSERVER: 2,
    MODULE_NAME: "foundry-timeline",
    CONFIG_USE_ABOUT_TIME_OPTION: "use-about-time",
    CONFIG_ALLOW_IMPORTS: "allow-json-imports",
    TIMELINE_FOLDER_NAME: "_all_timelines",
    MAX_TAB_TITLE_LENGTH: 14,
    HTML_NO_DESCRIPTION: "<p>No Description given...</p>",
    TIMELINE_METADATA_JOURNAL_ENTRY_NAME: "_metadata",
    TIMEILNE_METADATA_PLAYER_VISIBLE: "playerVisible",
    TIMELINE_METADATA_ERA: "era",
    TIMELINE_METADATA_ERA_INITIALS: "era_short",
    TIMELINE_METADATA_DESCRIPTION: "htmlDescription",
    TIMELINE_ENTRY_EVENT_TYPES: ["trivial", "minor", "important", "major", "milestone"],
    TIMELINE_ENTRY_YEAR_KEY: "year",
    TIMELINE_ENTRY_MONTH_KEY: "month",
    TIMELINE_ENTRY_DAY_KEY: "day",
    TIMELINE_ENTRY_HOUR_KEY: "hours",
    TIMELINE_ENTRY_MINUTES_KEY: "minutes",
    TIMELINE_ENTRY_EVENT_CLASS_KEY: "eventClass",
    TIMELINE_ENTRY_EVENT_TYPE_KEY: "eventType",
    TIMELINE_ENTRY_EVENT_TITLE_KEY: "eventTitle",
    TIMELINE_ENTRY_DESCRIPTION_KEY: "htmlDescription"
};

export let isNullOrUndefined = (obj) => {
    return obj === null || obj === undefined
}

export let timelineFolder = () => {
    if (!(isNullOrUndefined(game) || isNullOrUndefined(game.journal) || isNullOrUndefined(game.journal.directory) || isNullOrUndefined(game.journal.directory.folders))) {
        let gameFolder = game.journal.directory.folders.find(f => f.name === constants.TIMELINE_FOLDER_NAME);
        if (gameFolder === undefined) {
            Folder.create({
                name: constants.TIMELINE_FOLDER_NAME,
                type: "JournalEntry",
                parent: null
            });
        }
        return game.journal.directory.folders.find(f => f.name === constants.TIMELINE_FOLDER_NAME);
    } else {
        return null
    }
}

export let timelineFolderId = () => {
    let folder = timelineFolder();
    return folder === null ? null : folder._id;
};