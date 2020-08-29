export let constants = {
    DEBUG_MODE: true,
    MODULE_NAME: "foundry-timeline",
    TIMELINE_FOLDER_NAME: "_all_timelines",
    MAX_TAB_TITLE_LENGTH: 14,
    HTML_NO_DESCRIPTION: "<p>No Description given...</p>",
    TIMELINE_METADATA_JOURNAL_ENTRY_NAME: "_metadata",
    TIMELINE_METADATA_ERA: "era",
    TIMELINE_METADATA_ERA_INITIALS: "era_initials",
    TIMELINE_METADATA_DESCRIPTION: "descriptionHtml"
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