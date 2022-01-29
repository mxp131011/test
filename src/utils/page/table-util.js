export function getActionWidth(buttons) {
    const len = buttons.length;
    if (len === 0) {
        return 0;
    } else if (len >= 3) {
        return 3 * 56 + 16;
    } else {
        const width = len * 56 + 16;
        return width <= 90 ? 90 : width;
    }
}
