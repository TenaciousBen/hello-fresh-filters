import $ from "jquery";
import { Course } from "../course";
import { findOnlyOne } from "../shared";
import { Tag } from "./tag";

const rootSelector = `[data-test-id="icon-tag"]`;
const iconSelector = `[data-test-id="tag-icon"]`;
const tooltipSelector = `[data-test-id="tag-tooltip"]`;

export const getIconTags = (course: Course): Tag[] => {
    const tags = course.element.find(rootSelector);
    const mapped: Tag[] = tags.toArray().map(t => {
        const root = $(t);
        const tooltipText = findOnlyOne(root, tooltipSelector).text();
        const iconSvg = findOnlyOne(root, iconSelector)[0].innerHTML;
        const tag: Tag = {
            iconSvgHtml: iconSvg,
            name: tooltipText
        };
        return tag;
    });
    return mapped;
};