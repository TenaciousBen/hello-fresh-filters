import $ from "jquery";

export const findOnlyOne = (scope: JQuery<unknown>, selector: string): JQuery => {
    const result = scope.find(selector);
    if (result.length !== 1) throw new Error(`Expected only one item for selector ${selector} but found ${result.length}`);
    return $(result[0]);
};