import { Course } from "../course";
import { getIconTags, IconTag } from "./iconTag";
import { getTextTags, TextTag } from "./textTag";

export interface Tag {
    iconSvgHtml: string | null;
    name: string | null;
}

const mapIconTags = (tag: IconTag): Tag => ({
    name: tag.name,
    iconSvgHtml: tag.iconSvgHtml
});

const mapTextTags = (tag: TextTag): Tag => ({
    name: tag.tag,
    iconSvgHtml: null
});

export const getTags = (course: Course): Tag[] => {
    let tags: Tag[] = [];
    const iconTags = getIconTags(course);
    tags = tags.concat(iconTags.map(mapIconTags))
    const textTags = getTextTags(course);
    tags = tags.concat(textTags.map(mapTextTags));
    return tags;
};