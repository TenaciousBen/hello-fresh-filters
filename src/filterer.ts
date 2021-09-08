import $ from "jquery";
import { filterChangeBus, FilterChangeEvent } from "./events/filterChangeBus";
import { Course } from "./scraper/course";

export const hookUpFilterer = (courses: Course[]): void => {
    const handler = (event: FilterChangeEvent): void => {
        let active = courses.slice();
        switch (event.type) {
            case "FilterTextChangeEvent":
                active = active.filter(a => {
                    if (!event.text || event.text === "") return true;
                    const invariantFilter = event.text.toLowerCase().trim();
                    const invariantName = (a.name ?? "").toLowerCase().trim();
                    const matchIndex = invariantName.indexOf(invariantFilter);
                    return matchIndex !== -1;
                })
        }
        let inactive = courses.filter(c => active.indexOf(c) === -1);
        console.log(active, inactive);
        for (let course of active) course.element.css("display", "unset");
        for (let course of inactive) course.element.css("display", "none");
    };
    
    filterChangeBus.subscribe(handler)
}