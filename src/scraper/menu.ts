import $ from "jquery";
import { Course, getCourses } from "./course";
import { findOnlyOne } from "./shared";

export enum MenuType {
    "Selection",
    "Main",
    "Sides"
}

export interface Menu {
    type: MenuType
    element: JQuery;
    courses: Course[];
}

const selectionSelector = `[data-test-id="selected-section-wrapper"]`;
const mainSelector = `[data-test-id="courses-list-unchosen"]`;
const sidesSelector = `[data-test-id="menu-add-ons-list"]`;

export const getMenus = (doc: JQuery<Document>): Menu[] => {
    const selectionsElement = findOnlyOne(doc, selectionSelector);
    const mainElement = findOnlyOne(doc, mainSelector);
    const sidesElement = findOnlyOne(doc, sidesSelector);

    const selections: Menu = {
        type: MenuType.Selection,
        element: selectionsElement,
        courses: []
    };
    selections.courses = getCourses(selections);
    
    const main: Menu = {
        type: MenuType.Main,
        element: mainElement,
        courses: []
    };
    main.courses = getCourses(main);

    const sides: Menu = {
        type: MenuType.Sides,
        element: sidesElement,
        courses: []
    };
    sides.courses = getCourses(sides);

    return [selections, main, sides];
};