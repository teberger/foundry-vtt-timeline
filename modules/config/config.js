import { constants } from "../utils.js"

export function register() {
    game.settings.register("foundry-timeline", constants.CONFIG_USE_ABOUT_TIME_OPTION, {
        name: "Use about-time",
        hint: "Whether to hook into about-time for timeline entries",
        scope: "global",
        config: true,
        type: Boolean,
        onChange: value => {}
    });
    game.settings.register("foundry-timeline", constants.CONFIG_ALLOW_IMPORTS, {
        name: "Allow Timeline Imports",
        hint: "Allows timeline entry imports from JSON lists",
        scope: "global",
        config: true,
        type: Boolean,
        onChange: value => {}
    });
    game.settings.register("foundry-timeline", constants.CONFIG_DEBUG_MODE, {
        name: "Turn on debug mode",
        hint: "Will show the journal entries",
        scope: "global",
        config: true,
        type: Boolean,
        onChange: value => {
            constants.DEBUG_MODE = value
        }
    });
}