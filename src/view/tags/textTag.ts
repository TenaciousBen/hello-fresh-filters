import $ from "jquery";
import { Course } from "../course";
import { findOnlyOne } from "../shared";

const rootSelector = `[data-test-id="text-tag"]`;

export interface TextTag {
    tag: string;
}

export const getTextTags = (course: Course): TextTag[] => {
    const textTags = course.element.find(rootSelector);
    const tags = textTags.toArray().map(t => ({ 
        tag: $(t).text() 
    } as TextTag));
    return tags;
};