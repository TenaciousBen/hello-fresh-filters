import $ from "jquery";
import { Course } from "../course";
import { findOnlyOne } from "../shared";

const rootSelector = `[data-test-id="icon-tag"]`;
const iconSelector = `[data-test-id="tag-icon"]`;
const tooltipSelector = `[data-test-id="tag-tooltip"]`;

export interface IconTag {
    iconSvgHtml: string | null;
    name: string;
}

export const getIconTags = (course: Course): IconTag[] => {
    const tags = course.element.find(rootSelector);
    const mapped: IconTag[] = tags.toArray().map(t => {
        const root = $(t);
        const tooltipText = findOnlyOne(root, tooltipSelector).text();
        const iconSvg = findOnlyOne(root, iconSelector)[0].innerHTML;
        const tag: IconTag = {
            iconSvgHtml: iconSvg,
            name: tooltipText
        };
        return tag;
    });
    return mapped;
};