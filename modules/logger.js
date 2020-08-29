export class DEBUG {};
export class INFO {};
export class WARN {};
export class ERR {};

export let log = (level, ...message) => {
    let output = message.reduce((prev, curr) => { return prev + " " + curr.toString() }, "")

    switch (typeof(level)) {
        case ERR:
            ui.notifications.error(output)
            console.error("Timeline | " + output)
            break;
        case WARN:
            ui.notifications.warn(output)
            console.warn("Timeline | " + output)
            break;
        case INFO:
            ui.notifications.info(output)
            console.info("Timeline | " + output)
            break;
        case DEBUG:
        default:
            console.debug("Timeline | " + output)

    }
};