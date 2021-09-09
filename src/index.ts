import $ from "jquery";
import { makeFilterContainer } from "./view/controls/container";
import { hookUpFilterer } from "./filterer";
import { Course } from "./view/scraper/course";
import { getMenus, MenuType } from "./view/scraper/menu";
import { Tag } from "./view/scraper/tags/tag";
import { hookUpHeaderUpdater } from "./view/headerUpdater";

const doc = $(document);
let menus = getMenus(doc);
// currently only works with the main menu - TODO: get it working with other menus in future if they add the same tags etc
const menu = menus.find(m => m.type === MenuType.Main)!; 
const courses = menu.courses;
const tags = courses.reduce((acc, i) => acc.concat(i.tags), <Tag[]>[])
const distinctTags = tags.reduce((acc, i) => acc.find(a => a.name === i.name) ? acc : acc.concat([i]), <Tag[]>[]);
makeFilterContainer(doc, distinctTags);
hookUpFilterer(courses);
hookUpHeaderUpdater(doc);