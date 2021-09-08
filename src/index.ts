import $ from "jquery";
import { makeFilterContainer } from "./controls/container";
import { hookUpFilterer } from "./filterer";
import { Course } from "./scraper/course";
import { getMenus } from "./scraper/menu";

const doc = $(document);
const menus = getMenus(doc);
console.log(menus);
menus.forEach(c => console.log(c));
makeFilterContainer(doc);
hookUpFilterer(menus.reduce((acc, i) => acc.concat(i.courses), <Course[]>[]));