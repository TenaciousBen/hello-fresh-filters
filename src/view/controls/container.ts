import $ from "jquery";
import { findOnlyOne } from "../scraper/shared";
import { Tag } from "../scraper/tags/tag";
import { makeFilterButton } from "./filters/filterButton";
import { makeNameFilter } from "./filters/nameFilter";
import { makeTimeFilter } from "./filters/timeFilter";

const filterContainerParentSelector = `[data-test-id="selected-section-wrapper"]`;
const style = `
display: flex;
flex-direction: row;
justify-content: space-around;
width: 50%;
margin-left: 25%;
`;
const html = `
<div style="${style}"></div>
`;

export type FilterContainer = JQuery<HTMLDivElement>;

export const makeFilterContainer = (document: JQuery<unknown>, distinctTags: Tag[]): FilterContainer => {
    const parent = findOnlyOne(document, filterContainerParentSelector);
    const filterContainer = $<HTMLDivElement>(html).appendTo(parent);
    makeNameFilter(filterContainer);
    makeTimeFilter(filterContainer);
    for (let tag of distinctTags) makeFilterButton(filterContainer, tag);
    return filterContainer;
};