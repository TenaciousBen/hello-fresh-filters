import $ from "jquery";
import { availableCoursesChangeBus } from "./events/availableCoursesChangeBus";
import { filterChangeBus, FilterChangeEvent } from "./events/filterChangeBus";
import { Course } from "./view/scraper/course";

const MAX_RECIPE_TIME = 999;

export const hookUpFilterer = (courses: Course[]): void => {
    const activeTagNames: Set<string> = new Set<string>();
    let filterString = "";
    let maxMinutes = MAX_RECIPE_TIME;
    const handler = (event: FilterChangeEvent): void => {
        let active = courses.slice();
        switch (event.type) {
            case "FilterTextChangeEvent":
                filterString = event.text ?? "";
                break;
            case "FilterButtonToggledEvent":
                if (event.applied) activeTagNames.add(event.filterName);
                else activeTagNames.delete(event.filterName);
                break;
            case "FilterTimeChangeEvent":
                maxMinutes = event.time ?? MAX_RECIPE_TIME;
                if (maxMinutes <= 0) maxMinutes = MAX_RECIPE_TIME;
                break;
        }
        active = active.filter(a => {
            if (!filterString || filterString === "") return true;
            const invariantFilter = filterString.toLowerCase().trim();
            const invariantName = (a.name ?? "").toLowerCase().trim();
            const matchIndex = invariantName.indexOf(invariantFilter);
            return matchIndex !== -1;
        });
        for (let tagName of Array.from(activeTagNames)) {
            active = active.filter(a => !!a.tags.find(t => t.name === tagName));
        }
        active = active.filter(a => {
            if (maxMinutes === MAX_RECIPE_TIME || maxMinutes <= 0) return true;
            return (a.cookingTime ?? MAX_RECIPE_TIME) <= maxMinutes;
        })
        let inactive = courses.filter(c => active.indexOf(c) === -1);
        for (let course of active) course.element.css("display", "unset");
        for (let course of inactive) course.element.css("display", "none");
        availableCoursesChangeBus.notify({ type: "AvailableCoursesChangeEvent", available: active.slice() });
    };
    
    filterChangeBus.subscribe(handler)
}