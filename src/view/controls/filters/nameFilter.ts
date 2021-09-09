import $ from "jquery";
import { filterChangeBus, FilterTextChangeEvent } from "../../../events/filterChangeBus";
import { FilterContainer } from "../container";

const style = `
width: 200px;
min-height: 60px;
border-radius: 5px;
border: 2px grey solid;
`;
const html = `<input type="text" placeholder="Name filter" style="${style}" />`

export const makeNameFilter = (container: FilterContainer): JQuery<HTMLInputElement> => {
    const input = $<HTMLInputElement>(html).appendTo(container);
    input.on("input", (e) => {
        const value = input.val();
        const event: FilterTextChangeEvent = {
            text: value as string,
            type: "FilterTextChangeEvent"
        };
        filterChangeBus.notify(event);
    });
    return input;
}