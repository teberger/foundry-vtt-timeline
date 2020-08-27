export let constants = {
    moduleName: "foundry-timeline",
    timelineFolderName: "_all_timelines",
    MAX_TAB_TITLE_LENGTH: 14,
    htmlNoDescription: "<p>No Description given...</p>"
};

export let isNullOrUndefined = (obj) => {
    return obj === null || obj === undefined
}

export let timelineFolderId = () => {
    if (!(isNullOrUndefined(game) || isNullOrUndefined(game.journal) || isNullOrUndefined(game.journal.directory) || isNullOrUndefined(game.journal.directory.folders))) {
        let gameFolder = game.journal.directory.folders.find(f => f.name === constants.timelineFolderName);
        if (gameFolder === undefined) {
            Folder.create({
                name: constants.timelineFolderName,
                type: "JournalEntry",
                parent: null
            });
        }
        return game.journal.directory.folders.find(f => f.name === constants.timelineFolderName)._id;
    } else {
        return null
    }
};