import $ from "jquery";
import { filterChangeBus, FilterTextChangeEvent } from "../../events/filterChangeBus";
import { FilterContainer } from "../container";

const style = `
width: 200px;
height: 30px;
border-radius 5px;
`;
const html = `<input type="text" placeholder="Aubergine..." style="${style}" />`

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