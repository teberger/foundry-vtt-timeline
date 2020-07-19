export function register() {
    game.settings.register("use about time", "useAboutTime", {
        name: "Use about-time",
        hint: "Whether to hook into about-time for timeline entries",
        scope: "global",
        config: true,
        type: Boolean,
        onChange: value => {}
    });
}