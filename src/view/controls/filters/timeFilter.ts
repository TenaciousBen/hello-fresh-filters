import $ from "jquery";
import { filterChangeBus, FilterTimeChangeEvent } from "../../../events/filterChangeBus";
import { FilterContainer } from "../container";

const style = `
width: 200px;
min-height: 60px;
border-radius: 5px;
border: 2px grey solid;
`;
const html = `<input type="number" placeholder="Time filter (mins)" style="${style}" />`

export const makeTimeFilter = (container: FilterContainer): JQuery<HTMLInputElement> => {
    const input = $<HTMLInputElement>(html).appendTo(container);
    input.on("input", (e) => {
        const value = input.val();
        const event: FilterTimeChangeEvent = {
            time: value as (number | null),
            type: "FilterTimeChangeEvent"
        };
        filterChangeBus.notify(event);
    });
    return input;
}