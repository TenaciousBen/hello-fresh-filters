import { bus } from "./bus";

export type FilterTextChangeEvent = {
    type: "FilterTextChangeEvent",
    text: string | null
};

export type FilterChangeEvent = FilterTextChangeEvent;

export const filterChangeBus = bus<FilterChangeEvent>();