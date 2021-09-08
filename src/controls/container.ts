import $ from "jquery";
import { findOnlyOne } from "../scraper/shared";
import { makeNameFilter } from "./filters/nameFilter";

const filterContainerParentSelector = `[data-test-id="selected-section-wrapper"]`;
const style = `
display: flex;
flex-direction: row;
justify-content: center;
`;
const html = `
<div style="${style}"></div>
`;

export type FilterContainer = JQuery<HTMLDivElement>;

export const makeFilterContainer = (document: JQuery<unknown>): FilterContainer => {
    const parent = findOnlyOne(document, filterContainerParentSelector);
    const filterContainer = $<HTMLDivElement>(html).appendTo(parent);
    makeNameFilter(filterContainer);
    return filterContainer;
};