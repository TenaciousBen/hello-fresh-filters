import $ from "jquery";
import { FilterButtonToggledEvent, filterChangeBus } from "../../../events/filterChangeBus";
import { Tag } from "../../scraper/tags/tag";
import { FilterContainer } from "../container";

const buttonStyle = `
min-width: 100px;
min-height: 60px;
border-radius: 5px;
border: 2px solid grey;
cursor: pointer;
user-select: none;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const buttonStyleToggled = `
min-width: 100px;
min-height: 60px;
border-radius: 5px;
border: 2px solid grey;
background: lightblue;
cursor: pointer;
user-select: none;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const html = `<div type="text" placeholder="Aubergine..." style="${buttonStyle}" />`

const textStyle = `
font-weight: bold;
`;

export const makeFilterButton = (container: FilterContainer, tag: Tag): JQuery<HTMLInputElement> => {
    const button = $<HTMLInputElement>(html).appendTo(container);
    const svgElement = tag.iconSvgHtml ? $(tag.iconSvgHtml).appendTo(button) : null;
    const text = $(`<span style="${textStyle}">${tag.name}</span>`).appendTo(button);
    let isToggled = false;
    button.on("click", (e) => {
        isToggled = !isToggled;
        if (isToggled) button.attr("style", buttonStyleToggled);
        else button.attr("style", buttonStyle);
        const event: FilterButtonToggledEvent = {
            type: "FilterButtonToggledEvent",
            applied: isToggled,
            filterName: tag.name || ""
        };
        filterChangeBus.notify(event);
    });
    return button;
}