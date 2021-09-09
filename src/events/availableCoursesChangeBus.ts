import { Course } from "../view/scraper/course";
import { bus } from "./bus";

export type AvailableCoursesChangeEvent = {
    type: "AvailableCoursesChangeEvent",
    available: Course[]
};

export const availableCoursesChangeBus = bus<AvailableCoursesChangeEvent>();