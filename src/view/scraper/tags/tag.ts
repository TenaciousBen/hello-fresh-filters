import { Course } from "../course";
import { getHighlightedTags } from "./highlightedTag";
import { getIconTags } from "./iconTag";
import { getPromotedTags } from "./promotedTag";
import { getTextTags, TextTag } from "./textTag";

export interface Tag {
    iconSvgHtml: string | null;
    name: string | null;
}

const mapTextTags = (tag: TextTag): Tag => ({
    name: tag.tag,
    iconSvgHtml: null
});

export const getTags = (course: Course): Tag[] => {
    let tags: Tag[] = [];
    const iconTags = getIconTags(course);
    tags = tags.concat(iconTags)
    const textTags = getTextTags(course);
    tags = tags.concat(textTags.map(mapTextTags));
    const highlightedTags = getHighlightedTags(course);
    tags = tags.concat(highlightedTags);
    const promotedTags = getPromotedTags(course);
    tags = tags.concat(promotedTags);
    return tags;
};