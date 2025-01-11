import {app, BrowserWindow, ipcMain, shell, nativeTheme} from "electron";
import logger from "electron-log/main";
import path from "path";
import {getStore} from "./store";
import isDev from "electron-is-dev";
import { getCrosshairWindow } from "./windowManager";

ipcMain.handle("getPlatform", (event, data) => {
    return process.platform;
});

ipcMain.handle("openLink", (event, data) => {
    logger.info("Opening link:", data);
    shell.openExternal(data);
});

ipcMain.handle("openLinkInFinder", (event, data) => {
    const basePath = path.dirname(data.path);
    const fullPath = path.resolve(basePath, data.url);

    logger.info("Reveal in Finder:", fullPath);
    shell.showItemInFolder(fullPath);
});

ipcMain.handle("setSetting", (event, data) => {
    getStore().set(data.setting, data.value);

    const crossHairWindow = getCrosshairWindow();
    if (crossHairWindow) {
        crossHairWindow.webContents.send("updateSetting", {
            setting: data.setting,
            value: data.value,
        });
    } else {
        logger.error("Crosshair window not found");
    }
});

ipcMain.handle("getIsDev", (event, data) => {
    return isDev;
});

ipcMain.handle("getStartOnBoot", (event, data) => {
    return app.getLoginItemSettings().openAtLogin;
});

ipcMain.handle("getSetting", (event, setting) => {
    return getStore().get(setting);
});

ipcMain.handle("getSettings", (event, data) => {
    return {
        scale: getStore().get("scale"),
        color: getStore().get("color"),
        type: getStore().get("type"),
    }
});

ipcMain.handle("getVersion", (event, data) => {
    return app.getVersion();
});