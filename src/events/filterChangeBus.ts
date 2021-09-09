import { bus } from "./bus";

export type FilterTextChangeEvent = {
    type: "FilterTextChangeEvent",
    text: string | null
};

export type FilterTimeChangeEvent = {
    type: "FilterTimeChangeEvent",
    time: number | null
};

export type FilterButtonToggledEvent = {
    type: "FilterButtonToggledEvent",
    filterName: string,
    applied: boolean
}

export type FilterChangeEvent = FilterTextChangeEvent | FilterButtonToggledEvent | FilterTimeChangeEvent;

export const filterChangeBus = bus<FilterChangeEvent>();