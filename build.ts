import fs, { Mode } from "fs";
import path from "path";

const buildFilePath = path.join(__dirname, "build", "bundle.js");
const writeDirPath = path.join(__dirname, "dist");
const writeFilePath = path.join(__dirname, "dist", "bundle.txt");

let content = fs.readFileSync(buildFilePath).toString();
content = "javascript:(function(){" + content;
content += "}());"
const hasDist = fs.existsSync(writeDirPath);
if (!hasDist) fs.mkdirSync(writeDirPath);
fs.writeFileSync(writeFilePath, content);
