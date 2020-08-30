/**
 * Preloads templates for partials
 */
export let preloadTemplates = function() {
    let templates = [
        "templates/partials/timeline.html",
        "templates/partials/management.html",
        "templates/partials/timelineEntry.html"
    ];

    templates = templates.map(t => `modules/foundry-timeline/${t}`);
    loadTemplates(templates);
};

export let renderTimelineBodyTmpl = function(entries, era_short) {
    let template_function = Handlebars.partials['modules/foundry-timeline/templates/partials/timelineEntry.html']

    return entries.map(function(context, index) {
        let invert = index % 2 == 0 ? "timeline-entry-inverted" : "";
        context['invert'] = invert
        context['era_short'] = era_short
        return template_function(context)
    }).join('\n');
};