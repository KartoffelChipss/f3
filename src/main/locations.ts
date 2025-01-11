import path from "path";
import {app} from "electron";
import fs from "fs";
import {getStore} from "./store";

export const appRoot: string = path.join(`${app.getPath("appData") ?? "."}${path.sep}.f3`,);
if (!fs.existsSync(appRoot)) fs.mkdirSync(appRoot, {recursive: true});
export const logPath = path.join(appRoot, "log.log");
export const storePath = getStore().path;
export const rootDir = path.join(__dirname, "..");
export const srcDir = path.join(rootDir, "src");
export const rendererDir = path.join(srcDir, "renderer");
export const mainDir = path.join(srcDir, "main");
export const distDir = path.join(rootDir, "dist");
export const iconsPath = path.join(rendererDir, "img", "icons");