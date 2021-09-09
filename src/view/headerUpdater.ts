import $ from "jquery";
import { availableCoursesChangeBus, AvailableCoursesChangeEvent } from "../events/availableCoursesChangeBus";

const getNumberPartOfHeader = (doc: JQuery<Document>): JQuery<HTMLElement> => {
    const headerSelector = `[id="non-selected-meals-description"] > h2`;
    const header = doc.find(headerSelector)[0];
    if (!header) {
        console.error(doc, headerSelector, header);
        throw new Error(`Could not find header with selector ${headerSelector} within menu`);
    }
    const textElement = $(header)
        .contents()
        .toArray()
        .map(t => $(t))
        .find(t => /\d+/.test(t.text()));
    if (!textElement) {
        console.error(doc, headerSelector, header, textElement);
        throw new Error("Could not find text element within header");
    }
    return textElement as JQuery<HTMLElement>;
};

export const hookUpHeaderUpdater = (doc: JQuery<Document>): void => {
    const handler = (event: AvailableCoursesChangeEvent): void => {
        const totalCourses = event.available.length;
        const numberPart = getNumberPartOfHeader(doc);
        numberPart[0].replaceWith(totalCourses.toString());
    };
    availableCoursesChangeBus.subscribe(handler);
};