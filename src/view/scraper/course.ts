import $ from "jquery";
import { Menu } from "./menu";
import { findOnlyOne } from "./shared";
import { getTags, Tag } from "./tags/tag";

const courseSelector = `[data-test-id="course-card"]`;
const titleSelector = `[data-test-id="recipe-card-title"]`;
const cookingTimeSelector = `[data-test-id="recipe-card-cooking-time"]`;

export interface Course {
    name: string;
    cookingTime: number | null;
    element: JQuery,
    tags: Tag[]
}

const parseCookingTime = (cookingTimeText: string): number | null => {
    const timeMatch = /(\d+) min/.exec(cookingTimeText);
    if (!timeMatch) return null;
    const numberPart = timeMatch[1];
    if (!numberPart) return null;
    return parseInt(numberPart, 0);
}

export const getCourses = (menu: Menu): Course[] => {
    const courseElements = menu.element.find(courseSelector);
    const courses = courseElements.toArray().map(element => {
        const courseElement = $(element);
        const title = findOnlyOne(courseElement, titleSelector).text();
        const cookingTimeText = findOnlyOne(courseElement, cookingTimeSelector).text();
        const cookingTime = parseCookingTime(cookingTimeText);
        const course: Course = {
            name: title,
            cookingTime,
            element: courseElement,
            tags: []
        };
        course.tags = getTags(course);
        return course;
    });
    return courses;
};